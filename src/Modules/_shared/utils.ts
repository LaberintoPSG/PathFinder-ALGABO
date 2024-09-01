export const generateRandomPairs = (width: number, length: number) => {
    
    const amaount =  Math.floor(Math.random() * ((width*length/2) - width + 1) + width);

    const pairs: number[][] = []
    Array.from(Array(amaount).keys()).forEach(i => {
        pairs.push([
            Math.floor(Math.random() * (width - 1) + 0),
            Math.floor(Math.random() * (length - 1) + 0)
        ])
    })

    return pairs

}