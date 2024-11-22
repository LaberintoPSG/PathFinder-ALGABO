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

const perfectHeuristic = (v: string) => {
    const path: string[] = ['0-0', '0-1', '1-1', '2-1', '2-2', '2-3', '2-4', '3-4', '4-4', '5-4', '6-4', '7-4', '7-5', '7-6', '8-6', '9-6', '9-7', '9-8', '9-9', '8-9', '7-9', '6-9', '6-8', '5-8', '4-8', '3-8', '2-8', '1-8', '1-9', '0-9', '0-10', '0-11', '1-11', '1-12', '1-13', '1-14', '1-15', '1-16', '1-17', '1-18', '1-19', '1-20', '1-21', '2-21', '3-21', '4-21', '5-21', '5-22', '6-22', '7-22', '7-23', '8-23', '8-24', '9-24', '10-24', '10-25', '10-26', '10-27', '10-28', '11-28', '12-28', '13-28', '14-28', '14-29'];
    return path.includes(v) ? 0 : 100
}


export const HeuristicsCollection = {
    noHeuristic,
    dummyHeuristic,
    manhattamHeuristic,
    perfectHeuristic
}


