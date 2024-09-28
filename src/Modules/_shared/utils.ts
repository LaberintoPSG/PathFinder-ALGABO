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

export const transformToGraphWithAdjencyList = (graph: {
    length: number;
    width: number;
    walls: IWall[];
}) => {

    const adjGraph = new Graph();

    // Generar los vértices
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph.width; j++) {
            const vertex = `${i},${j}`;
            adjGraph.listAdj[vertex] = []; // Inicializa la lista de adyacencia
        }
    }

    // Agregar aristas basadas en las paredes
    const wallSet = new Set<string>();
    for (const wall of graph.walls) {
        const [x, y] = wall.square_coord;
        const wallKey = `${x},${y},${wall.wall_position}`;
        wallSet.add(wallKey); // Almacena la posición de la pared
    }

    // Conectar los vértices basados en la existencia de paredes
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph.width; j++) {
            const currentVertex = `${i},${j}`;

            // Comprobar si hay una pared a la derecha
            if (!wallSet.has(`${i},${j},right`)) {
                const rightVertex = `${i},${j + 1}`;
                if (adjGraph.listAdj[rightVertex]) {
                    adjGraph.listAdj[currentVertex].push(rightVertex);
                }
            }

            // Comprobar si hay una pared abajo
            if (!wallSet.has(`${i},${j},bottom`)) {
                const bottomVertex = `${i + 1},${j}`;
                if (adjGraph.listAdj[bottomVertex]) {
                    adjGraph.listAdj[currentVertex].push(bottomVertex);
                }
            }
        }
    }

    return adjGraph;

}