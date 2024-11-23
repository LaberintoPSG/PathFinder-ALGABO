import React from 'react';
import './App.css';
import { LandingPage } from './Modules/pages/landing';
import { DebugContextProvider } from './Context/debug-context';
import { HistoryLogsContextProvider } from './Context/history-logs-context';

function App() {
  return (
    <DebugContextProvider>
      <HistoryLogsContextProvider>
        <div className="App">
          <LandingPage/>
        </div>
      </HistoryLogsContextProvider>
    </DebugContextProvider>
  );
}

export default App;
