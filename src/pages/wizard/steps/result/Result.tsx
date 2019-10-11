import * as React from "react";
import { ICommonProps } from "pages/wizard/Wizard";
import "./Result.scss"
import WAVEInterface from "recorders/ReactAudioRecorder/waveInterface";
import { API } from "api";

export class Result extends React.Component<ICommonProps> {
  textAreaRef: HTMLTextAreaElement | null = null;

  state = {
    userToCorrect: false
  }

  componentWillUnmount() {
    this.textAreaRef = null
  }

  render() {
    console.log(this.props.state.correctedResult)
    const { predictedResult } = this.props.state;
    return (
      <>
        <button
          className="backButton"
          onClick={this.navigateBackToRecord}  >
          Back to Record again
        </button>

        <div className="Result">
          <div className="ResultBody">
            <section className="Top">
              <p className="userDirections">
                This is my suggestion:
            </p>
              <div className="mainText">
                <h4>{predictedResult || "I'm sorry, I don't know what you said..."}</h4>
              </div>
            </section>
            {/* <section className="Middle">
          <a className="playButton">
            <img src={recordButtonImg} />
          </a>
        </section> */}
            <section className="Bottom">
              <br /><br />
              {
                !this.state.userToCorrect ?
                  <div className="textAreaInactive">
                    Not what you were looking for?
                    Just type it out and it would help me
                    improve your experience in future.
                  <br /><br />
                    <button
                      className="enableTextAreaButton"
                      onClick={this.onUserClickToType}>
                      No, this is what I said
                  </button>
                  </div> :
                  <div className="textArea">
                    <textarea
                      className="textArea__Input"
                      ref={this.getTextRef}
                      onChange={this.onUserType} />
                    <button
                      className="sendCorrectionButton"
                      onClick={this.onUserClickToSendTypedCorrection}>
                      Send
                  </button>
                  </div>

              }
            </section>

          </div>
        </div>

      </>
    )
  }

  private onUserClickToType = () => {
    this.setState({ userToCorrect: true })
  }

  private onUserClickToSendTypedCorrection = () => {
    fetch(
      `${API.texttospeecharray}?text=${this.props.state.correctedResult}`,
      { method: "POST" }
    )
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

  private onUserType = (e: React.ChangeEvent) => {
    this.props.nextRootState({
      // @ts-ignore
      correctedResult: e.target.value
    })
  }

  private getTextRef = (r: HTMLTextAreaElement) => {
    if (!this.textAreaRef) {
      this.textAreaRef = r
      this.textAreaRef.focus()
    }
  }

  private navigateBackToRecord = () => {
    this.props.nextStep("main")
  }
}