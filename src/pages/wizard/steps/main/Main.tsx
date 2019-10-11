import * as React from "react";
import { ICommonProps } from "../../Wizard";
import AudioContextRecorder from "recorders/ReactAudioRecorder/AudioContextRecorder";

import "./Main.scss"
import recordButtonImg from "images/button-record.svg";
import { API } from "api";
import WAVEInterface from "recorders/ReactAudioRecorder/waveInterface";

export class Main extends React.Component<ICommonProps> {

  componentDidMount = () => {
    this.textToSpeech()
  }

  render() {
    return (
      <div className="Main">
        <div className="MainBody">

          <section className="Top">
            <div className="mainText">
              Hello, how I can help you today?
          </div>
          </section>

          <section className="Middle">
            <div className="userDirections">
              Click &#127897; and start speaking
            </div>
          </section>

          <section className="Bottom">
            <div className="mic-holder">
              <AudioContextRecorder {...this.props} />
              {/* <img className="mic-button"
                src={recordButtonImg}
                alt="record"
                onClick={this.onClickRecord} /> */}
              {/* <div className="mic-button"
                 onClick={() => props.nextStep("result")} /> */}
            </div>
          </section>

        </div>

      </div>
    )
  }
  private textToSpeech() {
    const text = "text to speech is working"
    // @ts-ignore
    fetch(`${API.texttospeecharray}?text=text to speech is working`, { method: "POST" })
      .then((res: Response) => {
        return res.blob()
      })
      // @ts-ignore
      .then((audioData: Blob | undefined) => {
        console.log(audioData)
        const wavInterface = new WAVEInterface()
        wavInterface.startPlayback({
          customAudioData: audioData
        })
      })

  }
}