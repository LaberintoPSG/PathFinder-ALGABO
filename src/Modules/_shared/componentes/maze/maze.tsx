import { DummyGraph2 } from "../../../../Graphs/DummyGraph";
import { IWall } from "../../../../Interfaces/IWall";
import { generateRandomWalls } from "../../utils";
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
            />);
        }
    }

    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${width}, 2rem)`,
            border: '1px solid black',
            // borderTop: '1px solid black'
            }}>
            {squares}
        </div>
    );
}