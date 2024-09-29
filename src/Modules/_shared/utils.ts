import { Graph } from "../../Algorithms/BFS";
import { IWall } from "../../Interfaces/IWall";


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

export const ConverterGraphWallNotationToAdjList = (GraphWall: { // es un asco pero creo que anda
    length: number;
    width: number;
    walls: IWall[];
}) => {

    const {length, walls, width} = GraphWall
    const graph = new Graph()

    console.log(walls)

    const mappedWalls = walls.map(w => (
        {
            ...w,
            str_coord: `${w.square_coord[0]}-${w.square_coord[1]}`
        }
    ))

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            graph.listAdj[`${i}-${j}`] = []
        }
    }

    for (const coord of Object.keys(graph.listAdj)) {
        
        const wallsForCoord = mappedWalls.filter(w => (
            w.str_coord == coord // At most 2
        )).reduce<{
            square_coord: number[],
            str_coord: string,
            wall_positions: ("right" | "bottom")[]
        }[]>((acc, wall) => {
            const entry = acc.find(e => e.str_coord === wall.str_coord);
            
            if (entry) {
                entry.wall_positions.push(wall.wall_position);
            } else {
                acc.push({
                    str_coord: wall.str_coord,
                    square_coord: wall.square_coord,
                    wall_positions: [wall.wall_position],
                });
            }
    
            return acc;
        }, []);

        wallsForCoord.forEach(wc => {
        console.log(wc)
        if(wc.wall_positions.length === 2) { // has no neighbour right or bottom

        }
        else if (wc.wall_positions[0] !== 'right') { // has a right neighbour
            if(wc.square_coord[1] < width-1) {

                graph.listAdj[wc.str_coord].push(
                    `${wc.square_coord[0]}-${wc.square_coord[1]+1}`
                )
                graph.listAdj[`${wc.square_coord[0]}-${wc.square_coord[1]+1}`].push(
                    wc.str_coord
                ) // since the edge  has no direction
            }

        }
        else if ((wc.wall_positions[0] === 'right')){ // has a bottom neighbour
            console.log("rojo",wc.str_coord)
            if(wc.square_coord[0] < length-1) {
                console.log("rojo2", `${wc.square_coord[0]+1}-${wc.square_coord[1]}`)
                
                graph.listAdj[wc.str_coord].push(
                    `${wc.square_coord[0]+1}-${wc.square_coord[1]}`
                )
                graph.listAdj[`${wc.square_coord[0]+1}-${wc.square_coord[1]}`].push(
                    wc.str_coord
                )

            }
        }
        })
    }
    // the coordinates that are not in the wall graph has both a right neighbour and a bottom neighbour
    const coordsWithWall = walls.map(w => `${w.square_coord[0]}-${w.square_coord[1]}`)
    console.log("cords wall", coordsWithWall)
    const twoNeighbourCoords = Object.keys(graph.listAdj).filter(key => !coordsWithWall.includes(key));

    console.log("coords que no aparecen en la wall", twoNeighbourCoords)

    twoNeighbourCoords.forEach(coord => {
        const coordNumber = coord.split("-").map(Number)

        if(coordNumber[1] < width-1) {

            graph.listAdj[coord].push(
                `${coordNumber[0]}-${coordNumber[1]+1}`
            )
            graph.listAdj[`${coordNumber[0]}-${coordNumber[1]+1}`].push(
                coord
            ) // since the edge  has no direction
        }

        if(coordNumber[0] < length-1) {
            graph.listAdj[coord].push(
                `${coordNumber[0]+1}-${coordNumber[1]}`
            )
            graph.listAdj[`${coordNumber[0]+1}-${coordNumber[1]}`].push(
                coord
            )
        }
    })

    return graph

}