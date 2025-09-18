import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, Users, Award, Clock } from 'lucide-react';
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
    <section id="testimonials" className="relative py-24 bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-driving-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-driving-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-driving-purple/10 rounded-full mb-6">
            <span className="text-driving-purple font-semibold text-sm">⭐ Student Reviews</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            What Our Students
            <span className="bg-gradient-to-r from-driving-purple to-driving-blue bg-clip-text text-transparent block">
              Say
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our successful students have to say about their experience.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-driving-purple to-driving-blue mx-auto rounded-full mt-6"></div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="group relative bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-driving-purple/5 to-driving-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="relative z-10 p-8">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <img 
                        src={testimonial.image_url || '/placeholder.svg'} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-driving-green to-driving-green-light rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white fill-current" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                      {testimonial.age && <p className="text-sm text-gray-500 font-medium">Age {testimonial.age}</p>}
                    </div>
                  </div>
                  
                  <div className="flex mb-6">
                    {Array.from({ length: testimonial.rating || 0 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <Quote className="h-8 w-8 text-driving-purple/30 absolute -top-2 -left-2" />
                    <p className="text-gray-600 italic pl-6 leading-relaxed text-base">
                      "{testimonial.content}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="text-center mt-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-8 font-medium">Join hundreds of satisfied students who earned their license with us!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-driving-blue to-driving-blue-light rounded-2xl p-6 w-24 h-24 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Users className="h-12 w-12 text-white mx-auto" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-driving-blue to-driving-blue-light bg-clip-text text-transparent mb-2">
                  {statistics.happyStudents}
                </div>
                <div className="text-sm text-gray-600 font-semibold">Happy Students</div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-driving-orange to-driving-orange-light rounded-2xl p-6 w-24 h-24 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Award className="h-12 w-12 text-white mx-auto" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-driving-orange to-driving-orange-light bg-clip-text text-transparent mb-2">
                  {statistics.passRate}
                </div>
                <div className="text-sm text-gray-600 font-semibold">Pass Rate</div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-driving-purple to-driving-purple-light rounded-2xl p-6 w-24 h-24 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Clock className="h-12 w-12 text-white mx-auto" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-driving-purple to-driving-purple-light bg-clip-text text-transparent mb-2">
                  {statistics.yearsExperience}
                </div>
                <div className="text-sm text-gray-600 font-semibold">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;