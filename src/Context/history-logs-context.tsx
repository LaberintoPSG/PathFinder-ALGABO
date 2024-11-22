import React, { createContext, useState, useContext, ReactNode } from 'react';

interface HistoryLogsContextType {
    historyAlgorithms: Array<HistoryAlgorithmLogs>, 
    setHistoryAlgorithms: (e: Array<HistoryAlgorithmLogs>) => void
}

const HistoryLogsContext = createContext<HistoryLogsContextType | undefined>(undefined);

interface HistoryProviderProps {
    children: ReactNode;
}

export const useHistory = (): HistoryLogsContextType => {
    const context = useContext(HistoryLogsContext);
    if (context === undefined) {
        throw new Error('useHistory debe usarse dentro de un DebugProvider');
    }
    return context;
};

interface HistoryAlgorithmLogs {
    algorithmName: string,
    visitedNodes: number
    pathNodes: number,
    totalNodes: number,
    heuristic?: string
}

export const HistoryLogsContextProvider: React.FC<HistoryProviderProps> = ({ children }) => {

    const [historyAlgorithms, setHistoryAlgorithms] = useState<Array<HistoryAlgorithmLogs>>([])


    return (
        <HistoryLogsContext.Provider value={{ 
            historyAlgorithms, 
            setHistoryAlgorithms
            }}>
            {children}
        </HistoryLogsContext.Provider>
    );
};