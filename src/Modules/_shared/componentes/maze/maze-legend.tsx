import React from 'react';
import { Typography } from '@mui/material';
import { useDebug } from '../../../../Context/debug-context';

interface MazeLegendSquareProps {
  color: string
}

const MazeLegendSquare: React.FC<MazeLegendSquareProps> = ({ color }) => {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: color,
        marginRight: '8px',
      }}
    />
  );
};

interface MazeLegendProps {
  totalNodes: number
}

export const MazeLegend: React.FC<MazeLegendProps> = ( {totalNodes} ) => {

  const {pathNodeCounter, visitedNodeCounter} = useDebug()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MazeLegendSquare color="tomato" />
        <Typography>VISITED NODE ({visitedNodeCounter}/{totalNodes})</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MazeLegendSquare color="aqua" />
        <Typography>PATH NODE ({pathNodeCounter}/{totalNodes})</Typography>
      </div>
    </div>
  );
};
