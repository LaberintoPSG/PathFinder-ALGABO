import { ExportedGraph } from "../../Graphs/DummyGraph";
import { IWall } from "../../Interfaces/IWall";
import { Maze } from "../_shared/componentes/maze/maze"
import { Navbar } from "../_shared/componentes/navbar"
import { generateRandomWalls } from "../_shared/utils";

export const LandingPage = () => {

    const length = 15
    const width = 30

    const Graph: {
        length: number;
        width: number;
        walls: IWall[];
    } = {
        length,
        width,
        walls: generateRandomWalls(length,width)
    }

    Graph.walls = Array.from(new Map(Graph.walls.map(wall => [JSON.stringify(wall.square_coord), wall])).values()); // TODO:: RESUELVE UN BUG, PERO UN SQUARE DEBERIA PODER TENER NINGUN VECINO NI DERECHO NI IZQUIERDO (HAY UN TEMA CON EL RENDERIZADO)

    console.log(Graph)

    return (
        <div style={{
            height: '100vh'
        }}>
            <Navbar/>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'
            }}>
                <Maze
                    Graph={ExportedGraph as {
                        length: number;
                        width: number;
                        walls: IWall[];
                    }}
                    // Graph={Graph}
                />
            </div>
        </div>
    )
}