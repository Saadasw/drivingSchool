import React from 'react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">DriveAcademy</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li><a href="#home" className="block py-2 text-gray-700 hover:text-blue-600" onClick={onClose}>Home</a></li>
            <li><a href="#courses" className="block py-2 text-gray-700 hover:text-blue-600" onClick={onClose}>Courses</a></li>
            <li><a href="#gallery" className="block py-2 text-gray-700 hover:text-blue-600" onClick={onClose}>Gallery</a></li>
            <li><a href="#testimonials" className="block py-2 text-gray-700 hover:text-blue-600" onClick={onClose}>Reviews</a></li>
            <li><a href="#faq" className="block py-2 text-gray-700 hover:text-blue-600" onClick={onClose}>FAQ</a></li>
            <li><a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600" onClick={onClose}>Contact</a></li>
          </ul>
          <div className="mt-8 pt-8 border-t">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
              Book Now
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;