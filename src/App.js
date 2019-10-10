import React from 'react'
import './App.css';
// eslint-disable-next-line no-unused-vars
import AudioMediaRecorder from './recorders/AudioMediaRecorder';
import AudioContextRecorder from './recorders/ReactAudioRecorder/AudioContextRecorder.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Record Audio
      </header>
      <AudioContextRecorder filename="recording.wav" />
      {/* <AudioMediaRecorder /> */}
    </div>
  );
}

export default App;
