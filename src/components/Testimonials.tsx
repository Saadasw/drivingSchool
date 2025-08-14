import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useStatistics } from '@/contexts/StatisticsContext';

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  image_url?: string;
  age?: number;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { statistics } = useStatistics();

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setTestimonials(data || []);
      } catch (err: any) {
        setError('Failed to load testimonials.');
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our successful students have to say about their experience.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : error ? (
          <div className="flex justify-center py-8 text-red-600">{error}</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Quote className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No testimonials available</h3>
              <p className="text-sm">Student testimonials will appear here once they are added through the admin panel.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image_url || '/placeholder.svg'} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      {testimonial.age && <p className="text-sm text-gray-500">Age {testimonial.age}</p>}
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating || 0 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="relative">
                    <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                    <p className="text-gray-600 italic pl-6">{testimonial.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Join hundreds of satisfied students who earned their license with us!</p>
          <div className="flex justify-center items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{statistics.happyStudents}</div>
              <div className="text-sm text-gray-500">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{statistics.passRate}</div>
              <div className="text-sm text-gray-500">Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{statistics.yearsExperience}</div>
              <div className="text-sm text-gray-500">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;