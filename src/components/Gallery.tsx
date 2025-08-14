import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

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
          <div className="grid md:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={item.image_url || '/placeholder.svg'} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-center opacity-0 hover:opacity-100 transition-opacity">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        {item.description && <p className="text-xs mt-1">{item.description}</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;