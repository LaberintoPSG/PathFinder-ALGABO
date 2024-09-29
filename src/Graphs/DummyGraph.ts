import { IWall } from "../Interfaces/IWall";
import GraphExported_2909 from '../Graphs/GraphExported_2909\(1\).json'

export const DummyGraphTS: { // This works
    length: number;
    width: number;
    walls: IWall[];
} = {
    length: 5,
    width: 5,
    walls: [
        { square_coord: [2, 3], wall_position: "right" },
        { square_coord: [1, 2], wall_position: "right" },
        { square_coord: [1, 1], wall_position: "bottom" },
        { square_coord: [2, 2], wall_position: "bottom" },
        { square_coord: [1, 0], wall_position: "right" },
        { square_coord: [2, 1], wall_position: "right" },
        { square_coord: [0, 1], wall_position: "right" },
        { square_coord: [4, 2], wall_position: "right" },
        { square_coord: [1, 3], wall_position: "bottom" },
        { square_coord: [0, 0], wall_position: "right" },
        { square_coord: [3, 0], wall_position: "right" },
        { square_coord: [2, 0], wall_position: "bottom" },
        { square_coord: [2, 4], wall_position: "bottom" },
        { square_coord: [0, 4], wall_position: "bottom" },
        { square_coord: [3, 4], wall_position: "bottom" },
        { square_coord: [0, 2], wall_position: "bottom" }
    ]
};


export const ExportedGraph = GraphExported_2909