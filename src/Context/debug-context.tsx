import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DebugContextType {
    isDebugEnable: boolean;
    setDebugEnable: (enabled: boolean) => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

interface DebugProviderProps {
    children: ReactNode;
}

export const useDebug = (): DebugContextType => {
    const context = useContext(DebugContext);
    if (context === undefined) {
        throw new Error('useDebug debe usarse dentro de un DebugProvider');
    }
    return context;
};

export const DebugContextProvider: React.FC<DebugProviderProps> = ({ children }) => {
    const [isDebugEnable, setDebugEnable] = useState(false);

    return (
        <DebugContext.Provider value={{ isDebugEnable, setDebugEnable }}>
            {children}
        </DebugContext.Provider>
    );
};