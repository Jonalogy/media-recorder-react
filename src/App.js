import React from 'react'
import './App.css';
// eslint-disable-next-line no-unused-vars
import NativeRecorder from './recorders/NativeRecorder';
import ReactAudioRecorder from './recorders/ReactAudioRecorder/AudioRecorder.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Record Audio
      </header>
      <ReactAudioRecorder filename="recording.wav" />
      {/* <NativeRecorder /> */}
    </div>
  );
}

export default App;
