import React from 'react';
import { Button } from '@/components/ui/button';
import { Car, Users, Award, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn to Drive with
              <span className="text-blue-600 block">Confidence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Professional driving instruction with experienced instructors. 
              Get your license faster with our proven teaching methods.
            </p>

            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-2 shadow-md">
                  <Car className="h-10 w-10 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Modern Fleet</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-2 shadow-md">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Expert Instructors</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-2 shadow-md">
                  <Award className="h-10 w-10 text-blue-600" />
                </div>
                <p className="text-sm font-medium">High Pass Rate</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-2 shadow-md">
                  <Clock className="h-10 w-10 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Flexible Hours</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <img 
                src="/ruwaa-driving-school.jpg" 
                alt="Ruwaa Driving School - Professional driving instruction with phone number 0481 322 734" 
                className="w-full h-auto object-contain rounded-lg"
              />
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                Call: 0481 322 734
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;