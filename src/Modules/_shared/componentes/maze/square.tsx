import { useState } from "react"

interface SquareProps {
    isSelected?: boolean
}

export const Square: React.FC<SquareProps> = ({ isSelected }) => {


    return (
        <div style={{
            border: '1px solid #999',
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
            backgroundColor: isSelected ? 'aqua' : '#fff'
        }}>

        </div>
    )
}