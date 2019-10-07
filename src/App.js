import React from 'react'
import './App.css';
import Recorder from './Recorder';

// var mediaRecorder;
// var chunks = [];

// const recordOnClick = () => {
//   mediaRecorder.start();
//   console.log(mediaRecorder.state);
//   console.log("recorder started");
// }
// const stopRecordOnclick = () => {
//   mediaRecorder.stop();
//   console.log(mediaRecorder.state);
//   console.log("recorder stopped");
// }

// const onStopRecordingEvent = setNextAudio => e => {
//   console.log(e)
//   var blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
//   chunks = [];
//   var audioURL = window.URL.createObjectURL(blob);
//   // console.log(audioURL)
//   setNextAudio(audioURL);
//   // audio.src = audioURL;

//   // deleteButton.onclick = function(e) {
//   //   var evtTgt = e.target;
//   //   evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
//   // }
// }

function App() {
  // const [audioSrc, setNextAudio] = useState()
  // useEffect(() => { console.log("Changed audioArc") }, [audioSrc]);
  // useEffect(() => {
  //   if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
  //     console.log('getUserMedia not supported on your browser!');
  //   }

  //   console.log('getUserMedia supported.');
  //   navigator.mediaDevices.getUserMedia(
  //     // constraints - only audio needed for this app
  //     {
  //       audio: true
  //     })

  //     // Success callback
  //     .then(function (stream) {
  //       console.log("Created Media Stream", stream)
  //       mediaRecorder = new window.MediaRecorder(stream);
  //       console.log(mediaRecorder);
  //       mediaRecorder.ondataavailable = e => {
  //         if (e.data && e.data.size > 0) {
  //           chunks.push(e.data)
  //         }
  //       };
  //       mediaRecorder.onStart = function(e) { console.log("Starting recording :)", e) }
  //       mediaRecorder.onStop = onStopRecordingEvent(setNextAudio)
  //     })

  //     // Error callback
  //     .catch(function (err) {
  //       console.log('The following getUserMedia error occured: ' + err);
  //     }
  //     );
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        Record Audio
      </header>
      <Recorder />
      {/* <button onClick={recordOnClick}>Record</button>
      <button onClick={stopRecordOnclick}>Stop</button>
      {
        audioSrc && (
          <article>
            <audio controls={""} src={audioSrc} />
          </article>
        )
      } */}
    </div>
  );
}

export default App;
