import { Button } from "@mui/material";
import { BFS, findPathFromBFS } from "../../../../Algorithms/BFS";
import { Dijkstra } from "../../../../Algorithms/Dijkstra";
import { IWall } from "../../../../Interfaces/IWall";
import { bfs, generateGraph, generateRandomWalls, transformToGraphWithAdjencyList } from "../../utils";
import { Square } from "./square";
import { ReactNode, useEffect, useState } from "react";
import { AlgorithmType } from "../../../../Constants/Types";

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
    const {length, width} = Graph

    const initializeMaze = () => {
        const sq = [];
        for (let row = 0; row < length; row++) {
            for (let col = 0; col < width; col++) {
                const key = `${row}-${col}`;
                const isColored = coloredSquares.has(key);
                const style = isColored ? { backgroundColor: 'aqua' } : {};

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
                />);
            }
        }
        setSquares(sq)
    }

    const intervalColorPath = (nodesToColor: number[][]) => {
        nodesToColor.forEach((node, index) => {
            setTimeout(() => {
                const key = `${node[0]}-${node[1]}`;
                setColoredSquares((prev) => new Set(prev).add(key));
            }, index * 500);
        });
    }

    const executeBFS = () => {
        setColoredSquares(new Set())
        const graph = generateGraph(Graph)
        console.log(graph)
        // const _bfs = bfs(graph, graph.getVertex()[0], graph.getVertex()[graph.getVertex().length- 1])
        const _bfs = bfs(graph, '0-5', '0-8')
        console.log(_bfs)
        intervalColorPath(_bfs.map(e => {
            const coords = e.split("-")
            return [Number(coords[0]),Number(coords[1])]
        }))
    }

    const executePlaceHolder = () => {
        setColoredSquares(new Set())
        const nodesToColor = [[1,0],[2,0],[3,0],[4,0],[5,0]]
        intervalColorPath(nodesToColor)
    }

    const executeDijkstra = () => {
        setColoredSquares(new Set())
        const _dijkstra = Dijkstra(Graph)
        console.log(_dijkstra.path)
    }

    const executePathFinding = (algorithmToBeExecuted: AlgorithmType) => {

        const algorithms: {
            [K in AlgorithmType]: () => void;
        } = {
            BFS: () => {
                executeBFS()
            },
            Dijkstra: () => {
                executeDijkstra()
            },
            PlaceHolder: () => {
                executePlaceHolder()
            }
        };

        algorithms[algorithmToBeExecuted]();
    }

    useEffect(() => {
        initializeMaze()
    }, [coloredSquares])

    return (
        <div>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${width}, 2rem)`,
                border: '2px solid black',
                // borderTop: '1px solid black'
                }}>
                {squares}
            </div>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5%'
                }}>
                    <Button variant="contained"
                    onClick={() => {executePathFinding("Dijkstra")}}
                    >
                        Dijkstra
                    </Button>
                    <Button variant="contained"
                    onClick={() => executePathFinding("BFS")}
                    >
                        BFS
                    </Button>
                    <Button variant="contained"
                    onClick={() => executePathFinding("PlaceHolder")}
                    >
                        Execute
                    </Button>
                </div>

            </div>
        </div>

    );
}