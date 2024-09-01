import { Graph1 } from "../../../../Graphs/Graph1";
import { Square } from "./square";

interface MazeProps {
    width: number,
    length: number
}

export const Maze: React.FC<MazeProps> = ({ width, length}) => {

    const {selectedSquares} = Graph1

    const squares = [];
    for (let row = 0; row < length; row++) {
        for (let col = 0; col < width; col++) {
            squares.push(<Square key={`${row}-${col}`} isSelected={
                selectedSquares.some(([selectedRow, selectedCol]) => selectedRow === row && selectedCol === col)
            }/>);
        }
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${width}, 2rem)` }}>
            {squares}
        </div>
    );
}