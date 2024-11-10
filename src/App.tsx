import React from 'react';
import './App.css';
import { LandingPage } from './Modules/pages/landing';
import { DebugContextProvider } from './Context/debug-context';

function App() {
  return (
    <DebugContextProvider>
      <div className="App">
        <LandingPage/>
      </div>
    </DebugContextProvider>
  );
}

export default App;
