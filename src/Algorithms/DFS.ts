import { Graph } from "./BFS";

interface DFSResult {
    pi: { [key: string]: string | null },
    d: { [key: string]: number },
    logs?: string[]
}

export function DFS(graph: Graph, start: string, final: string): DFSResult {

    const stack: string[] = [start];
    const distances: { [key: string]: number } = {};
    const prev: { [key: string]: string | null } = {};
    const logs: string[] = []
    
    graph.getVertex().forEach(vertex => {
        distances[vertex] = Infinity;
        prev[vertex] = null;
    });
    
    distances[start] = 0;
    
    while (stack.length > 0) {
        logs.push("---------------------------------------")
        const current = stack.pop()!;
        logs.push("current= " + current)
        if (current === final) break;
        
        for (const neighbor of graph.listAdj[current]) {
            logs.push("neighbor= " + neighbor)
            if (distances[neighbor] === Infinity) {

                stack.push(neighbor);
                distances[neighbor] = distances[current] + 1;
                prev[neighbor] = current;
            }
            logs.push("distances= ", JSON.stringify(distances))
            logs.push("prev= ", JSON.stringify(neighbor))
        }
    }
    
    return { 
        pi: prev,
        d: distances,
        logs: logs
     };
}

export const findPathFromDFS = (DFSResult: DFSResult, s: string, target: string): string[] => {
    const path: string[] = [];
    let current: string | null = target;

    while (current !== null) {
        path.unshift(current); 
        current = DFSResult.pi[current];
    }

    if (path[0] === s) {
        return path;
    }

    return [];
};