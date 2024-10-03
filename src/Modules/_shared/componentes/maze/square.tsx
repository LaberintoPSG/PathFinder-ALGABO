import { IWall } from "../../../../Interfaces/IWall"
import FlagIcon from '@mui/icons-material/Flag';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from "@mui/material";
import StartIcon from '@mui/icons-material/Start';

interface SquareProps {
    wall?: IWall,
    isStart?: boolean,
    isEnd?: boolean,
    extraStyles?: {},
    coord?: string
}

export const Square: React.FC<SquareProps> = ({ wall, isStart, isEnd, extraStyles, coord }) => {

    return (
        <div style={{
            // border: '1px solid #999',
            float: 'left',
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: '34px',
            height: '34px',
            marginRight: '-1px',
            marginTop: '-1px',
            padding: '0',
            textAlign: 'center',
            width: '34px',
            // backgroundColor: wall ? 'grey' : '#fff',
            borderRight: wall?.wall_position === 'right' ? '5px solid black' : 'none',
            borderBottom:  wall?.wall_position === 'bottom' ? '5px solid black' : 'none',
            // transition: 'background-color 0.5s ease',
            // ...extraStyles,
            maxWidth: '97%',
            }}>
            <div style={{
                margin: '5px',
                width: '80%',
                height: '80%',
                ...extraStyles
            }}>
                {
                    isStart && (
                        <Tooltip title="Inicio" arrow open={true} placement="top">
                            <div style={{ display: 'inline-block' }}>
                                <StartIcon />
                            </div>
                        </Tooltip>
                    )
                }
                {
                    isEnd && (
                        <Tooltip title="Fin" arrow open={true}>
                            <div style={{ display: 'inline-block' }}>
                                <LogoutIcon />
                            </div>
                        </Tooltip>
                    )
                }
                {/* {
                    <span style={{
                        fontSize: '7px'
                    }}>{coord}</span>
                } */}
            </div>
        </div>
    )
}