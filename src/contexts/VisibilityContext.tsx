import React, { createContext, useContext, useState, useEffect } from 'react';
import { databaseService } from '@/lib/database';

interface VisibilitySettings {
  showContactForm: boolean;
  showPhone: boolean;
  showEmail: boolean;
  showAddress: boolean;
  showHours: boolean;
  showFooterPhone: boolean;
  showFooterEmail: boolean;
  showFooterAddress: boolean;
}

interface VisibilityContextType {
  visibility: VisibilitySettings;
  updateVisibility: (newSettings: Partial<VisibilitySettings>) => void;
  resetToDefaults: () => void;
}

const defaultVisibility: VisibilitySettings = {
  showContactForm: true,
  showPhone: true,
  showEmail: true,
  showAddress: true,
  showHours: true,
  showFooterPhone: true,
  showFooterEmail: true,
  showFooterAddress: true
};

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const useVisibility = () => {
  const context = useContext(VisibilityContext);
  if (context === undefined) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
};

interface VisibilityProviderProps {
  children: React.ReactNode;
}

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  const [visibility, setVisibility] = useState<VisibilitySettings>(defaultVisibility);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from database
  useEffect(() => {
    const initializeVisibility = async () => {
      try {
        // Load visibility settings from database (skip initialization since data already exists)
        const settings = await databaseService.getVisibilitySettings();
        if (Object.keys(settings).length > 0) {
          setVisibility(prev => ({ ...prev, ...settings }));
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing visibility context:', error);
        setIsInitialized(true);
      }
    };

    initializeVisibility();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!isInitialized) return;

    const subscription = databaseService.subscribeToVisibilitySettings((settings) => {
      setVisibility(prev => ({ ...prev, ...settings }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isInitialized]);

  const updateVisibility = async (newSettings: Partial<VisibilitySettings>) => {
    try {
      // Update local state immediately for better UX
      setVisibility(prev => ({ ...prev, ...newSettings }));
      
      // Update database
      const success = await databaseService.updateVisibilitySettings(newSettings);
      
      if (!success) {
        // Revert local state if database update failed
        console.error('Failed to update visibility settings in database');
      }
    } catch (error) {
      console.error('Error updating visibility settings:', error);
    }
  };

  const resetToDefaults = async () => {
    try {
      const success = await databaseService.resetToDefaults();
      if (success) {
        setVisibility(defaultVisibility);
      }
    } catch (error) {
      console.error('Error resetting to defaults:', error);
    }
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <VisibilityContext.Provider value={{ visibility, updateVisibility, resetToDefaults }}>
      {children}
    </VisibilityContext.Provider>
  );
};
