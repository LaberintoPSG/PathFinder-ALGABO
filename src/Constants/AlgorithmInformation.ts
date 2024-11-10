import { AlgorithmType } from "./Types";

export const AlgorithmInformation: {
    [key in AlgorithmType]: {
        title: string,
        description: string
    }
} = {
    BFS: {
        title: "Breadth-First Search (BFS)",
        description: "BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the root (selecting some arbitrary node as the root in the case of a graph) and explores the neighbor nodes at the present depth before moving on to nodes at the next depth level. It is often used to find the shortest path in an unweighted graph."
    },
    Dijkstra: {
        title: "Dijkstra's Algorithm",
        description: "Dijkstra's algorithm is used to find the shortest path between two nodes in a graph, where edges have non-negative weights. It works by progressively selecting the node with the smallest known distance and exploring its neighbors. The algorithm is particularly useful for finding the shortest path in weighted graphs like road networks."
    },
    DFS: {
        title: "Depth-First Search (DFS)",
        description: "DFS is an algorithm used to explore all the nodes in a graph or tree structure. It starts at the root node and explores as far as possible along each branch before backtracking. DFS is often used in scenarios such as topological sorting, solving puzzles like mazes, or searching in large datasets."
    },
    astar: {
        title: "A* Algorithm",
        description: "The A* algorithm is a popular pathfinding and graph traversal algorithm. It finds the shortest path from a start node to a goal node while using heuristics to prioritize which paths to explore. A* is commonly used in games and robotics for navigation and is known for its efficiency in finding optimal paths."
    },
    JPS: {
        title: "Jump Point Search (JPS)",
        description: "Jump Point Search is an optimized pathfinding algorithm for grids that builds upon A* but accelerates the search by 'jumping' over multiple grid nodes when possible. It significantly reduces the number of nodes explored, especially in grid-based pathfinding scenarios, making it faster than A* in certain cases."
    }
};
