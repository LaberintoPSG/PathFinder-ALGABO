// import { IWall } from "../Interfaces/IWall";

// export const DummyGraph = {
//     length: 3,
//     width: 4,
//     walls: [
//         {
//             square_coord: [0,0],
//             wall_position: "right"
//         },
//         {
//             square_coord: [0, 1],
//             wall_position: "right"
//         },
//         {
//             square_coord: [1, 2],
//             wall_position: "bottom"
//         },
//         {
//             square_coord: [1, 2],
//             wall_position: "right"
//         },
//         {
//             square_coord: [1, 3],
//             wall_position: "right"
//         },
//         {
//             square_coord: [2, 3],
//             wall_position: "right"
//         },
//         {
//             square_coord: [3, 0],
//             wall_position: "right"
//         },
//         {
//             square_coord: [3, 1],
//             wall_position: "bottom"
//         },
//         {
//             square_coord: [3, 2],
//             wall_position: "right"
//         },
//         {
//             square_coord: [3, 2],
//             wall_position: "bottom"
//         },
//         {
//             square_coord: [4, 0],
//             wall_position: "bottom"
//         }
//     ] as IWall[]
// }
import { IWall } from "../Interfaces/IWall";

export const DummyGraph = {
    length: 5,  // Laberinto de 5x4
    width: 4,
    walls: [
        // Paredes existentes
        { square_coord: [0, 0], wall_position: "right" },
        { square_coord: [0, 1], wall_position: "right" },
        { square_coord: [1, 2], wall_position: "bottom" },
        { square_coord: [1, 2], wall_position: "right" },
        { square_coord: [1, 3], wall_position: "right" },
        { square_coord: [2, 3], wall_position: "right" },
        { square_coord: [3, 0], wall_position: "right" },
        { square_coord: [3, 1], wall_position: "bottom" },
        { square_coord: [3, 2], wall_position: "right" },
        { square_coord: [3, 2], wall_position: "bottom" },
        { square_coord: [4, 0], wall_position: "bottom" },

        // Nuevas paredes añadidas
        // Bloqueo adicional en la fila 0
        { square_coord: [0, 2], wall_position: "right" },
        { square_coord: [0, 3], wall_position: "bottom" },

        // Nuevas paredes en la fila 1
        { square_coord: [1, 0], wall_position: "bottom" },
        { square_coord: [1, 1], wall_position: "bottom" },

        // Nuevas paredes en la fila 2
        { square_coord: [2, 0], wall_position: "bottom" },
        { square_coord: [2, 1], wall_position: "right" },
        { square_coord: [2, 2], wall_position: "bottom" },

        // Nuevas paredes en la fila 3
        { square_coord: [3, 3], wall_position: "bottom" },
        { square_coord: [3, 2], wall_position: "bottom" },
        
        // Nuevas paredes en la fila 4
        { square_coord: [4, 1], wall_position: "right" },
        { square_coord: [4, 2], wall_position: "right" },
        { square_coord: [4, 3], wall_position: "bottom" },
        
        // Nuevas paredes adicionales para mayor complejidad
        // Fila 0 - área izquierda
        { square_coord: [0, 1], wall_position: "bottom" },

        // Fila 1 - área izquierda y derecha
        { square_coord: [1, 1], wall_position: "right" },
        { square_coord: [1, 2], wall_position: "bottom" },

        // Fila 2 - área central
        { square_coord: [2, 1], wall_position: "bottom" },
        { square_coord: [2, 2], wall_position: "right" },

        // Fila 3 - más barreras en la fila 3
        { square_coord: [3, 1], wall_position: "right" },
        { square_coord: [3, 3], wall_position: "right" },

        // Fila 4 - cierre más completo
        { square_coord: [4, 1], wall_position: "bottom" },
        { square_coord: [4, 2], wall_position: "bottom" },
    ] as IWall[]
}
