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

    const { isDebugEnable, graph, setGraph } = useDebug()
    setGraph(ExportedGraph as {
        length: number;
        width: number;
        walls: IWall[];
    })

    // const pruned = PRUNEDGRAPH_2411 as {
    //     length: number;
    //     width: number;
    //     walls: IWall[];
    // }

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
                            maxWidth: '15%',
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