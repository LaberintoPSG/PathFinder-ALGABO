import { Button, MenuItem, Select } from "@mui/material";
import { BFS, findPathFromBFS, visitedNodesBFS } from "../../../../Algorithms/BFS";
import { Dijkstra } from "../../../../Algorithms/Dijkstra";
import { IWall } from "../../../../Interfaces/IWall";
import { ConverterGraphWallNotationToAdjList, convertGraphToWeightedGraph, PruneMaze } from "../../utils";
import { Square } from "./square";
import { ReactNode, useEffect, useState } from "react";
import { AlgorithmType } from "../../../../Constants/Types";
import { DummyGraphTS } from "../../../../Graphs/DummyGraph";
import { DFS, findPathFromDFS } from "../../../../Algorithms/DFS";
import { Astar, findPathFromAstar, visitedNodesAstar, WeightedGraph } from "../../../../Algorithms/Astar";
import { HeuristicsCollection } from "../../../../Algorithms/Heuristics";
import { AlgoritmOptions } from "./algorithm-options";
import { MazeLegend } from "./maze-legend";
import { useDebug } from "../../../../Context/debug-context";
import { useHistory } from "../../../../Context/history-logs-context";
import prunedGraph from '../../../../Graphs/PRUNEDGRAPH_2511_3.json'


interface MazeProps {
    Graph: {
        length: number;
        width: number;
        walls: IWall[];
    }
}

export const Maze: React.FC<MazeProps> = ({ Graph }) => {
    const [squares,setSquares] = useState<ReactNode[]>([])
    const [coloredSquares, setColoredSquares] = useState<Set<string>>(new Set());
    const [visitedSquares, setVisitedSquares] = useState<Set<string>>(new Set());
    const {length, width} = Graph
    const [selectedHeuristicForAstar, setSelectedHeuristicForAstar] = useState<number>(1)
    const {pathNodeCounter, setPathNodeCounter, setVisitedNodeCounter, visitedNodeCounter, setStatusLog, distancesToGoalSimplifiedMaze: optimalDistanceToGoalSimplifiedMaze} = useDebug()
    const { setHistoryAlgorithms, historyAlgorithms, setSelectedHeuristic, setCurrentExecutingAlgorithm, currentTotalVisitedNodes, setcurrentTotalVisitedNodes } = useHistory()

    const initializeMaze = () => {
        const sq = [];
        for (let row = 0; row < length; row++) {
            for (let col = 0; col < width; col++) {
                const key = `${row}-${col}`;
                const isColored = coloredSquares.has(key);
                const isVisited = visitedSquares.has(key);
                let style = {}
                if (isVisited) {
                    style = { backgroundColor: 'tomato' };
                    // setVisitedNodeCounter(
                    //     currentTotalVisitedNodes >= visitedNodeCounter + 1 ? currentTotalVisitedNodes :
                    //     visitedNodeCounter + 1);
                    setVisitedNodeCounter(
                        visitedNodeCounter + 1 >= currentTotalVisitedNodes ? currentTotalVisitedNodes : visitedNodeCounter + 1
                    )
                    // setVisitedNodeCounter(visitedNodeCounter + 1);
                }
                if (isColored) {
                    style = { backgroundColor: 'aqua' };
                    setPathNodeCounter(pathNodeCounter + 1);
                }
                sq.push(<Square key={`${row}-${col}`} 
                wall={
                    Graph.walls.find(w => (
                        w.square_coord[0] === row &&
                        w.square_coord[1] === col
                    ))
                }
                isStart = {row === col && row === 0}
                isEnd = {row === length-1  && col === width-1}
                extraStyles={style} 
                coord={(row === col && row === 0) || (row === length-1  && col === width-1) ? undefined : `${row}-${col}`}
                />);
            }
        }
        setSquares(sq)
    }

    const intervalVisitedNodes = (visitedNodes: number[][]): Promise<void> => {
        return new Promise((resolve) => {
            visitedNodes.forEach((node, index) => {
                setTimeout(() => {
                    const key = `${node[0]}-${node[1]}`;
                    setVisitedSquares((prev) => new Set(prev).add(key));
                    if (index === visitedNodes.length - 1) {
                        resolve();
                    }
                }, index * 50); // original set to 250
            });
        });
    }
    
    const intervalColorPath = (nodesToColor: number[][]) => {
        setSelectedHeuristic('')
        setCurrentExecutingAlgorithm('')
        nodesToColor.forEach((node, index) => {
            setTimeout(() => {
                const key = `${node[0]}-${node[1]}`;
                setColoredSquares((prev) => new Set(prev).add(key));
            }, index * 100); // original set to 500 
        });
    }

    const executeBFS = async () => {
        setColoredSquares(new Set())
        setVisitedSquares(new Set())
        const graph = ConverterGraphWallNotationToAdjList(Graph)
        const _bfs = BFS(graph,'0-0', '14-29')
        const path = findPathFromBFS(_bfs,'0-0','14-29')
        const visitedNodes = visitedNodesBFS(_bfs)
        setcurrentTotalVisitedNodes(Object.values(_bfs.d).filter(distance => distance !== Number.POSITIVE_INFINITY).length)
        await intervalVisitedNodes(
            Object.entries(visitedNodes)
            .filter(([key]) => key !== 'Infinity')
            .map(([, v]) => v.map(v => [Number(v.split('-')[0]),Number(v.split('-')[1])]))
            .flat()
        )

        intervalColorPath(path.map(p => {
            const coordList = p.split("-")
            return coordList.map(Number)
        }))

        setHistoryAlgorithms([...historyAlgorithms, {
            algorithmName: 'BFS',
            visitedNodes: Object.values(_bfs.d).filter(distance => distance !== Number.POSITIVE_INFINITY).length,
            pathNodes: path.length,
            totalNodes: length * width
        }])

        setStatusLog(_bfs?.logs?.map(log => (log+'\n')) ?? [])
    }

    const executeDijkstra = async () => {
        setColoredSquares(new Set())
        setVisitedSquares(new Set())
        const _dijkstra = Dijkstra(Graph)
        setcurrentTotalVisitedNodes(_dijkstra.visitedNodes.length)   
        await intervalVisitedNodes(_dijkstra.visitedNodes)
        intervalColorPath(_dijkstra.path)
        setStatusLog(_dijkstra?.logs?.map(log => (log+'\n')) ?? [])
        setHistoryAlgorithms([...historyAlgorithms, {
            algorithmName: 'Dijkstra',
            visitedNodes: _dijkstra.visitedNodes.length,
            pathNodes: _dijkstra.path.length,
            totalNodes: length * width
        }])
    }

    const executeDFS = async () => {
        setColoredSquares(new Set())
        setVisitedSquares(new Set())
        const graph = ConverterGraphWallNotationToAdjList(Graph)
        const _dfs = DFS(graph,'0-0','14-29')
        const path = findPathFromDFS(_dfs,'0-0','14-29')
        const visitedNodes = visitedNodesBFS(_dfs)
        setcurrentTotalVisitedNodes(Object.values(_dfs.d).filter(distance => distance !== Number.POSITIVE_INFINITY).length)

        await intervalVisitedNodes(
            Object.entries(visitedNodes)
            .filter(([key]) => key !== 'Infinity')
            .map(([, v]) => v.map(v => [Number(v.split('-')[0]),Number(v.split('-')[1])]))
            .flat()
        )

        intervalColorPath(path.map(p => {
            const coordList = p.split("-")
            return coordList.map(Number)
        }))

        setHistoryAlgorithms([...historyAlgorithms, {
            algorithmName: 'DFS',
            visitedNodes: Object.values(_dfs.d).filter(distance => distance !== Number.POSITIVE_INFINITY).length,
            pathNodes: path.length,
            totalNodes: length * width
        }])

        setStatusLog(_dfs?.logs?.map(log => (log+'\n')) ?? [])
    }

    const executeAstar = async () => {
        const graph = convertGraphToWeightedGraph(ConverterGraphWallNotationToAdjList(Graph))
        setColoredSquares(new Set())
        setVisitedSquares(new Set())
        let heuristic = selectHeuristic()


        const _aStar = Astar(graph,'0-0','14-29', heuristic)
        const path = findPathFromAstar(_aStar?.prev ?? {}, '0-0','14-29')
        const visitedNodes = visitedNodesAstar(_aStar?.X ?? new Set(), _aStar?.fi ?? {})

        setcurrentTotalVisitedNodes(_aStar?.X.size ?? 0)

        await intervalVisitedNodes(
            Object.entries(visitedNodes)
            .filter(([key]) => key !== 'Infinity')
            .map(([, v]) => v.map(v => [Number(v.split('-')[0]),Number(v.split('-')[1])]))
            .flat()
        )

        intervalColorPath(path.map(p => {
            const coordList = p.split("-")
            return coordList.map(Number)
        }))

        setHistoryAlgorithms([...historyAlgorithms, {
            algorithmName: 'A*',
            visitedNodes: _aStar?.X.size ?? 0,
            pathNodes: path.length,
            totalNodes: length * width,
            heuristic: heuristic.toString()
        }])

        setStatusLog([])
        setStatusLog(_aStar?.logs?.map(log => (log+'\n')) ?? [])

    }

    const executePathFinding = (algorithmToBeExecuted: AlgorithmType) => {
        setVisitedNodeCounter(0);
        setPathNodeCounter(0);
        setStatusLog([])
        const algorithms: {
            [K in AlgorithmType]: () => void;
        } = {
            BFS: () => {
                setCurrentExecutingAlgorithm('BFS')
                executeBFS()
            },
            Dijkstra: () => {
                setCurrentExecutingAlgorithm('Dijkstra')
                executeDijkstra()
            },
            astar: () => {
                setCurrentExecutingAlgorithm('A*')
                executeAstar()
            },
            DFS: () => {
                setCurrentExecutingAlgorithm('DFS')
                executeDFS()
            },
            JPS: () => {
                
            },
        };

        algorithms[algorithmToBeExecuted]();
    }

    useEffect(() => {
        initializeMaze()
    }, [coloredSquares,visitedSquares])

    const handleHeuristicChange = (e: number) => {
        setSelectedHeuristicForAstar(e);
        selectHeuristic(e);
    };

    const selectHeuristic = (h?: number) => {

        let heuristic = HeuristicsCollection.noHeuristic
        let heuristicNum = selectedHeuristicForAstar
        if(h) {heuristicNum = h}

        switch (heuristicNum) {
            case 3:
                heuristic = HeuristicsCollection.manhattamHeuristic
            break;

            case 4:
                heuristic = HeuristicsCollection.perfectHeuristic
            break;
            case 5:
                heuristic = (v:string) => {
                    return optimalDistanceToGoalSimplifiedMaze[v];
                }
            break;
            default:
                heuristic = HeuristicsCollection.noHeuristic
            break;
        }

        setSelectedHeuristic(heuristic.toString())

        return heuristic
    }

    return (
        <div>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${width}, 2rem)`,
                border: '5px solid black',
                }}>
                {squares}
            </div>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '2%'
                }}>
                    <AlgoritmOptions
                    executePathFinding={executePathFinding}
                    handleHeuristicChange={handleHeuristicChange}
                    selectedHeuristicForAstar={selectedHeuristicForAstar}
                    ></AlgoritmOptions>
                </div>
                <MazeLegend totalNodes={length * width}/>
            </div>
        </div>

    );
}