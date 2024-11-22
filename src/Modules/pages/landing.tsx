import { useDebug } from "../../Context/debug-context";
import { HistoryLogsContextProvider } from "../../Context/history-logs-context";
import { ExportedGraph } from "../../Graphs/DummyGraph";
import { IWall } from "../../Interfaces/IWall";
import { DebugLogs } from "../_shared/componentes/logs/debug-logs";
import { Logs } from "../_shared/componentes/logs/histroy-logs";
import { Maze } from "../_shared/componentes/maze/maze"
import { Navbar } from "../_shared/componentes/navbar"
import { generateRandomWalls } from "../_shared/utils";

export const LandingPage = () => {

    const { isDebugEnable } = useDebug()

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

    // return (
    //     <div style={{
    //         height: '100vh'
    //     }}>
    //         <Navbar/>
    //         <div style={{
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             height: '90vh'
    //         }}>
    //             <Logs/>
    //             <Maze
    //                 Graph={ExportedGraph as {
    //                     length: number;
    //                     width: number;
    //                     walls: IWall[];
    //                 }}
    //                 // Graph={Graph}
    //             />
    //             {isDebugEnable && (
    //                 <DebugLogs/>
    //             )}
    //         </div>
    //     </div>
    // )
    return (
        <div style={{ height: '100vh' }}>
            <Navbar />
                <HistoryLogsContextProvider>
                <div
                    style={{
                        display: 'flex',
                        height: '90vh',
                    }}
                >
                    <div
                        style={{
                            flex: '1 1 15%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                            <Logs />
                    </div>

                    <div
                        style={{
                            flex: '1 1 70%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Maze
                            Graph={ExportedGraph as {
                                length: number;
                                width: number;
                                walls: IWall[];
                            }}
                        />
                    </div>

                    <div
                        style={{
                            flex: '1 1 15%', 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {isDebugEnable && <DebugLogs />}
                    </div>
                </div>
            </HistoryLogsContextProvider>
        </div>
    )
}