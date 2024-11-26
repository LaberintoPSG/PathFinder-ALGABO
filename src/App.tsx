import React from 'react';
import './App.css';
import { LandingPage } from './Modules/pages/landing';
import { DebugContextProvider, useDebug } from './Context/debug-context';
import { HistoryLogsContextProvider } from './Context/history-logs-context';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

function App() {

  const {isLoadingPage}  = useDebug()

  return (
      <HistoryLogsContextProvider>
        <div className="App">
          {
            isLoadingPage ? (
              <Box
              sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.default',
                color: 'text.primary',
              }}
            >
              <CircularProgress
                size={120}
                thickness={6}
                color="primary"
              />
              <Typography
                variant="h6"
                sx={{
                  marginTop: 2,
                  fontWeight: 'bold',
                  letterSpacing: 1.2,
                  color: 'text.secondary',
                }}
              >
                Loading...
              </Typography>
            </Box>
            ) : (
              <LandingPage/>
            )
          }
        </div>
      </HistoryLogsContextProvider>
  );
}

export default App;
