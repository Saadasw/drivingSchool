import React from 'react';
import { Button } from '@/components/ui/button';
import { Car, Users, Award, Clock, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-driving-blue/5 to-driving-orange/5"></div>
      <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-driving-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-driving-orange/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Mobile-first content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-driving-blue/20">
                <span className="text-driving-blue font-semibold text-xs sm:text-sm">🚗 Professional Driving School</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Learn to Drive with
                <span className="bg-gradient-to-r from-driving-blue to-driving-orange bg-clip-text text-transparent block">
                  Confidence
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-lg">
                Professional driving instruction with experienced instructors. 
                Get your licence faster with our proven teaching methods.
              </p>
            </div>

            {/* Mobile-first CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href="https://wa.me/61481322734" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-driving-green to-driving-green-light hover:from-driving-green-light hover:to-driving-green text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-base sm:text-lg font-bold"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
                Start Learning Today
              </a>
              <a 
                href="#courses" 
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm hover:bg-white text-driving-blue border-2 border-driving-blue hover:border-driving-blue-light px-6 py-3 sm:px-8 sm:py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 text-base sm:text-lg font-semibold"
              >
                View Courses
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            
            {/* Mobile-first Feature Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="group text-center">
                <div className="bg-gradient-to-br from-driving-blue to-driving-blue-light rounded-2xl p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Car className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-driving-blue transition-colors">Modern Fleet</p>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-driving-orange to-driving-orange-light rounded-2xl p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Users className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-driving-orange transition-colors">Expert Instructors</p>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-driving-purple to-driving-purple-light rounded-2xl p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Award className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-driving-purple transition-colors">High Pass Rate</p>
              </div>
              <div className="group text-center">
                <div className="bg-gradient-to-br from-driving-green to-driving-green-light rounded-2xl p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Clock className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-driving-green transition-colors">Flexible Hours</p>
              </div>
            </div>
          </div>
          
          {/* Mobile-first image section */}
          <div className="relative order-first lg:order-last">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-driving-blue/5 to-driving-orange/5 rounded-2xl sm:rounded-3xl"></div>
              <img 
                src="/rawaa-driving-school.jpg"
                alt="Rawaa's Driving School - Professional driving instruction with phone number 0481 322 734" 
                className="relative w-full h-auto object-contain rounded-xl sm:rounded-2xl shadow-lg"
              />
              <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 bg-gradient-to-r from-driving-green to-driving-green-light text-white px-3 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-xl border-2 border-white">
                📞 Call: 0481 322 734
              </div>
              {/* Floating elements */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-gradient-to-r from-driving-orange to-driving-orange-light text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-semibold text-xs shadow-lg">
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