import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import AudioMediaRecorder from './recorders/AudioMediaRecorder';
import AudioContextRecorder from './recorders/ReactAudioRecorder/AudioContextRecorder.tsx';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          Record Audio
        </header>
        
        <Link to="/">Record</Link>
        <br />
        <Link to="/yay">Yay</Link>
        
        <Switch>
          <Route exact path="/">
            <AudioContextRecorder filename="recording.wav" />
            {/* <AudioMediaRecorder /> */}
          </Route>
          <Route exact path="/yay">
            <h1>Hey!</h1>
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
