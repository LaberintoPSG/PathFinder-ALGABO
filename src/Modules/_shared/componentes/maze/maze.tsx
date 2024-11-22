import { Button, MenuItem, Select } from "@mui/material";
import { BFS, findPathFromBFS, visitedNodesBFS } from "../../../../Algorithms/BFS";
import { Dijkstra } from "../../../../Algorithms/Dijkstra";
import { IWall } from "../../../../Interfaces/IWall";
import { ConverterGraphWallNotationToAdjList, convertGraphToWeightedGraph } from "../../utils";
import { Square } from "./square";
import { ReactNode, useEffect, useState } from "react";
import { AlgorithmType } from "../../../../Constants/Types";
import { DummyGraphTS } from "../../../../Graphs/DummyGraph";
import { DFS } from "../../../../Algorithms/DFS";
import { Astar, findPathFromAstar, visitedNodesAstar, WeightedGraph } from "../../../../Algorithms/Astar";
import { HeuristicsCollection } from "../../../../Algorithms/Heuristics";
import { AlgoritmOptions } from "./algorithm-options";
import { MazeLegend } from "./maze-legend";
import { useDebug } from "../../../../Context/debug-context";
import { useHistory } from "../../../../Context/history-logs-context";

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
    const {pathNodeCounter, setPathNodeCounter, setVisitedNodeCounter, visitedNodeCounter} = useDebug()
    const { setHistoryAlgorithms, historyAlgorithms } = useHistory()

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
                    setVisitedNodeCounter(visitedNodeCounter + 1);
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
        const path = findPathFromBFS(_bfs,'0-0','14-29') //TODO:: REFACTOR
        const visitedNodes = visitedNodesBFS(_bfs)

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
    }

    const executeDijkstra = async () => {
        setColoredSquares(new Set())
        setVisitedSquares(new Set())
        const _dijkstra = Dijkstra(Graph)
        await intervalVisitedNodes(_dijkstra.visitedNodes)
        intervalColorPath(_dijkstra.path)
    }

    const executeDFS = async () => {
        setColoredSquares(new Set())
        setVisitedSquares(new Set())
        const graph = ConverterGraphWallNotationToAdjList(Graph)
        const _bfs = DFS(graph,'0-0')
        const path = findPathFromBFS(_bfs,'0-0','14-29') //TODO:: REFACTOR
        const visitedNodes = visitedNodesBFS(_bfs)

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
    }

    const executeAstar = async () => {
        const graph = convertGraphToWeightedGraph(ConverterGraphWallNotationToAdjList(Graph))
        setColoredSquares(new Set())
        setVisitedSquares(new Set())
        let heuristic = HeuristicsCollection.noHeuristic
        switch (selectedHeuristicForAstar) { // Vomitivo
            case 2:
                heuristic = HeuristicsCollection.dummyHeuristic
                break;

            case 3:
                heuristic = HeuristicsCollection.manhattamHeuristic
            break;
        
            default:
                heuristic = HeuristicsCollection.noHeuristic
            break;
        }

        const _aStar = Astar(graph,'0-0','14-29', heuristic)
        const path = findPathFromAstar(_aStar?.prev ?? {}, '0-0','14-29')
        const visitedNodes = visitedNodesAstar(_aStar?.X ?? new Set(), _aStar?.fi ?? {})

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
            visitedNodes: 64,
            pathNodes: 100,
            totalNodes: 150,
        }])

    }

    const executePathFinding = (algorithmToBeExecuted: AlgorithmType) => {
        setVisitedNodeCounter(0);
        setPathNodeCounter(0);
        const algorithms: {
            [K in AlgorithmType]: () => void;
        } = {
            BFS: () => {
                executeBFS()
            },
            Dijkstra: () => {
                executeDijkstra()
            },
            astar: () => {
                executeAstar()
            },
            DFS: () => {
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
        console.log("changeeee",e)
        setSelectedHeuristicForAstar(e);
    };

    return (
        <div>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${width}, 2rem)`,
                border: '5px solid black',
                // borderTop: '1px solid black'
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