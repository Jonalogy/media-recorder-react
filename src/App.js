import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AudioMediaRecorder from './recorders/AudioMediaRecorder';
import AudioContextRecorder from './recorders/ReactAudioRecorder/AudioContextRecorder.tsx';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          Record Audio
        </header>
        
        <Link to="/">Context Recorder</Link>
        <br />
        <Link to="/media">Media Recorder</Link>
        
        <Switch>
          <Route exact path="/">
            <AudioContextRecorder filename="recording.wav" />
          </Route>
          <Route exact path="/media">
            <AudioMediaRecorder />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
