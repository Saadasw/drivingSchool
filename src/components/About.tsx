import React from 'react';
import { Award, Users, Clock, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-driving-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-driving-orange/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-driving-blue/10 rounded-full mb-6">
              <span className="text-driving-blue font-semibold text-sm">👨‍🏫 Meet Your Expert</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Your
              <span className="bg-gradient-to-r from-driving-blue to-driving-orange bg-clip-text text-transparent block">
                Instructor
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-driving-blue to-driving-orange mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-driving-blue/20 to-driving-orange/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <img 
                    src="/rawaa-driving-school.jpg"
                    alt="Rawaa H - Certified Driving Instructor"
                    className="w-full h-auto rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-driving-orange/10 rounded-full">
                  <span className="text-driving-orange font-semibold text-sm">🏆 Certified Professional</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Rawaa H
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-driving-orange to-driving-blue rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Hey I'm Rawaa H, a highly experienced and certified driving instructor. 
                  For the past 15 years, I have dedicated my career to helping students become 
                  safe, confident, and successful drivers.
                </p>
                <p>
                  My proven approach is designed to guide learners from their very first lesson 
                  all the way to confidently passing their final test and getting their licence. 
                  I believe that being a successful driver is about more than just passing a test 
                  it's about mastering real world skills.
                </p>
                <p>
                  That's why I provide comprehensive training that covers everything from 
                  foundational skills to advanced defensive driving techniques, ensuring you are 
                  well prepared for any situation on the road. I am committed to delivering 
                  results and helping my students succeed and achieve their driving goals.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="group text-center">
                  <div className="bg-gradient-to-br from-driving-blue to-driving-blue-light rounded-2xl p-4 w-20 h-20 mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Award className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">15+ Years</h4>
                  <p className="text-sm text-gray-600 font-medium">Experience</p>
                </div>
                <div className="group text-center">
                  <div className="bg-gradient-to-br from-driving-orange to-driving-orange-light rounded-2xl p-4 w-20 h-20 mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Certified</h4>
                  <p className="text-sm text-gray-600 font-medium">Instructor</p>
                </div>
                <div className="group text-center">
                  <div className="bg-gradient-to-br from-driving-purple to-driving-purple-light rounded-2xl p-4 w-20 h-20 mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Safe</h4>
                  <p className="text-sm text-gray-600 font-medium">Driving Focus</p>
                </div>
                <div className="group text-center">
                  <div className="bg-gradient-to-br from-driving-green to-driving-green-light rounded-2xl p-4 w-20 h-20 mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Clock className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Proven</h4>
                  <p className="text-sm text-gray-600 font-medium">Methods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
