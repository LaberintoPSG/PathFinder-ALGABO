import { DummyGraph3 } from "../../Graphs/DummyGraph";
import { IWall } from "../../Interfaces/IWall";
import { Maze } from "../_shared/componentes/maze/maze"
import { Navbar } from "../_shared/componentes/navbar"
import { generateRandomWalls } from "../_shared/utils";

export const LandingPage = () => {

    const length = 5
    const width = 5

    const Graph: {
        length: number;
        width: number;
        walls: IWall[];
    } = {
        length,
        width,
        walls: generateRandomWalls(length,width)
    }

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
                    Graph={DummyGraph3}
                />
            </div>
        </div>
    )
}