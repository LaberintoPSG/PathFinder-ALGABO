import { IWall } from "../../../../Interfaces/IWall"

interface SquareProps {
    wall?: IWall
}

export const Square: React.FC<SquareProps> = ({ wall }) => {

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
            borderRight: wall?.wall_position === 'right' ? '1px solid red' : '1px solid black',
            borderBottom:  wall?.wall_position === 'bottom' ? '1px solid red' : '1px solid black',
            }}>
            {/* <span>
                .
            </span> */}
        </div>
    )
}