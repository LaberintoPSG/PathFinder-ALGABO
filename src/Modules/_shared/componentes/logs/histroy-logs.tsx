import { Divider } from "@mui/material"
import { useHistory } from "../../../../Context/history-logs-context"

export const Logs: React.FC = () => {

    const { historyAlgorithms } = useHistory()

    return(
        <div style={{
            height: '90%'
        }}>
            <>
            HISTORY
            </>
            {
                historyAlgorithms.map(e => (
                    <>
                    <div>
                        <span>
                            {e.algorithmName}
                        </span>
                    </div>
                    <Divider></Divider>
                    </>

                ))
            }
        </div>
    )
}