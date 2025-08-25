import React, { createContext, useContext, useState, useEffect } from 'react';
import { databaseService, ContactInfo } from '@/lib/database';

interface ContactInfoContextType {
  contactInfo: ContactInfo | null;
  updateContactInfo: (contactInfo: Partial<ContactInfo>) => Promise<boolean>;
  isLoading: boolean;
  resetToDefaults: () => Promise<void>;
}

const defaultContactInfo: ContactInfo = {
  id: '',
  phone: '0481 322 734',
  email: 'info@rawaadrivingschool.com',
  address: '123 George Street\nSydney, NSW 2000',
  hours: 'Mon-Fri: 8AM-6PM\nSat: 9AM-4PM',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const ContactInfoContext = createContext<ContactInfoContextType | undefined>(undefined);

export const ContactInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from database
  useEffect(() => {
    const initializeContactInfo = async () => {
      try {
        setIsLoading(true);
        
        // Load contact info from database (skip initialization since data already exists)
        const info = await databaseService.getContactInfo();
        if (info) {
          setContactInfo(info);
        } else {
          // Use defaults if no data in database
          setContactInfo(defaultContactInfo);
        }
      } catch (error) {
        console.error('Error initializing contact info context:', error);
        // Use defaults on error
        setContactInfo(defaultContactInfo);
      } finally {
        setIsLoading(false);
      }
    };

    initializeContactInfo();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    if (isLoading) return;

    const subscription = databaseService.subscribeToContactInfo((info) => {
      setContactInfo(info);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isLoading]);

  const updateContactInfo = async (newInfo: Partial<ContactInfo>): Promise<boolean> => {
    try {
      // Update local state immediately for better UX
      if (contactInfo) {
        setContactInfo(prev => prev ? { ...prev, ...newInfo } : null);
      }
      
      // Update database
      const success = await databaseService.updateContactInfo(newInfo);
      
      if (!success) {
        // Revert local state if database update failed
        if (contactInfo) {
          setContactInfo(prev => prev ? { ...prev, ...newInfo } : null);
        }
        console.error('Failed to update contact info in database');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error updating contact info:', error);
      // Revert local state on error
      if (contactInfo) {
        setContactInfo(prev => prev ? { ...prev, ...newInfo } : null);
      }
      return false;
    }
  };

  const resetToDefaults = async () => {
    try {
      const success = await databaseService.resetToDefaults();
      if (success) {
        setContactInfo(defaultContactInfo);
      }
    } catch (error) {
      console.error('Error resetting to defaults:', error);
    }
  };

  return (
    <ContactInfoContext.Provider value={{ 
      contactInfo, 
      updateContactInfo, 
      isLoading, 
      resetToDefaults 
    }}>
      {children}
    </ContactInfoContext.Provider>
  );
};

export const useContactInfo = () => {
  const context = useContext(ContactInfoContext);
  if (context === undefined) {
    throw new Error('useContactInfo must be used within a ContactInfoProvider');
  }
  return context;
};
