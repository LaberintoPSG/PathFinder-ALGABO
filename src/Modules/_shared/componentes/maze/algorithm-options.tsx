import { Button, MenuItem, Select, Tooltip } from "@mui/material"
import { AlgorithmType } from "../../../../Constants/Types"
import HelpIcon from '@mui/icons-material/Help';
import { useState } from "react";
import { GenericModal } from "../generic-modal";
import { AlgorithmInformation } from "../../../../Constants/AlgorithmInformation";

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
                <Button variant="contained"
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
                <Button variant="contained"
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
                <Button variant="contained"
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
                <Button variant="contained"
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
                        <MenuItem value="2">Dummy Heuristic</MenuItem>
                        <MenuItem value="3">Manhattan Heuristic</MenuItem>
                </Select>
                <Tooltip title="About the algorithm">
                    <HelpIcon sx={helpStyle} onClick={() => onOpenHelpModal("astar")} />
                </Tooltip>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Button variant="contained"
                onClick={() => executePathFinding("JPS")}
                sx={{
                    marginRight: '0.5rem'
                }}
                >
                    JPS
                </Button>
                <Select
                    value={selectedHeuristicForAstar}
                    onChange={(e) => handleHeuristicChange(+e.target.value)}
                >
                        <MenuItem value="1">No Heuristic</MenuItem>
                        <MenuItem value="2">Dummy Heuristic</MenuItem>
                        <MenuItem value="3">Manhattan Heuristic</MenuItem>
                </Select>
                <Tooltip title="About the algorithm">
                    <HelpIcon sx={helpStyle} onClick={() => onOpenHelpModal("JPS")} />
                </Tooltip>
            </div>

            <GenericModal 
            open={modalOpen} 
            onClose={onCloseHelpModal} 
            algorithmName={selectedAlgorithm}
            body={selectedAlgorithmDescription} />
        </>
    )
}