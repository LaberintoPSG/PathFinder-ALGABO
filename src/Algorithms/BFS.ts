export class Graph {
    listAdj: { [key: string]: string[] };

    constructor() {
        this.listAdj = {};
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

export const BFS = (G: Graph, s: string, end: string): BFSResult => {
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

        if (u === end) {
            return {
                pi,
                d
            };
        }

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

export const visitedNodesBFS = (BFSResult: BFSResult) => {
    return Object.entries(BFSResult.d).reduce((acc, [vertex, distance]) => {
        if (!acc[distance]) {
            acc[distance] = [];
        }
        acc[distance].push(vertex);
        return acc;
    }, {} as { [key: number]: string[] });
}