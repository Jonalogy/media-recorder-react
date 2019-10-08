import React from 'react'
import './App.css';
import NativeRecorder from './recorders/NativeRecorder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Record Audio
      </header>
      <NativeRecorder />
    </div>
  );
}

export default App;
