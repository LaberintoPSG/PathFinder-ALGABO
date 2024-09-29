import { IWall } from "../Interfaces/IWall";

export const DummyGraph1 = {
    length: 3,
    width: 4,
    walls: [
        {
            square_coord: [0,0],
            wall_position: "right"
        },
        {
            square_coord: [0, 1],
            wall_position: "right"
        },
        {
            square_coord: [1, 2],
            wall_position: "bottom"
        },
        {
            square_coord: [1, 2],
            wall_position: "right"
        },
        {
            square_coord: [1, 3],
            wall_position: "right"
        },
        {
            square_coord: [2, 3],
            wall_position: "right"
        },
        {
            square_coord: [3, 0],
            wall_position: "right"
        },
        {
            square_coord: [3, 1],
            wall_position: "bottom"
        },
        {
            square_coord: [3, 2],
            wall_position: "right"
        },
        {
            square_coord: [3, 2],
            wall_position: "bottom"
        },
        {
            square_coord: [4, 0],
            wall_position: "bottom"
        }
    ] as IWall[]
}

export const DummyGraph2 = {
    length: 5, 
    width: 4,
    walls: [
        { square_coord: [0, 0], wall_position: "right" },
        { square_coord: [0, 1], wall_position: "right" },
        { square_coord: [1, 2], wall_position: "bottom" },
        { square_coord: [1, 2], wall_position: "right" },
        { square_coord: [1, 3], wall_position: "right" },
        { square_coord: [2, 3], wall_position: "right" },
        { square_coord: [3, 0], wall_position: "right" },
        { square_coord: [3, 1], wall_position: "bottom" },
        { square_coord: [3, 2], wall_position: "right" },
        { square_coord: [3, 2], wall_position: "bottom" },
        { square_coord: [4, 0], wall_position: "bottom" },

        { square_coord: [0, 2], wall_position: "right" },
        { square_coord: [0, 3], wall_position: "bottom" },

        { square_coord: [1, 0], wall_position: "bottom" },
        { square_coord: [1, 1], wall_position: "bottom" },

        { square_coord: [2, 0], wall_position: "bottom" },
        { square_coord: [2, 1], wall_position: "right" },
        { square_coord: [2, 2], wall_position: "bottom" },

        { square_coord: [3, 3], wall_position: "bottom" },
        { square_coord: [3, 2], wall_position: "bottom" },
        

        { square_coord: [4, 1], wall_position: "right" },
        { square_coord: [4, 2], wall_position: "right" },
        { square_coord: [4, 3], wall_position: "bottom" },
        

        { square_coord: [0, 1], wall_position: "bottom" },


        { square_coord: [1, 1], wall_position: "right" },
        { square_coord: [1, 2], wall_position: "bottom" },

        { square_coord: [2, 1], wall_position: "bottom" },
        { square_coord: [2, 2], wall_position: "right" },

        { square_coord: [3, 1], wall_position: "right" },
        { square_coord: [3, 3], wall_position: "right" },

        { square_coord: [4, 1], wall_position: "bottom" },
        { square_coord: [4, 2], wall_position: "bottom" },
    ] as IWall[]
}

export const DummyGraph3: {
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
