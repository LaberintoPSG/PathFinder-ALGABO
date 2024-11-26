import { DijkstraResult } from "../Interfaces/DijkstraResult";
import { IWall } from "../Interfaces/IWall";

const getNeighbours = (
    [x, y]: [number, number],
    graph: { length: number; width: number; walls: IWall[] }
  ): [number, number][] => {
    const neighbors: [number, number][] = [];
    const { length, width, walls } = graph;
  
    // Arriba
    if (x > 0 && !isWall(walls, [x - 1, y], 'bottom')) neighbors.push([x - 1, y]);
    // Abajo
    if (x < length - 1 && !isWall(walls, [x, y], 'bottom')) neighbors.push([x + 1, y]);
    // Izquierda
    if (y > 0 && !isWall(walls, [x, y - 1], 'right')) neighbors.push([x, y - 1]);
    // Derecha
    if (y < width - 1 && !isWall(walls, [x, y], 'right')) neighbors.push([x, y + 1]);
  
    return neighbors;
  };
  
  const isWall = (
    walls: IWall[],
    coord: [number, number],
    position: 'right' | 'bottom'
  ): boolean => {
    return walls.some(
      (wall) =>
        wall.square_coord[0] === coord[0] &&
        wall.square_coord[1] === coord[1] &&
        wall.wall_position === position
    );
  };
  
  export const Dijkstra = (
    data: {
      length: number;
      width: number;
      walls: IWall[];
    },
    start: [number, number] = [0, 0],
    end: [number, number] = [data.length - 1, data.width - 1]
  ): DijkstraResult => {
    const logs = []
    const { length, width } = data;
    const distances = Array.from({ length }, () => Array(width).fill(Infinity));
    const previous: ([number, number] | null)[][] = Array.from(
      { length },
      () => Array(width).fill(null)
    );
    const visitedNodes: [number, number][] = [];
    const path: [number, number][] = [];
    const unvisited = new Set<string>();
  
    for (let row = 0; row < length; row++) {
      for (let col = 0; col < width; col++) {
        unvisited.add(`${row}-${col}`); 
      }
    }
  
    distances[start[0]][start[1]] = 0;
  
    while (unvisited.size > 0) {
      logs.push("---------------------------------------")
      let currentNode: [number, number] | null = null;
      let minDistance = Infinity;
  
      unvisited.forEach((node) => {
        const [row, col] = node.split('-').map(Number);
        if (distances[row][col] < minDistance) {
          minDistance = distances[row][col];
          currentNode = [row, col];
        }
      });

      if (currentNode === null) break;
      logs.push("Current Node: "+ JSON.stringify(currentNode))
      const [currentX, currentY] = currentNode as [number, number];
  
      unvisited.delete(`${currentX}-${currentY}`);
      visitedNodes.push(currentNode);
  
      if (currentX === end[0] && currentY === end[1]) {
        let current: [number, number] | null = end;
        while (current) {
          path.unshift(current);
          current = previous[current[0]][current[1]];
        }
        logs.push("dist= "+JSON.stringify(distances.filter(arr => arr.some(item => item !== null))))
        logs.push("prev= "+JSON.stringify(previous.filter(arr => arr.some(item => item !== null))))
        logs.push("PATH = " + JSON.stringify(path))
        return { visitedNodes, path, totalDistance: distances[end[0]][end[1]], logs: logs };
      }
  
      const neighbors = getNeighbours([currentX, currentY], data);
  
      for (const [neighborX, neighborY] of neighbors) {
        logs.push("neighbour= "+`[${neighborX}-${neighborY}]`)
        if (!unvisited.has(`${neighborX}-${neighborY}`)) continue;
  
        const newDist = distances[currentX][currentY] + 1;
        if (newDist < distances[neighborX][neighborY]) {
          distances[neighborX][neighborY] = newDist;
          previous[neighborX][neighborY] = [currentX, currentY];
        }
      }

      logs.push("dist= "+JSON.stringify(distances.filter(arr => arr.some(item => item !== null))))
      logs.push("prev= "+JSON.stringify(previous.filter(arr => arr.some(item => item !== null))))
    }
  
    return { visitedNodes, path: [], totalDistance: 0 };
  };
  