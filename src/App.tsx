import React from 'react'
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import * as _fp from "lodash/fp";

import AudioMediaRecorder from './recorders/AudioMediaRecorder';
// @ts-ignore
import AudioContextRecorder from 'recorders/ReactAudioRecorder/AudioContextRecorder.tsx';
import { TextToSpeech } from 'pages/TextToSpeech';
import { Page } from 'pages/Page';
import { Wizard } from 'pages/wizard/Wizard';

import './App.scss';

interface IState {
  predictedResult: string;
  correctedResult: string;
}
export interface IRootState {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<Partial<IState>>>;
}
function App() {
  const [state, nextState] = useState({
    predictedResult: "",
    correctedResult: ""
  })
  const props: IRootState = { 
    state,
    setState: (o) => nextState(_fp.merge(state, o))
  };
  return (
    <div className="App">
      <Router>
        {/* <Link to="/">Context Recorder</Link>
        <br />
        <Link to="/text2Speech">Text2Speech</Link> */}
        <Switch>
          <Route exact path="/">
            <Page>
              <Wizard {...props}/>
            </Page>
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
