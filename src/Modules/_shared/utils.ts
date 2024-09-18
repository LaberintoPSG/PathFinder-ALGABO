import { IWall } from "../../Interfaces/IWall";

export const generateRandomPairs = (width: number, length: number) => {
    
    const amaount =  Math.floor(Math.random() * ((width*length/2) - width + 1) + width);

    const pairs: number[][] = []
    Array.from(Array(amaount).keys()).forEach(i => {
        pairs.push([
            Math.floor(Math.random() * (width - 1) + 0),
            Math.floor(Math.random() * (length - 1) + 0)
        ])
    })

    return pairs

}

export const generateMatrixWxL = (width: number, length: number): number[][] =>
    Array.from({ length }, (_, i) => Array.from({ length: width }, (_, j) => [i, j])).flat();


export const generateRandomWalls = (length: number, width: number) => {

    const walls: IWall[] = [];

    const getRandomCoord = () => [
        Math.floor(Math.random() * length),
        Math.floor(Math.random() * width)
    ] as [number, number];

    for (let i = 0; i < length * width * 2; i++) {
        const coord = getRandomCoord();
        const position = Math.random() < 0.5 ? "right" : "bottom";
        
        if (position === "right" && coord[1] < width - 1) {
            walls.push({ square_coord: coord, wall_position: position });
        } else if (position === "bottom" && coord[0] < length - 1) {
            walls.push({ square_coord: coord, wall_position: position });
        }
    }

    const uniqueWalls = walls.filter((wall, index, self) =>
        index === self.findIndex((t) => (
            t.square_coord[0] === wall.square_coord[0] &&
            t.square_coord[1] === wall.square_coord[1] &&
            t.wall_position === wall.wall_position
        ))
    );

    return uniqueWalls;

}