import React, { createContext, useState, useContext, ReactNode } from 'react';

interface DebugContextType {
    isDebugEnable: boolean,
    setDebugEnable: (enabled: boolean) => void,
    visitedNodeCounter: number,
    setVisitedNodeCounter: (num: number) => void,
    pathNodeCounter: number,
    setPathNodeCounter: (num: number) => void
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
    const [visitedNodeCounter, setVisitedNodeCounter] = useState<number>(0)
    const [pathNodeCounter, setPathNodeCounter] = useState<number>(0)

    return (
        <DebugContext.Provider value={{ 
            isDebugEnable, 
            setDebugEnable,
            visitedNodeCounter,
            setVisitedNodeCounter,
            pathNodeCounter,
            setPathNodeCounter
            }}>
            {children}
        </DebugContext.Provider>
    );
};