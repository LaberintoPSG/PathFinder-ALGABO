import { WeightedGraph } from "../../Algorithms/Astar";
import { Graph } from "../../Algorithms/BFS";
import { Dijkstra } from "../../Algorithms/Dijkstra";
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

export const ConverterGraphWallNotationToAdjList = (GraphWall: { 
    length: number;
    width: number;
    walls: IWall[];
}) => {

    const {length, walls, width} = GraphWall
    const graph = new Graph()

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
        if(wc.wall_positions.length === 2) { 

        }
        else if (wc.wall_positions[0] !== 'right') { 
            if(wc.square_coord[1] < width-1) {

                graph.listAdj[wc.str_coord].push(
                    `${wc.square_coord[0]}-${wc.square_coord[1]+1}`
                )
                graph.listAdj[`${wc.square_coord[0]}-${wc.square_coord[1]+1}`].push(
                    wc.str_coord
                ) 
            }

        }
        else if ((wc.wall_positions[0] === 'right')){ 
            if(wc.square_coord[0] < length-1) {
                
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
    const coordsWithWall = walls.map(w => `${w.square_coord[0]}-${w.square_coord[1]}`)
    const twoNeighbourCoords = Object.keys(graph.listAdj).filter(key => !coordsWithWall.includes(key));
    
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

export const  convertGraphToWeightedGraph = (graph: Graph): WeightedGraph => {
    const weightedGraph = new WeightedGraph();

    for (const vertex in graph.listAdj) {
        if (!graph.listAdj.hasOwnProperty(vertex)) continue;

        weightedGraph.listAdj[vertex] = [];

        for (const neighbor of graph.listAdj[vertex]) {
            weightedGraph.listAdj[vertex].push({ vertex: neighbor, weight: 1 });
        }
    }

    return weightedGraph;
}

export const ShortestPathFromAnyNodeToEnd = (graph: {
    length: number;
    width: number;
    walls: IWall[];
    }, end: string) => {
 
    const vertexCollection = ConverterGraphWallNotationToAdjList(graph).getVertex()
    const res: {[vertex: string]: number} = {}
    const coordOneEnd = +end.split('-')[0]
    const coordTwoEnd = +end.split('-')[1]
    
    for (const vertex of vertexCollection) {
        const coordOneOrigin = +vertex.split('-')[0]
        const coordTwoOrigin = +vertex.split('-')[1]
        const _dijkstra = Dijkstra(graph,[coordOneOrigin,coordTwoOrigin],[coordOneEnd, coordTwoEnd])

        res[vertex] = _dijkstra.totalDistance
    }

    return res

}

export const PruneMaze = (graph: {
    length: number;
    width: number;
    walls: IWall[];
}) => {

    const { length, walls, width } = graph

    const prunedGraph: {
        length: number;
        width: number;
        walls: IWall[];
    } = {
        length,
        width,
        walls: []
    }

    for (const wall of walls) {
        const probability = Math.random();
        if(probability > 0.1) {
            prunedGraph.walls.push(wall)
        }
    }

    return prunedGraph

}