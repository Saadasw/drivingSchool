import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/lib/supabase';
import { uploadImage, deleteImage } from '@/lib/setupStorage';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2, Edit, Upload, X, Image as ImageIcon, GripVertical, ArrowUpDown, Grid3X3, LayoutGrid } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'sliding'>('grid');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    is_active: true
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load images',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const validUrls: string[] = [];

    fileArray.forEach(file => {
      if (file && file.type.startsWith('image/')) {
        validFiles.push(file);
        validUrls.push(URL.createObjectURL(file));
      }
    });

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      setPreviewUrls(validUrls);
      setFormData(prev => ({ ...prev, image_url: '' })); // Clear URL input when files are selected
      
      if (validFiles.length !== fileArray.length) {
        toast({
          title: 'Some files skipped',
          description: `${validFiles.length} of ${fileArray.length} files were valid images`,
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Invalid files',
        description: 'Please select valid image files',
        variant: 'destructive',
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  const removeSelectedFiles = () => {
    // Clean up object URLs to prevent memory leaks
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeSingleFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    
    // Clean up the removed URL
    URL.revokeObjectURL(previewUrls[index]);
    
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0 && !formData.image_url) {
      toast({
        title: 'Error',
        description: 'Please select image files or provide an image URL',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      if (editingImage) {
        // Single image edit mode
        let imageUrl = formData.image_url;

        if (selectedFiles.length > 0) {
          setUploadProgress(50);
          imageUrl = await uploadImage(selectedFiles[0]);
          setUploadProgress(100);
        }

        // Delete old image if it was uploaded to storage
        if (editingImage.image_url.includes('supabase.co') && imageUrl !== editingImage.image_url) {
          try {
            await deleteImage(editingImage.image_url);
          } catch (error) {
            console.error('Failed to delete old image:', error);
          }
        }

        const imageData = {
          ...formData,
          image_url: imageUrl
        };

        const { error } = await supabase
          .from('gallery')
          .update(imageData)
          .eq('id', editingImage.id);
        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Image updated successfully',
        });
      } else {
        // Multiple image upload mode
        const imagesToUpload = selectedFiles.length > 0 ? selectedFiles : [null];
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < imagesToUpload.length; i++) {
          try {
            let imageUrl = formData.image_url;

            if (imagesToUpload[i]) {
              setUploadProgress((i / imagesToUpload.length) * 100);
              imageUrl = await uploadImage(imagesToUpload[i]);
            }

            const imageData = {
              title: selectedFiles.length > 1 ? `${formData.title} ${i + 1}` : formData.title,
              description: formData.description,
              image_url: imageUrl,
              is_active: formData.is_active
            };

            const { error } = await supabase
              .from('gallery')
              .insert([imageData]);
            
            if (error) throw error;
            successCount++;
          } catch (error) {
            console.error(`Failed to upload image ${i + 1}:`, error);
            errorCount++;
          }
        }

        setUploadProgress(100);

        if (successCount > 0) {
          toast({
            title: 'Success',
            description: `${successCount} image(s) uploaded successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
          });
        } else {
          throw new Error('All uploads failed');
        }
      }

      resetForm();
      setIsDialogOpen(false);
      fetchImages();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save images',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', image_url: '', is_active: true });
    setEditingImage(null);
    // Clean up object URLs to prevent memory leaks
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const deleteImageFromGallery = async (id: string, imageUrl: string) => {
    try {
      // Delete from storage if it's an uploaded file
      if (imageUrl.includes('supabase.co')) {
        try {
          await deleteImage(imageUrl);
        } catch (error) {
          console.error('Failed to delete image from storage:', error);
        }
      }

      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Image deleted successfully',
      });
      
      fetchImages();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      image_url: image.image_url,
      is_active: image.is_active
    });
    // Clean up any existing preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const reverseImageOrder = () => {
    const reversedImages = [...images].reverse();
    setImages(reversedImages);
    
    toast({
      title: 'Success',
      description: 'Gallery order reversed',
    });
  };

  // Drag and drop handlers for reordering
  const handleDragStart = (e: React.DragEvent, imageId: string) => {
    setDraggedItem(imageId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, imageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(imageId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleImageDrop = (e: React.DragEvent, targetImageId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetImageId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = images.findIndex(img => img.id === draggedItem);
    const targetIndex = images.findIndex(img => img.id === targetImageId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    // Create new array with reordered items
    const newImages = [...images];
    const [draggedImage] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, draggedImage);

    setImages(newImages);
    setDraggedItem(null);
    setDragOverItem(null);

    toast({
      title: 'Success',
      description: 'Gallery order updated',
    });
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gallery Management</h2>
          <p className="text-sm text-gray-600 mt-1">Drag and drop images to reorder them. The order will be maintained in the public gallery.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setViewMode('sliding')}
              variant={viewMode === 'sliding' ? 'default' : 'ghost'}
              size="sm"
              title="Sliding Window View"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
          {images.length > 1 && (
            <Button 
              onClick={reverseImageOrder}
              variant="outline"
              title="Reverse the order of all images"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Reverse Order
            </Button>
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingImage ? 'Edit' : 'Add'} Image</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Image</Label>
                <div className="space-y-2">
                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    
                    {selectedFiles.length === 0 ? (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Drag and drop images here, or{' '}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-blue-600 hover:text-blue-500 underline"
                          >
                            browse
                          </button>
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports: JPG, PNG, WebP, GIF (max 5MB each)
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          You can select multiple images at once!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-700">
                            {selectedFiles.length} image(s) selected
                          </p>
                          <button
                            type="button"
                            onClick={removeSelectedFiles}
                            className="text-red-600 hover:text-red-500 text-sm underline"
                          >
                            Remove all
                          </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                src={previewUrls[index]}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeSingleFile(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <p className="text-xs text-gray-600 mt-1 truncate" title={file.name}>
                                {file.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Or URL Input */}
                  <div className="text-center">
                    <span className="text-sm text-gray-500">or</span>
                  </div>
                  
                  <div>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({ ...formData, image_url: e.target.value });
                        if (selectedFiles.length > 0) {
                          removeSelectedFiles();
                        }
                      }}
                      disabled={selectedFiles.length > 0}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {uploading && (
                <div className="space-y-2">
                  <Label>Uploading...</Label>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? 'Uploading...' : (editingImage ? 'Update Image' : selectedFiles.length > 1 ? `Add ${selectedFiles.length} Images` : 'Add Image')}
              </Button>
            </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card 
              key={image.id}
              draggable
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDragOver={(e) => handleDragOver(e, image.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleImageDrop(e, image.id)}
              className={`cursor-move transition-all duration-200 ${
                draggedItem === image.id ? 'opacity-50 scale-95' : ''
              } ${
                dragOverItem === image.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              <CardHeader>
                <div className="relative">
                  <div className="absolute top-2 left-2 bg-blue-600 text-white p-1 rounded cursor-move z-10">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  {!image.is_active && (
                    <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-xs">
                      Inactive
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{image.description}</p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => openEditDialog(image)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => deleteImageFromGallery(image.id, image.image_url)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Sliding Window View - 4 rows with 12 images each */}
          {Array.from({ length: Math.ceil(images.length / 12) }, (_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {images
                .slice(rowIndex * 12, (rowIndex + 1) * 12)
                .map((image, itemIndex) => {
                  const globalIndex = rowIndex * 12 + itemIndex;
                  return (
                    <Card 
                      key={image.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, image.id)}
                      onDragOver={(e) => handleDragOver(e, image.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleImageDrop(e, image.id)}
                      className={`overflow-hidden hover:shadow-xl transition-all duration-300 cursor-move group transform hover:scale-105 ${
                        draggedItem === image.id ? 'opacity-50 scale-95' : ''
                      } ${
                        dragOverItem === image.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="absolute top-2 left-2 bg-blue-600 text-white p-1 rounded cursor-move z-10">
                            <GripVertical className="w-3 h-3" />
                          </div>
                          <img 
                            src={image.image_url || '/placeholder.svg'} 
                            alt={image.title}
                            className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
                            <div className="text-white text-center">
                              <h3 className="text-sm md:text-base font-semibold mb-1">{image.title}</h3>
                              {image.description && <p className="text-xs opacity-90">{image.description}</p>}
                              <div className="mt-2 flex justify-center gap-2">
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditDialog(image);
                                  }}
                                  size="sm"
                                  variant="outline"
                                  className="text-white border-white hover:bg-white hover:text-black"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteImageFromGallery(image.id, image.image_url);
                                  }}
                                  size="sm"
                                  variant="destructive"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {!image.is_active && (
                            <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-xs">
                              Inactive
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first gallery image.</p>
          <Button onClick={openAddDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>
      )}
    </div>
  );
};