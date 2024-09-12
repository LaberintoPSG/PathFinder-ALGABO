import { DummyGraph } from "../../../../Graphs/DummyGraph";
import { Square } from "./square";

interface MazeProps {
    width: number,
    length: number
}

export const Maze: React.FC<MazeProps> = ({ width, length}) => {

    const squares = [];
    for (let row = 0; row < length; row++) {
        for (let col = 0; col < width; col++) {
            squares.push(<Square key={`${row}-${col}`} 
            wall={
                DummyGraph.walls.find(w => (
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
            borderLeft: '1px solid black',
            borderTop: '1px solid black'
            }}>
            {squares}
        </div>
    );
}