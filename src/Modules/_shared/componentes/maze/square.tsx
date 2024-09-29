import { IWall } from "../../../../Interfaces/IWall"
import FlagIcon from '@mui/icons-material/Flag';
import LogoutIcon from '@mui/icons-material/Logout';

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
            borderRight: wall?.wall_position === 'right' ? '1px solid black' : 'none',
            borderBottom:  wall?.wall_position === 'bottom' ? '1px solid black' : 'none',
            ...extraStyles
            }}>
                {
                    isStart && (
                        <FlagIcon/>
                    )
                }
                {
                    isEnd && (
                        <LogoutIcon/>
                    )
                }
                {
                    <span style={{
                        fontSize: '7px'
                    }}>{coord}</span>
                }
        </div>
    )
}