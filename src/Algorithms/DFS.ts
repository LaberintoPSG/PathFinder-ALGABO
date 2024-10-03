import { Graph } from "./BFS";

interface DFSResult {
    pi: { [key: string]: string | null };
    d: { [key: string]: number };
}

export const DFS = (G: Graph, s: string): DFSResult => {
    const colors: { [key: string]: string } = {};
    const d: { [key: string]: number } = {};
    const pi: { [key: string]: string | null } = {};
    
    for (const u of G.getVertex()) {
        colors[u] = "White";
        d[u] = Number.POSITIVE_INFINITY;
        pi[u] = null; 
    }

    let time = 0;

    const dfsVisit = (u: string) => {
        time += 1;
        d[u] = time;
        colors[u] = "Grey";

        for (const v of G.listAdj[u]) {
            if (colors[v] === "White") {
                pi[v] = u; 
                dfsVisit(v); 
            }
        }
        colors[u] = "Black";
    };

    dfsVisit(s);

    return {
        pi,
        d
    };
};

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

const dummyGraph: { [key: string]: string[] } = {
    'r': ['s', 'v'],
    's': ['r', 'w'],
    'v': [],
    'w': ['s', 't', 'x'],
    't': ['w', 'x'],
    'x': ['w', 'u', 'y'],
    'u': ['x', 'y'],
    'y': ['x', 'u']
};

const graph = new Graph();
graph.listAdj = dummyGraph;
const resultDFS = DFS(graph, 's'); 
const lastVertexDFS = graph.getVertex()[graph.getVertex().length - 1];
const pathDFS = findPathFromDFS(resultDFS, 's', lastVertexDFS);
console.log(pathDFS);
