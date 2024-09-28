export class Graph {
    listAdj: { [key: string]: string[] };

    constructor() {
        this.listAdj = {};
    }

    addEdge(vertex1:any, vertex2:any) {
        if (!this.listAdj[vertex1]) {
            this.listAdj[vertex1] = [];
        }
        if (!this.listAdj[vertex2]) {
            this.listAdj[vertex2] = [];
        }
        this.listAdj[vertex1].push(vertex2);
        this.listAdj[vertex2].push(vertex1);
    }

    getVertex(): string[] {
        return Object.keys(this.listAdj);
    }
}

class Queue {
    Queue: string[];

    constructor() {
        this.Queue = [];
    }

    insert(v: string): void {
        this.Queue.push(v);
    }

    remove(): string | undefined {
        return this.Queue.shift();
    }

    isEmpty(): boolean {
        return this.Queue.length === 0;
    }
}

interface BFSResult {
    pi: { [key: string]: string | null };
    d: { [key: string]: number };
}

export const BFS = (G: Graph, s: string): BFSResult => {
    const colors: { [key: string]: string } = {};
    const d: { [key: string]: number } = {};
    const pi: { [key: string]: string | null } = {};

    const VertexWithoutOrigin = G.getVertex().filter(v => v !== s);

    for (const u of VertexWithoutOrigin) {
        colors[u] = "White";
        d[u] = Number.POSITIVE_INFINITY;
        pi[u] = null;
    }

    colors[s] = "Grey";
    d[s] = 0;
    pi[s] = null;

    const Q = new Queue();
    Q.insert(s);

    while (!Q.isEmpty()) {
        const u = Q.remove()!;

        for (const v of G.listAdj[u]) {
            if (colors[v] === "White") {
                colors[v] = "Grey";
                d[v] = d[u] + 1;
                pi[v] = u;
                Q.insert(v);
            }
        }
        colors[u] = "Black";
    }

    return {
        pi,
        d
    };
};

export const findPathFromBFS = (BFSResult: BFSResult, s: string, target: string): string[] => {
    const path: string[] = [];
    let current: string | null = target;

    while (current !== null) {
        path.unshift(current); 
        current = BFSResult.pi[current];
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
console.log(BFS(graph, 's'));

const result = BFS(graph, 's'); 
const lastVertex = graph.getVertex()[graph.getVertex().length - 1];
const path = findPathFromBFS(result, 's', lastVertex);
console.log(path);
