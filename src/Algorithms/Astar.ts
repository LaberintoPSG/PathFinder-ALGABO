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

type Heuristic = (v: string) => number

type PriorityForVertex = {
    priority: number,
    vertex: string
}

const compareVertex: ICompare<PriorityForVertex> = (a:PriorityForVertex, b:PriorityForVertex ) => {
    return a.priority < b.priority ? -1 : 1
}

const _algorithmLogger = (canLog: boolean, logText: any) => canLog && (console.log(logText))


export const Astar = (G: WeightedGraph, start: string, end: string, heuristic: Heuristic, logEnable = false) => {
    const X = new Set<string>()
    const Q = new PriorityQueue<PriorityForVertex>(compareVertex)
    const fi: {[vertex: string]: number} = {}
    const prev: {[vertex: string]: string | undefined} = {}

    const logs = []

    for (const vertex of G.getVertex()) {
        fi[vertex] = Infinity;
        prev[vertex] = undefined;
    }
    fi[start] = 0;

    Q.enqueue({
        priority: 0,
        vertex: start
    })

    _algorithmLogger(logEnable,"INIT")

    while (!Q.isEmpty()) {

        const U = Q.dequeue().vertex
        logs.push("---------------------------------------")
        logs.push("U= "+ U)
        X.add(U)
        logs.push("X= "+ Array.from(X))

        if (U === end) {
            return {X,Q,fi,prev,logs}
        }

        for (const _ of G.listAdj[U]) {
            const {vertex: V, weight: W} = _
            logs.push("V= "+ V)
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
                logs.push(JSON.stringify({arrQ,fi,prev}))
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