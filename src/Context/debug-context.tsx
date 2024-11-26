import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { IWall } from '../Interfaces/IWall';
import { ConverterGraphWallNotationToAdjList, ShortestPathFromAnyNodeToEnd } from '../Modules/_shared/utils';
import prunedGraph from '../Graphs/PRUNEDGRAPH_2511_3.json'
import { Dijkstra } from '../Algorithms/Dijkstra';

interface DebugContextType {
    isDebugEnable: boolean,
    setDebugEnable: (enabled: boolean) => void,
    visitedNodeCounter: number,
    setVisitedNodeCounter: (num: number) => void,
    pathNodeCounter: number,
    setPathNodeCounter: (num: number) => void
    graph: {
        length: number;
        width: number;
        walls: IWall[];
    }, 
    setGraph: (g: {
        length: number;
        width: number;
        walls: IWall[];
    }) => void,
    statusLog: string[],
    setStatusLog: (logs: string[]) => void,
    isDebugTerminalOpen: boolean,
    setIsDebugTerminalOpen: (logs: boolean) => void,
    distancesToGoalSimplifiedMaze: { [key: string]: number }
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
    const [statusLog, setStatusLog] = useState<string[]>([])
    const [isDebugTerminalOpen, setIsDebugTerminalOpen] = useState<boolean>(false)
    const [distancesToGoalSimplifiedMaze, setDistancesToGoalSimplifiedMaze] = useState<{ [key: string]: number }>({})

    const [graph, setGraph] = useState<{
        length: number;
        width: number;
        walls: IWall[];
    }>({
        length: 0,
        width: 0,
        walls: []
    })

    useEffect(() => {
        const simplifiedMaze = prunedGraph as {
            length: number,
            width: number,
            walls: IWall[]
        };
    
        const graph = ConverterGraphWallNotationToAdjList(simplifiedMaze);
        const prunnedGrpahVertex = graph.getVertex();
    
        const distancesToGoalSimplifiedMaze: { [key: string]: number } = {};
    
        for (const vertex of prunnedGrpahVertex) {
            const [xV, yV] = vertex.split('-').map(Number);
            const _dijkstra = Dijkstra(simplifiedMaze, [xV, yV], [14, 29]);
            distancesToGoalSimplifiedMaze[vertex] = _dijkstra.totalDistance;
        }

        setDistancesToGoalSimplifiedMaze(distancesToGoalSimplifiedMaze)

    }, []);

    return (
        <DebugContext.Provider value={{ 
            isDebugEnable, 
            setDebugEnable,
            visitedNodeCounter,
            setVisitedNodeCounter,
            pathNodeCounter,
            setPathNodeCounter,
            graph,
            setGraph,
            statusLog,
            setStatusLog,
            isDebugTerminalOpen,
            setIsDebugTerminalOpen,
            distancesToGoalSimplifiedMaze
            }}>
            {children}
        </DebugContext.Provider>
    );
};