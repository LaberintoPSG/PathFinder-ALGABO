// // TODO:: CAMBIAR


// class Graph {
//     constructor () {
//         this.listAdj = {

//         }
//     }

//     getVertex() {
//         return Object.keys(this.listAdj)
//     }
// }

// class Queue {

//     constructor () {
//         this.Queue = []
//     }

//     insert(v) {
//         this.Queue.push(v)
//     }

//     remove() {
//         return this.Queue.shift()
//     }

//     isEmpty() {
//         return this.Queue.length === 0
//     }

// }



// const BFS = (G,s) => {

//     const colors = {}
//     const d = {}
//     const pi = {}

//     const VertexWithoutOrigin = G.getVertex().filter(v => (
//         v !== s
//     ))

//     for (const u of VertexWithoutOrigin) {
//         colors[u] = "White"
//         d[u] = Number.POSITIVE_INFINITY
//         pi[u] = null
//     }

//     colors[s] = "Grey"
//     d[s] = 0
//     pi[s] = null

//     const Q = new Queue()
//     Q.insert(s)

//     while (!Q.isEmpty) {

//         u = Q.remove()

//         for (const v of G[u]) {
            
//             if (colors[v] === "White") {
//                 colors[v] = "Gris"
//                 d[v] = d[v] + 1
//                 pi[v] = u
//                 Q.insert(v)
//             }
//         }
//         colors[u] === "Black"
//     }

//     return {
//         pi,
//         d
//     }
// }

// const dummyGraph = {
//     'r': ['s','v'],
//     's': ['r','w'],
//     'v': [],
//     'w': ['s','t','x'],
//     't': ['w','x'],
//     'x': ['w','u','y'],
//     'u': ['x','y'],
//     'y': ['x','u']
// }

// const graph = new Graph()
// graph.listAdj = dummyGraph
// console.log(BFS(graph, 's'))

export {}