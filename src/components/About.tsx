import React from 'react';
import { Award, Users, Clock, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-driving-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-80 sm:h-80 bg-driving-orange/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-driving-blue/10 rounded-full mb-4 sm:mb-6">
              <span className="text-driving-blue font-semibold text-xs sm:text-sm">👨‍🏫 Meet Your Expert</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Meet Your
              <span className="bg-gradient-to-r from-driving-blue to-driving-orange bg-clip-text text-transparent block">
                Instructor
              </span>
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-driving-blue to-driving-orange mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Mobile-first image section */}
            <div className="order-first lg:order-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-driving-blue/20 to-driving-orange/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/20">
                  <img 
                    src="/rawaa-driving-school.jpg"
                    alt="Rawaa H - Certified Driving Instructor"
                    className="w-full h-auto rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Mobile-first content section */}
            <div className="order-last lg:order-2 space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-driving-orange/10 rounded-full">
                  <span className="text-driving-orange font-semibold text-xs sm:text-sm">🏆 Certified Professional</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Rawaa H
                </h3>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-driving-orange to-driving-blue rounded-full"></div>
              </div>
              
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed">
                <p>
                  Hey I'm Rawaa H, a highly experienced and certified driving instructor with over 15 years of professional driving instruction experience. 
                  I specialize in helping learner drivers master essential driving skills, pass their driving test, and obtain their driver's licence with confidence.
                </p>
                <p>
                  My comprehensive driving lesson program covers everything from basic car control and road safety to advanced defensive driving techniques. 
                  Whether you're a complete beginner or need to refresh your driving skills, I provide personalized instruction tailored to your learning style and goals.
                </p>
                <p>
                  <strong>Language Support:</strong> I provide instruction in both English and Arabic, ensuring that language barriers don't prevent you from learning to drive safely and confidently. 
                  Whether you prefer English or Arabic instruction, I can adapt my teaching methods to suit your language preference.
                </p>
                <p>
                  As your dedicated driving instructor, I focus on building your confidence behind the wheel while ensuring you understand all road rules, 
                  traffic signs, and safe driving practices. My proven teaching methods have helped hundreds of students successfully pass their practical driving test 
                  and become safe, responsible drivers on Australian roads.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6">
                <div className="group text-center">
                  <div className="bg-gradient-to-br from-driving-blue to-driving-blue-light rounded-2xl p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Award className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base sm:text-lg">15+ Years</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Experience</p>
                </div>
                <div className="group text-center">
                  <div className="bg-gradient-to-br from-driving-orange to-driving-orange-light rounded-2xl p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Users className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base sm:text-lg">Certified</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Instructor</p>
                </div>
                <div className="group text-center">
                  <div className="bg-gradient-to-br from-driving-purple to-driving-purple-light rounded-2xl p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base sm:text-lg">Safe</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Driving Focus</p>
                </div>
                <div className="group text-center">
                  <div className="bg-gradient-to-br from-driving-green to-driving-green-light rounded-2xl p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Clock className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base sm:text-lg">Proven</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Methods</p>
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
