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
import { Plus, Trash2, Edit, Upload, X, Image as ImageIcon } from 'lucide-react';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
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

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData(prev => ({ ...prev, image_url: '' })); // Clear URL input when file is selected
    } else {
      toast({
        title: 'Invalid file',
        description: 'Please select a valid image file',
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile && !formData.image_url) {
      toast({
        title: 'Error',
        description: 'Please select an image file or provide an image URL',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      let imageUrl = formData.image_url;

      // Upload file if selected
      if (selectedFile) {
        setUploadProgress(50);
        imageUrl = await uploadImage(selectedFile);
        setUploadProgress(100);
      }

      const imageData = {
        ...formData,
        image_url: imageUrl
      };

      if (editingImage) {
        // Delete old image if it was uploaded to storage
        if (editingImage.image_url.includes('supabase.co') && imageUrl !== editingImage.image_url) {
          try {
            await deleteImage(editingImage.image_url);
          } catch (error) {
            console.error('Failed to delete old image:', error);
          }
        }

        const { error } = await supabase
          .from('gallery')
          .update(imageData)
          .eq('id', editingImage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert([imageData]);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Image ${editingImage ? 'updated' : 'added'} successfully`,
      });

      resetForm();
      setIsDialogOpen(false);
      fetchImages();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save image',
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
    setSelectedFile(null);
    setPreviewUrl('');
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
    setSelectedFile(null);
    setPreviewUrl('');
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
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
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    
                    {!selectedFile ? (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Drag and drop an image here, or{' '}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-blue-600 hover:text-blue-500 underline"
                          >
                            browse
                          </button>
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports: JPG, PNG, WebP, GIF (max 5MB)
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="relative inline-block">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={removeSelectedFile}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">{selectedFile.name}</p>
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
                        if (selectedFile) {
                          removeSelectedFile();
                        }
                      }}
                      disabled={!!selectedFile}
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
                {uploading ? 'Uploading...' : (editingImage ? 'Update' : 'Add')} Image
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id}>
            <CardHeader>
              <div className="relative">
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