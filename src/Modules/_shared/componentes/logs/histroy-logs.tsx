import { Divider } from "@mui/material"
import { useHistory } from "../../../../Context/history-logs-context"

export const Logs: React.FC = () => {

    const { historyAlgorithms } = useHistory()

    return(
        <div style={{
            height: '90%',
            width: '100%',
            marginLeft: '2rem'
        }}>
            <h4>
            HISTORY
            </h4>
            {
                historyAlgorithms.map(e => (
                    <>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <span>
                            Algorithm: {e.algorithmName}
                        </span>
                        <span>
                            Total Nodes: {e.totalNodes}
                        </span>
                        <span>
                            Nodes visited: {e.visitedNodes}
                        </span>
                        <span>
                            Path length: {e.pathNodes}
                        </span>
                        {
                            e.algorithmName === 'A*' && (
                                <span>
                                    Heuristic {e.heuristic}
                                </span>
                            )
                        }
                    </div>
                    <Divider></Divider>
                    </>

                ))
            }
        </div>
    )
}