import { IWall } from "../../../../Interfaces/IWall"
import FlagIcon from '@mui/icons-material/Flag';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from "@mui/material";
import StartIcon from '@mui/icons-material/Start';
import { useState } from "react";
import { useDebug } from "../../../../Context/debug-context";

interface SquareProps {
    wall?: IWall,
    isStart?: boolean,
    isEnd?: boolean,
    extraStyles?: {},
    coord?: string
}

export const Square: React.FC<SquareProps> = ({ wall, isStart, isEnd, extraStyles, coord }) => {

    const { isDebugEnable, isDebugTerminalOpen } = useDebug()

    const [hasRightWall,setHasRightWall] = useState<boolean>(wall?.wall_position === 'right')
    const [hasBottomWall,setHasBottomtWall] = useState<boolean>(wall?.wall_position === 'bottom')

    return (
        <div style={{
            boxSizing: 'border-box',
            position: 'relative', 
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: '34px',
            height: '34px',
            width: '34px',
            textAlign: 'center',
            maxWidth: '100%',
            minHeight: '100%',
        }}>
            <div style={{
                borderRight: hasRightWall ? '5px solid black' : 'none',
                borderBottom: hasBottomWall ? '5px solid black' : 'none',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                boxSizing: 'border-box',
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...extraStyles, //the color of the 
                    boxSizing: 'border-box',
                }}>
                    {isStart && !isDebugTerminalOpen && (
                        <Tooltip title="Start" arrow open={true} placement="top">
                            <StartIcon />
                        </Tooltip>
                    )}
                    {isEnd && !isDebugTerminalOpen && (
                        <Tooltip title="End" arrow open={true}>
                            <LogoutIcon />
                        </Tooltip>
                    )}
                    {isDebugEnable && <span style={{ fontSize: '7px' }}>{coord}</span>}
                </div>
            </div>
        </div>
    )
}