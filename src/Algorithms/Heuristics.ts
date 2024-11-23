import { useDebug } from "../Context/debug-context"
import { ExportedGraph } from "../Graphs/DummyGraph"
import { IWall } from "../Interfaces/IWall"
import { ShortestPathFromAnyNodeToEnd } from "../Modules/_shared/utils"

const noHeuristic = (v: string) => {
    return 0
}

const dummyHeuristic = (v: string) => {
    const coordOne = +v.split('-')[0]
    const coordTwo = +v.split('-')[1]

    return (coordOne >= 10 && coordTwo < 24) ? 100 : 0
}

const manhattamHeuristic = (v: string) => {
    const target = '14-29';
    
    const [xV, yV] = v.split('-').map(Number);
    const [xT, yT] = target.split('-').map(Number);

    return Math.abs(xV - xT) + Math.abs(yV - yT);
}

const graph = ExportedGraph as {
    length: number;
    width: number;
    walls: IWall[];
}
const shortestPastFromNodeToEnd = ShortestPathFromAnyNodeToEnd(graph,'14-29')

const perfectHeuristic = (v: string) => {
    return shortestPastFromNodeToEnd[v]
}


export const HeuristicsCollection = {
    noHeuristic,
    dummyHeuristic,
    manhattamHeuristic,
    perfectHeuristic
}


