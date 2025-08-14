import React, { createContext, useContext, useState, useEffect } from 'react';

interface Statistics {
  happyStudents: string;
  passRate: string;
  yearsExperience: string;
}

interface StatisticsContextType {
  statistics: Statistics;
  updateStatistics: (newStats: Partial<Statistics>) => void;
}

const defaultStatistics: Statistics = {
  happyStudents: '500+',
  passRate: '95%',
  yearsExperience: '10+'
};

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (context === undefined) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
};

interface StatisticsProviderProps {
  children: React.ReactNode;
}

export const StatisticsProvider: React.FC<StatisticsProviderProps> = ({ children }) => {
  const [statistics, setStatistics] = useState<Statistics>(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('driving-school-statistics');
    return saved ? JSON.parse(saved) : defaultStatistics;
  });

  const updateStatistics = (newStats: Partial<Statistics>) => {
    const updatedStats = { ...statistics, ...newStats };
    setStatistics(updatedStats);
    // Save to localStorage
    localStorage.setItem('driving-school-statistics', JSON.stringify(updatedStats));
  };

  // Save to localStorage whenever statistics change
  useEffect(() => {
    localStorage.setItem('driving-school-statistics', JSON.stringify(statistics));
  }, [statistics]);

  return (
    <StatisticsContext.Provider value={{ statistics, updateStatistics }}>
      {children}
    </StatisticsContext.Provider>
  );
};
