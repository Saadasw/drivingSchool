import React from 'react';
import { X, MessageCircle } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed top-0 left-0 w-72 sm:w-80 h-full bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">Rawaa's Driving School</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-3">
            <li><a href="#home" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" onClick={onClose}>Home</a></li>
            <li><a href="#about" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" onClick={onClose}>About</a></li>
            <li><a href="#courses" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" onClick={onClose}>Courses</a></li>
            <li><a href="#gallery" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" onClick={onClose}>Gallery</a></li>
            <li><a href="#testimonials" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" onClick={onClose}>Reviews</a></li>
            <li><a href="#faq" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" onClick={onClose}>FAQ</a></li>
            <li><a href="#contact" className="block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" onClick={onClose}>Contact</a></li>
          </ul>
          <div className="mt-8 pt-6 border-t">
            <a 
              href="https://wa.me/61481322734" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;