import { Button } from "@mui/material";
import { BFS } from "../../../../Algorithms/BFS";
import { DummyGraph2 } from "../../../../Graphs/DummyGraph";
import { IWall } from "../../../../Interfaces/IWall";
import { generateRandomWalls, transformToGraphWithAdjencyList } from "../../utils";
import { Square } from "./square";

interface MazeProps {
    width: number,
    length: number
}

export const Maze: React.FC<MazeProps> = ({ width, length}) => {

    const Graph: {
        length: number;
        width: number;
        walls: IWall[];
    } = {
        length,
        width,
        walls: generateRandomWalls(length,width)
    }

    const executeBFS = () => {
        const graph = transformToGraphWithAdjencyList(Graph)
        console.log(graph)
        const bfs = BFS(graph,"0,0")
        console.log(bfs)
    }

    const squares = [];
    for (let row = 0; row < length; row++) {
        for (let col = 0; col < width; col++) {
            squares.push(<Square key={`${row}-${col}`} 
            wall={
                Graph.walls.find(w => (
                    w.square_coord[0] === row &&
                    w.square_coord[1] === col
                ))
            }
            isStart = {row === col && row === 0}
            isEnd = {row === length-1  && col === width-1}
            />);
        }
    }

    return (
        <div>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${width}, 2rem)`,
                border: '1px solid black',
                // borderTop: '1px solid black'
                }}>
                {squares}
            </div>
            <div>
                <div style={{
                    display: 'flex'
                }}>
                    <Button variant="contained"
                    onClick={executeBFS}
                    >
                        Execute BFS
                    </Button>
                    <Button variant="contained"
                    onClick={executeBFS}
                    >
                        Execute
                    </Button>
                </div>

            </div>
        </div>

    );
}