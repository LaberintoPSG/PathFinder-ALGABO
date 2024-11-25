export interface DijkstraResult {
    visitedNodes: [number, number][];
    path: [number, number][];
    totalDistance: number;
    logs?: string[]
  }