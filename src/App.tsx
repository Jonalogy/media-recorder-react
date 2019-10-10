import React from 'react'
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AudioMediaRecorder from './recorders/AudioMediaRecorder';
// @ts-ignore
import AudioContextRecorder from './recorders/ReactAudioRecorder/AudioContextRecorder.tsx';
import { TextToSpeech } from './pages/TextToSpeech';
import { Page } from './pages/Page';
import { Wizard } from './pages/main/Wizard';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">Context Recorder</Link>
        <br />
        <Link to="/text2Speech">Text2Speech</Link>
        <Switch>
          <Route exact path="/">
            <Wizard />
          </Route>
          <Route exact path="/bar">
            <AudioContextRecorder filename="recording.wav" />
          </Route>
          <Route exact path="/text2Speech">
            <TextToSpeech />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
