import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setCourses(data || []);
      } catch (err: any) {
        setError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section id="courses" className="relative py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-driving-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-driving-purple/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-driving-orange/10 rounded-full mb-6">
            <span className="text-driving-orange font-semibold text-sm">📚 Our Courses</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Driving
            <span className="bg-gradient-to-r from-driving-orange to-driving-purple bg-clip-text text-transparent block">
              Courses
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our comprehensive range of professional driving lessons and license test preparation courses. 
            Our certified driving instructor offers flexible scheduling to fit your busy lifestyle and help you pass your driving test successfully.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-driving-orange to-driving-purple mx-auto rounded-full mt-6"></div>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : error ? (
          <div className="flex justify-center py-8 text-red-600">{error}</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No courses available</h3>
              <p className="text-sm">Courses will appear here once they are added through the admin panel.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={course.id} className="group relative bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-driving-blue/5 to-driving-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-driving-blue transition-colors">
                      {course.title}
                    </CardTitle>
                    <Badge className="bg-gradient-to-r from-driving-orange to-driving-orange-light text-white border-0 shadow-lg">
                      {course.duration}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-driving-blue to-driving-orange bg-clip-text text-transparent mb-2">
                      ${course.price}
                    </div>
                    <div className="space-y-3">
                      {course.features?.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-driving-green to-driving-green-light rounded-full p-1">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-driving-blue to-driving-orange hover:from-driving-blue-light hover:to-driving-orange-light text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold py-3"
                    onClick={() => {
                      const message = `Hi! I'm interested in the ${course.title} course for $${course.price}. Can you tell me more about this package and how to get started?`;
                      const whatsappUrl = `https://wa.me/61481322734?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    Choose This Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;