import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile-first: Menu button and logo */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">Rawaa's Driving School</h1>
            </div>
            
            {/* Mobile-first: WhatsApp button always visible */}
            <div className="lg:hidden">
              <a 
                href="https://wa.me/61481322734" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
            
            {/* Desktop navigation - hidden on mobile, visible on large screens */}
            <nav className="hidden lg:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</a>
              <a href="#gallery" className="text-gray-700 hover:text-blue-600 transition-colors">Gallery</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            
            {/* Desktop contact info - hidden on mobile, visible on large screens */}
            <div className="hidden xl:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>0481 322 734</span>
              </div>
              <a 
                href="https://wa.me/61481322734" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile floating WhatsApp button - hidden on desktop */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <a 
          href="https://wa.me/61481322734" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
        </a>
      </div>
    </>
  );
};

export default Header;