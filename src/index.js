import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');
  navigator.mediaDevices.getUserMedia (
     // constraints - only audio needed for this app
     {
        audio: true
     })

     // Success callback
     .then(function(stream) {
      console.log("yay")
       
     })

     // Error callback
     .catch(function(err) {
        console.log('The following getUserMedia error occured: ' + err);
     }
  );
} else {
  console.log('getUserMedia not supported on your browser!');
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
