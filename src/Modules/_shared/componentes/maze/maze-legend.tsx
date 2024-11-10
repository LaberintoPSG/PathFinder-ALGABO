import React from 'react';
import { Typography } from '@mui/material';

interface MazeLegendSquareProps {
  color: string;
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

export const MazeLegend = () => {
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
        <Typography>VISITED NODE</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MazeLegendSquare color="aqua" />
        <Typography>PATH NODE</Typography>
      </div>
    </div>
  );
};
