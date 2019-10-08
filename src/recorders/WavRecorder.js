import React, { Component } from 'react'
import "web-audio-recorder-js-webpack"

export default class WavRecorder extends Component {
  //stream from getUserMedia() 
  gumStream;
  //WebAudioRecorder object 
  recorder;
  //MediaStreamAudioSourceNode we'll be recording var encodingType; 
  //holds selected encoding for resulting audio (file) 
  input;
  // when to encode 
  encodeAfterRecord = true;
  //new audio context to help us record 
  audioContext = new AudioContext();
  encodingType = "wav"
  constraints = {
    audio: true,
    video: false
  }

  componentDidMount() {
    this.setUp()

  }

  async setUp() {
    this.mediaStream = await this.checkUserMediaAndGetStream()
    this.input = this.audioContext.createMediaStreamSource(this.mediaStream);
    this.input.connect(this.audioContext.destination)

    // eslint-disable-next-line no-undef
    const recorder = new WebAudioRecorder(this.input, {
      workerDir: "src/workers/",
      encoding: this.encodingType,
      onEncoderLoading: function (recorder, encoding) {
        // show "loading encoder..." display 
        console.log("Loading " + encoding + " encoder...");
      },
      onEncoderLoaded: function (recorder, encoding) {
        // hide "loading encoder..." display
        console.log(encoding + " encoder loaded");
      }
    });
    console.log(recorder)
  }

  async checkUserMediaAndGetStream() {
    if (!this.hasUserMedia()) throw new Error('Navigator does not support video media record.')
    if (!await this.hasAudioVideoDevices()) throw new Error('Not audio/video input devices detected.')
    let mediaStream;
    try { mediaStream = await window.navigator.mediaDevices.getUserMedia(this.constraints) }
    catch (err) { throw new Error("Yikes! Unable to get user media") }
    console.log(mediaStream)
    return mediaStream
  }
  hasUserMedia = () => Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)

  hasAudioVideoDevices = async () => {
    // TODO: only ask for what is needed
    let hasAudio = false
    let hasVideo = false
    const devices = await navigator.mediaDevices.enumerateDevices()
    devices.forEach(device => {
      if (device.kind === 'audioinput') hasAudio = true
      if (device.kind === 'videoinput') hasVideo = true
    })
    return (hasAudio && hasVideo)
  }
  
  render() {
    return (
      <div>
        <button>Record</button>
        <button>Stop</button>
      </div>
    )
  }
}
