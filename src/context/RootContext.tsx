import React, { createContext, useContext, useMemo, useState } from 'react';
import { RootType } from '../data/modules';

type RootContextValue = {
  currentRoot: RootType;
  setCurrentRoot: (root: RootType) => void;
};

const RootContext = createContext<RootContextValue | undefined>(undefined);

export const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoot, setCurrentRoot] = useState<RootType>('India');

  const value = useMemo(() => ({ currentRoot, setCurrentRoot }), [currentRoot]);

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRoot = (): RootContextValue => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRoot must be used within a RootProvider');
  }
  return context;
};
