import { PriorityQueue } from "@datastructures-js/priority-queue";
import { algorithmLogger, compareVertex, Heuristic, PriorityForVertex, WeightedGraph } from "./Astar";


export const JPS = (
    G: WeightedGraph,
    start: string,
    end: string,
    heuristic: Heuristic,
    logEnable = false
  ) => {
    const X = new Set<string>();
    const Q = new PriorityQueue<PriorityForVertex>(compareVertex);
    const fi: { [vertex: string]: number } = {};
    const prev: { [vertex: string]: string | undefined } = {};
  
    for (const vertex of G.getVertex()) {
      fi[vertex] = Infinity;
      prev[vertex] = undefined;
    }
    fi[start] = 0;
  
    Q.enqueue({ priority: 0, vertex: start });
  
    const isWalkable = (key: string): boolean => G.getEdges(key) !== undefined;
  
    const jump = (current: string, direction: [number, number]): string | null => {
      let [cx, cy] = current.split("-").map(Number);
      const [dx, dy] = direction;
  
      while (true) {
        cx += dx;
        cy += dy;
        const key = `${cx}-${cy}`;
  
        if (!isWalkable(key)) return null;
  
        if (key === end) return key;
  
        // Verificar forced neighbors (vecinos obligatorios)
        const leftNeighbor = `${cx - dy}-${cy - dx}`;
        const rightNeighbor = `${cx + dy}-${cy + dx}`;
        const hasForcedNeighbor =
          (dx !== 0 && dy !== 0) || // Diagonal
          (dx !== 0 && (!isWalkable(leftNeighbor) || !isWalkable(rightNeighbor))) ||
          (dy !== 0 && (!isWalkable(leftNeighbor) || !isWalkable(rightNeighbor)));
  
        if (hasForcedNeighbor) {
          return key;
        }
      }
    };
  
    const directions: [number, number][] = [
      [-1, 0], [1, 0], [0, -1], [0, 1], 
      [-1, -1], [-1, 1], [1, -1], [1, 1],
    ];
  
    algorithmLogger(logEnable, "INIT");
  
    while (!Q.isEmpty()) {
      const U = Q.dequeue().vertex;
      algorithmLogger(logEnable, "---------------------------------------");
      algorithmLogger(logEnable, "U= " + U);
      X.add(U);
      algorithmLogger(logEnable, X);
  
      if (U === end) {
        return { X, Q, fi, prev };
      }
  
      for (const [dx, dy] of directions) {
        const jumpPoint = jump(U, [dx, dy]);
        if (jumpPoint) {
          const alt = fi[U] + heuristic(jumpPoint);
          if (alt < fi[jumpPoint]) {
            fi[jumpPoint] = alt;
            const f = fi[jumpPoint] + heuristic(jumpPoint);
            Q.enqueue({ priority: f, vertex: jumpPoint });
            prev[jumpPoint] = U;
          }
        }
      }
    }
    return null;
  };
  