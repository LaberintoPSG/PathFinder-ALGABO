import { Button, MenuItem, Select, Tooltip } from "@mui/material"
import { AlgorithmType } from "../../../../Constants/Types"
import HelpIcon from '@mui/icons-material/Help';
import { useState } from "react";
import { GenericModal } from "../generic-modal";
import { AlgorithmInformation } from "../../../../Constants/AlgorithmInformation";
import { useHistory } from "../../../../Context/history-logs-context";

interface AlgoritmOptionsProps {
    selectedHeuristicForAstar: number,
    handleHeuristicChange: (v: number) => void,
    executePathFinding: (algorithmToBeExecuted: AlgorithmType) => void
}

const helpStyle = {
    "&:hover": {
        cursor: "pointer"
    }
}

export const AlgoritmOptions: React.FC<AlgoritmOptionsProps> = ( {selectedHeuristicForAstar, handleHeuristicChange, executePathFinding} ) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("")
    const [selectedAlgorithmDescription, setSelectedAlgorithmDescription] = useState<string>("")

    const { currentExecutingAlgorithm } = useHistory()

    const onOpenHelpModal = (algorithmName: AlgorithmType) => {

        const aboutAlgorithm = AlgorithmInformation[algorithmName]

        setSelectedAlgorithm(aboutAlgorithm.title)
        setSelectedAlgorithmDescription(aboutAlgorithm.description)
        setModalOpen(true)
    };

    const onCloseHelpModal = () => {
        setModalOpen(false)
    };

    return(
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Button variant="contained" disabled={currentExecutingAlgorithm ? true : false}
                    onClick={() => {executePathFinding("Dijkstra")}}
                    >
                        Dijkstra
                </Button>
                <Tooltip title="About the algorithm">
                    <HelpIcon sx={helpStyle} onClick={() => onOpenHelpModal("Dijkstra")} />
                </Tooltip>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Button variant="contained" disabled={currentExecutingAlgorithm ? true : false}
                onClick={() => executePathFinding("BFS")}
                >
                    BFS
                </Button>
                <Tooltip title="About the algorithm">
                    <HelpIcon sx={helpStyle} onClick={() => onOpenHelpModal("BFS")} />
                </Tooltip>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Button variant="contained" disabled={currentExecutingAlgorithm ? true : false}
                onClick={() => executePathFinding("DFS")}
                >
                    DFS
                </Button>
                <Tooltip title="About the algorithm">
                    <HelpIcon sx={helpStyle} onClick={() => onOpenHelpModal("DFS")} />
                </Tooltip>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Button variant="contained" disabled={currentExecutingAlgorithm ? true : false}
                onClick={() => executePathFinding("astar")}
                sx={{
                    marginRight: '0.5rem'
                }}
                >
                    A*
                </Button>
                <Select
                    value={selectedHeuristicForAstar}
                    onChange={(e) => handleHeuristicChange(+e.target.value)}
                >
                        <MenuItem value="1">No Heuristic</MenuItem>
                        <MenuItem value="3">Manhattan Heuristic</MenuItem>
                        <MenuItem value="4">Perfect Heuristic</MenuItem>
                        <MenuItem value="5">Prune Heuristic</MenuItem>
                </Select>
                <Tooltip title="About the algorithm">
                    <HelpIcon sx={helpStyle} onClick={() => onOpenHelpModal("astar")} />
                </Tooltip>
            </div>

            {/* <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Button variant="contained" disabled={currentExecutingAlgorithm ? true : false}
                onClick={() => executePathFinding("JPS")}
                >
                    JPS
                </Button>
                <Tooltip title="About the algorithm">
                    <HelpIcon sx={helpStyle} onClick={() => onOpenHelpModal("JPS")} />
                </Tooltip>
            </div> */}

            <GenericModal 
            open={modalOpen} 
            onClose={onCloseHelpModal} 
            algorithmName={selectedAlgorithm}
            body={selectedAlgorithmDescription} />
        </>
    )
}