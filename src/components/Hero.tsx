import React from 'react';
import { Button } from '@/components/ui/button';
import { Car, Users, Award, Clock, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-driving-blue/5 to-driving-orange/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-driving-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-driving-orange/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-driving-blue/20">
                <span className="text-driving-blue font-semibold text-sm">🚗 Professional Driving School</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Learn to Drive with
                <span className="bg-gradient-to-r from-driving-blue to-driving-orange bg-clip-text text-transparent block">
                  Confidence
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg">
                Professional driving instruction with experienced instructors. 
                Get your licence faster with our proven teaching methods.
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/61481322734" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-driving-green to-driving-green-light hover:from-driving-green-light hover:to-driving-green text-white px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg font-bold"
              >
                <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
                Start Learning Today
              </a>
              <a 
                href="#courses" 
                className="group inline-flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm hover:bg-white text-driving-blue border-2 border-driving-blue hover:border-driving-blue-light px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 text-lg font-semibold"
              >
                View Courses
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            
            {/* Enhanced Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="group text-center">
                <div className="bg-gradient-to-br from-driving-blue to-driving-blue-light rounded-2xl p-4 w-20 h-20 mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Car className="h-12 w-12 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-driving-blue transition-colors">Modern Fleet</p>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-driving-orange to-driving-orange-light rounded-2xl p-4 w-20 h-20 mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-driving-orange transition-colors">Expert Instructors</p>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-driving-purple to-driving-purple-light rounded-2xl p-4 w-20 h-20 mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-driving-purple transition-colors">High Pass Rate</p>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-driving-green to-driving-green-light rounded-2xl p-4 w-20 h-20 mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Clock className="h-12 w-12 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-driving-green transition-colors">Flexible Hours</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-driving-blue/5 to-driving-orange/5 rounded-3xl"></div>
              <img 
                src="/rawaa-driving-school.jpg"
                alt="Rawaa's Driving School - Professional driving instruction with phone number 0481 322 734" 
                className="relative w-full h-auto object-contain rounded-2xl shadow-lg"
              />
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-driving-green to-driving-green-light text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl border-2 border-white">
                📞 Call: 0481 322 734
              </div>
              {/* Floating elements */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-driving-orange to-driving-orange-light text-white px-4 py-2 rounded-xl font-semibold text-xs shadow-lg">
                ⭐ 15+ Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;