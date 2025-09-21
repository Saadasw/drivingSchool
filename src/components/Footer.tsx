import React from 'react';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { useVisibility } from '@/contexts/VisibilityContext';
import { useContactInfo } from '@/contexts/ContactInfoContext';

const Footer: React.FC = () => {
  const { visibility } = useVisibility();
  const { contactInfo, isLoading } = useContactInfo();

  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400 mb-3 sm:mb-4">Rawaa's Driving School</h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Professional driving instruction with a proven track record of success.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <a 
                href="https://www.instagram.com/rawaasdrivingschool?igsh=anRnZ2NocnE5ZnQ2&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <Youtube className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-red-400 cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>Beginner Lessons</li>
              <li>Intensive Courses</li>
              <li>Refresher Training</li>
              <li>Test Preparation</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h4>
            <div className="space-y-2 text-gray-300 text-sm sm:text-base">
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mx-auto"></div>
                </div>
              ) : contactInfo ? (
                <>
                  {visibility.showFooterPhone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{contactInfo.phone}</span>
                    </div>
                  )}
                  {visibility.showFooterEmail && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{contactInfo.email}</span>
                    </div>
                  )}
                  {visibility.showFooterAddress && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span className="whitespace-pre-line">{contactInfo.address}</span>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500">Contact information not available</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 lg:pt-8 text-center text-gray-400 text-sm sm:text-base">
          <p>&copy; 2024 Rawaa's Driving School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;