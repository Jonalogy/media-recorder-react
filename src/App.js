import React from 'react'
import './App.css';
// eslint-disable-next-line no-unused-vars
import NativeRecorder from './recorders/NativeRecorder';
import WavRecorder from './recorders/WavRecorder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Record Audio
      </header>
      <WavRecorder />
      {/* <NativeRecorder /> */}
    </div>
  );
}

export default App;
