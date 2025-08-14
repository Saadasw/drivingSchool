import React, { createContext, useContext, useState, useEffect } from 'react';

interface VisibilitySettings {
  showMap: boolean;
  showContactForm: boolean;
}

interface VisibilityContextType {
  visibility: VisibilitySettings;
  updateVisibility: (newSettings: Partial<VisibilitySettings>) => void;
}

const defaultVisibility: VisibilitySettings = {
  showMap: true,
  showContactForm: true
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
  const [visibility, setVisibility] = useState<VisibilitySettings>(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('driving-school-visibility');
    return saved ? JSON.parse(saved) : defaultVisibility;
  });

  const updateVisibility = (newSettings: Partial<VisibilitySettings>) => {
    const updatedSettings = { ...visibility, ...newSettings };
    setVisibility(updatedSettings);
    // Save to localStorage
    localStorage.setItem('driving-school-visibility', JSON.stringify(updatedSettings));
  };

  // Save to localStorage whenever visibility changes
  useEffect(() => {
    localStorage.setItem('driving-school-visibility', JSON.stringify(visibility));
  }, [visibility]);

  return (
    <VisibilityContext.Provider value={{ visibility, updateVisibility }}>
      {children}
    </VisibilityContext.Provider>
  );
};
