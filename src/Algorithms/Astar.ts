import { ICompare, PriorityQueue } from "@datastructures-js/priority-queue";

export class WeightedGraph {
    listAdj: { [key: string]: { vertex: string; weight: number }[] };

    constructor() {
        this.listAdj = {};
    }

    getEdges(vertex: string): { vertex: string; weight: number }[] | undefined {
        return this.listAdj[vertex];
    }

    getVertex(): string[] {
        return Object.keys(this.listAdj);
    }
}

export type Heuristic = (v: string) => number

export type PriorityForVertex = {
    priority: number,
    vertex: string
}

export const compareVertex: ICompare<PriorityForVertex> = (a:PriorityForVertex, b:PriorityForVertex ) => {
    return a.priority < b.priority ? -1 : 1
}

export const algorithmLogger = (canLog: boolean, logText: any) => canLog && (console.log(logText))


export const Astar = (G: WeightedGraph, start: string, end: string, heuristic: Heuristic, logEnable = false) => {
    const X = new Set<string>()
    const Q = new PriorityQueue<PriorityForVertex>(compareVertex)
    const fi: {[vertex: string]: number} = {}
    const prev: {[vertex: string]: string | undefined} = {}

    for (const vertex of G.getVertex()) {
        fi[vertex] = Infinity;
        prev[vertex] = undefined;
    }
    fi[start] = 0;

    Q.enqueue({
        priority: 0,
        vertex: start
    })

    algorithmLogger(logEnable,"INIT")

    while (!Q.isEmpty()) {

        const U = Q.dequeue().vertex
        algorithmLogger(logEnable, "---------------------------------------")
        algorithmLogger(logEnable, "U= "+ U)
        X.add(U)
        algorithmLogger(logEnable,X)

        if (U === end) {
            return {X,Q,fi,prev}
        }

        for (const _ of G.listAdj[U]) {
            const {vertex: V, weight: W} = _
            algorithmLogger(logEnable,{V})
            const alt = fi[U] + W
            
            if (alt < fi[V]) {
                fi[V] = alt
                const f = fi[V] + heuristic(V)
                Q.enqueue({
                    priority: f,
                    vertex: V
                })
                prev[V] = U
                const arrQ = Q.toArray()
                algorithmLogger(logEnable,{arrQ,fi,prev})
            }
        }
    }

}

export const findPathFromAstar = (prev: { [vertex: string]: string | undefined }, start: string, target: string): string[] => {
    const path: string[] = [];
    let current: string | undefined = target;

    while (current !== undefined) {
        path.unshift(current);
        current = prev[current];
    }

    if (path[0] === start) {
        return path;
    }

    return [];
};

export const visitedNodesAstar = (X: Set<string>, fi: { [vertex: string]: number }): { [distance: number]: string[] } => {
    const result: { [distance: number]: string[] } = {};

    X.forEach(vertex => {
        const distance = fi[vertex];
        if (distance !== Infinity) { 
            if (!result[distance]) {
                result[distance] = [];
            }
            result[distance].push(vertex);
        }
    })
    
    return result;
};



const graph = new WeightedGraph();

graph.listAdj = {
    'A': [{ vertex: 'B', weight: 1 }, { vertex: 'C', weight: 3 }],
    'B': [{ vertex: 'A', weight: 1 }, { vertex: 'C', weight: 3 }, { vertex: 'D', weight: 4 }],
    'C': [{ vertex: 'A', weight: 3 }, { vertex: 'B', weight: 3 }, { vertex: 'E', weight: 1 }],
    'D': [{ vertex: 'B', weight: 4 }, { vertex: 'G', weight: 5 }],
    'E': [{ vertex: 'C', weight: 1 }, { vertex: 'G', weight: 2 }],
    'G': [{ vertex: 'D', weight: 5 }, { vertex: 'E', weight: 2 }]
};

console.log(
    "A*, END",
    Astar(graph,'A','G', (v:string) => 0, true)
)
