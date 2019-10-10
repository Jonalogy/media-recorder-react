import React from 'react';

export default class AudioMediaRecorder extends React.Component {
  mimeType = { 'type': 'audio/wav' };
  mediaChunks = []
  mediaStream = null
  recorder = null
  blob = null

  constructor(props) {
    super(props)
    this.state = {
      audioBlob: null
    }
  }

  componentDidMount() {
    this.mediaChecks()
  }

  clickToRecord = () => this.recorder.start()

  clickToStopRecording = () => this.recorder.stop()

  async mediaChecks() {
    let hasUserMedia = Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    if (!hasUserMedia()) throw new Error('Navigator does not support video media record.')
    if (!await this.hasAudioVideoDevices()) throw new Error('Not audio/video input devices detected.')
    
    try {
      this.mediaStream = await window.navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      throw new Error("Yikes! Unable to get user media!");
    }

    this.recorder = this.createNewRecorder(this.mediaStream)
    const mimeSupported = ['audio/wav', 'audio/mpeg', 'audio/webm', 'audio/ogg'].filter(MediaRecorder.isTypeSupported)
    this.mimeType = mimeSupported[0]
  }

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

  createNewRecorder = mediaStream => {
    const recorder = new window.MediaRecorder(mediaStream)
    recorder.ondataavailable = evt => {
      console.log("Pushing...", evt.data)
      this.mediaChunks.push(evt.data)
      console.log("Media Chunks...", this.mediaChunks)
    }
    recorder.onstart = this.onRecordStart
    const stopped = new Promise((resolve, reject) => {
      recorder.onstop = evt => {
        console.log("stopping")
        resolve()
      }
      recorder.onerror = event => reject(event.name)
    })
    stopped
      .then(this.saveMediaBlob)
      .then(this.onRecordStop)
    return recorder
  }

  onRecordStart = () => console.log("Starting Recording")

  saveMediaBlob = () => {
    try {
      return new window.Blob(this.mediaChunks, { type: this.mimeType })
    } catch (e) {
      console.error('Error generating file:', e)
    }
  }

  onRecordStop = audioBlob => {
    this.blob = audioBlob
    this.setState({ audioBlob: URL.createObjectURL(audioBlob) })
  }

  onReset = () => {
    console.log("Resetting...")
    this.mediaChunks = []
    this.blob = null
    this.recorder = this.createNewRecorder(this.mediaStream)
    this.setState({ audioBlob: null })
  }

  render() {
    return <div>
      <button onClick={this.clickToRecord}>Record</button>
      {
        this.state.audioBlob ?
          <button onClick={this.onReset}>Reset</button> :
          <button onClick={this.clickToStopRecording}>Stop</button>
      }

      {
        this.state.audioBlob &&
        <article>
          <audio controls src={this.state.audioBlob} />
        </article>
      }
    </div>
  }
}
