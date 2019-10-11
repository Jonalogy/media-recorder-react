import * as React from "react";
// @ts-ignore
import downloadBlob from "./downloadBlob.ts";
// @ts-ignore
import WAVEInterface from "./waveInterface.ts";
import { API } from "api";
import recordButtonImg from "images/button-record.svg";
import { ICommonProps } from "pages/wizard/Wizard";
import "./AudioContextRecorder.scss"

// Forked from https://github.com/danrouse/react-audio-recorder
interface IAudioRecorderChangeEvent {
  duration: number;
  audioData?: Blob | null;
}

interface IAudioRecorderProps extends ICommonProps {
  initialAudio?: Blob;
  downloadable?: boolean;
  loop?: boolean;
  filename?: string;
  className?: string;
  style?: {};

  onAbort?: () => void;
  onChange?: (event: IAudioRecorderChangeEvent) => void;
  onEnded?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onRecordStart?: () => void;

  playLabel?: string;
  playingLabel?: string;
  recordLabel?: string;
  recordingLabel?: string;
  removeLabel?: string;
  downloadLabel?: string;

  nextStep: (s: string) => void;
}

interface IAudioRecorderState {
  isRecording: boolean;
  isPlaying: boolean;
  audioData?: Blob | null;
  mediaStream?: MediaStream;
}

export default class AudioContextRecorder extends React.Component<IAudioRecorderProps, IAudioRecorderState> {

  public static defaultProps = {
    loop: false,
    downloadable: true,
    className: "",
    style: {},
    filename: "output.wav",
    playLabel: "🔊 Play",
    playingLabel: "❚❚ Playing",
    recordLabel: "● Record",
    recordingLabel: "● Recording",
    removeLabel: "✖ Remove",
    downloadLabel: "\ud83d\udcbe Save", // unicode floppy disk
  };
  public waveInterface: WAVEInterface = new WAVEInterface();

  public state: IAudioRecorderState = {
    isRecording: false,
    isPlaying: false,
    audioData: this.props.initialAudio,
  };

  public componentWillReceiveProps(nextProps: IAudioRecorderProps) {
    // handle new initialAudio being passed in
    if (
      nextProps.initialAudio &&
      nextProps.initialAudio !== this.props.initialAudio &&
      this.state.audioData &&
      nextProps.initialAudio !== this.state.audioData
    ) {
      this.waveInterface.reset();
      this.setState({
        audioData: nextProps.initialAudio,
        isPlaying: false,
        isRecording: false,
      });
    }
  }

  public componentDidUpdate() {
    console.log(this.state.audioData);
    if (this.state.audioData) {
      this.onSendClick()
    }
  }

  public componentWillMount() { this.waveInterface.reset(); }

  public componentWillUnmount() { this.waveInterface.reset(); }

  public startRecording() {
    if (!this.state.isRecording) {
      this.waveInterface.startRecording()
        .then(() => {
          this.setState({ isRecording: true });
          if (this.props.onRecordStart) { this.props.onRecordStart(); }
        })
        .catch((err: MediaStreamError) => { throw err; });
    }
  }

  public stopRecording() {
    this.waveInterface.stopRecording();

    this.setState({
      isRecording: false,
      audioData: this.waveInterface.audioData,
    });

    if (this.props.onChange) {
      this.props.onChange({
        duration: this.waveInterface.audioDuration,
        audioData: this.waveInterface.audioData,
      });
    }
    this.startPlayback();
  }

  public startPlayback() {
    if (!this.state.isPlaying) {
      this.waveInterface.startPlayback(this.props.loop, this.onAudioEnded)
        .then(() => {
          this.setState({ isPlaying: true });
          if (this.props.onPlay) { this.props.onPlay(); }
        })
        .catch((e: ProgressEvent) => {
          console.error(e); // tslint:disable-line:no-console
          window.alert("Please refresh your browser");
        });
    }
  }

  public stopPlayback() {
    this.waveInterface.stopPlayback();
    this.setState({ isPlaying: false });
    if (this.props.onAbort) { this.props.onAbort(); }
  }

  public onAudioEnded = () => {
    this.setState({ isPlaying: false });
    if (this.props.onEnded) { this.props.onEnded(); }
  }

  public onRemoveClick = () => {
    this.waveInterface.reset();
    if (this.state.audioData && this.props.onChange) { this.props.onChange({ duration: 0, audioData: null }); }
    this.setState({
      isPlaying: false,
      isRecording: false,
      audioData: null,
    });
  }

  public onDownloadClick = () => downloadBlob(this.state.audioData, this.props.filename);

  public onButtonClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (this.state.audioData) {
      if (this.state.isPlaying) {
        this.stopPlayback();
        event.preventDefault();
      } else {
        this.startPlayback();
      }
    } else {
      if (this.state.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    }
  }

  public onSendClick = () => {
    console.log("onSendClick")
    const formData = new FormData();
    formData.append("file", this.state.audioData as Blob);
    fetch(API.speechtotextdefault, {
      method: "POST",
      body: formData
    })
      .then((res: Response) => res.text())
      .catch(err => console.error(err))
      .then((res) => {
        this.props.nextStep("result")
        this.props.nextRootState({ predictedResult: res || "" })
        this.setState({
          audioData: null
        })
      })
  }

  public render() {
    return (
      <div className="AudioRecorder">
        <button
          className={
            [
              "AudioRecorder-button",
              this.state.audioData ? "hasAudio" : "",
              this.state.isPlaying ? "isPlaying" : "",
              this.state.isRecording ? "isRecording" : "",
            ].join(" ")
          }
          onClick={this.onButtonClick}
        >
          {this.state.audioData && !this.state.isPlaying && this.props.playLabel}
          {this.state.audioData && this.state.isPlaying && this.props.playingLabel}
          {!this.state.audioData && !this.state.isRecording && (
            <img className="mic-button"
              src={recordButtonImg}
              alt="record" />
          )}
          {!this.state.audioData && this.state.isRecording && (
            <button className="stopRecordingButton">
              End Recording
            </button>
          )}
        </button>
        {false && this.state.audioData &&
          <button
            className="AudioRecorder-remove"
            onClick={this.onRemoveClick}
          >
            {this.props.removeLabel}
          </button>
        }
        {false && this.state.audioData && this.props.downloadable &&
          <>
            {/* <button
              className="AudioRecorder-download"
              onClick={this.onDownloadClick}
            >
              {this.props.downloadLabel}
            </button> */}
            <button
              className="AudioRecorder-download"
              onClick={this.onSendClick}
            >
              Send
            </button>
          </>
        }
      </div>
    );
  }
}
