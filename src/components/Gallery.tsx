import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category?: string;
}

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('🔍 Gallery: Fetching data...');
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        
        console.log('🔍 Gallery: Response:', { data, error });
        
        if (error) throw error;
        console.log('🔍 Gallery: Setting items:', data?.length || 0);
        setGalleryItems(data || []);
      } catch (err: any) {
        console.error('🔍 Gallery: Error:', err);
        setError('Failed to load gallery images.');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Slideshow functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSlideshowPlaying && galleryItems.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
        setSelectedImage(galleryItems[(currentIndex + 1) % galleryItems.length]);
      }, 3000); // 3 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isSlideshowPlaying, galleryItems, currentIndex]);

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
    setIsSlideshowPlaying(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setIsSlideshowPlaying(false);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryItems[prevIndex]);
  };

  const toggleSlideshow = () => {
    setIsSlideshowPlaying(!isSlideshowPlaying);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isModalOpen) return;
    
    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case ' ':
        e.preventDefault();
        toggleSlideshow();
        break;
    }
  };

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Facilities</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take a look at our modern facilities, training vehicles, and learning environment.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : error ? (
          <div className="flex justify-center py-8 text-red-600">{error}</div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No gallery items available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Create 4 rows with 12 images each */}
            {Array.from({ length: Math.ceil(galleryItems.length / 12) }, (_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {galleryItems
                  .slice(rowIndex * 12, (rowIndex + 1) * 12)
                  .map((item, itemIndex) => {
                    const globalIndex = rowIndex * 12 + itemIndex;
                    return (
                      <Card 
                        key={item.id} 
                        className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105"
                        onClick={() => openModal(item, globalIndex)}
                      >
                        <CardContent className="p-0">
                          <div className="relative">
                            <img 
                              src={item.image_url || '/placeholder.svg'} 
                              alt={item.title}
                              className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
                              <div className="text-white text-center">
                                <h3 className="text-sm md:text-base font-semibold mb-1">{item.title}</h3>
                                {item.description && <p className="text-xs opacity-90">{item.description}</p>}
                                <div className="mt-2 flex justify-center">
                                  <Maximize2 className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            ))}
          </div>
        )}

        {/* Image Modal/Lightbox */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent 
            className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-0 m-4"
            onKeyDown={handleKeyDown}
          >
            <div className="relative w-full h-full flex flex-col max-h-[95vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-3 bg-black/50 text-white flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">{selectedImage?.title}</h3>
                  {selectedImage?.description && (
                    <p className="text-sm text-gray-300 mt-1 line-clamp-2">{selectedImage.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <Button
                    onClick={toggleSlideshow}
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white hover:text-black"
                  >
                    {isSlideshowPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span className="hidden sm:inline ml-1">
                      {isSlideshowPlaying ? 'Pause' : 'Play'}
                    </span>
                  </Button>
                  <Button
                    onClick={closeModal}
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Image Container */}
              <div className="flex-1 relative flex items-center justify-center p-2 min-h-0 overflow-hidden">
                {selectedImage && (
                  <img
                    src={selectedImage.image_url}
                    alt={selectedImage.title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    style={{ maxHeight: 'calc(95vh - 120px)' }}
                  />
                )}

                {/* Navigation Arrows */}
                {galleryItems.length > 1 && (
                  <>
                    <Button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 z-10"
                      size="sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0 z-10"
                      size="sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Footer with Image Counter */}
              <div className="p-3 bg-black/50 text-white text-center flex-shrink-0">
                <p className="text-sm">
                  {currentIndex + 1} of {galleryItems.length} images
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Use arrow keys to navigate • Space to play/pause • Esc to close
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;