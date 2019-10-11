import * as React from "react";
import { useState } from "react";
import { ICommonProps } from "pages/wizard/Wizard";
import "./Result.scss"

export class Result extends React.Component<ICommonProps> {

  state = {
    userToCorrect: false
  }

  render() {
    return (
      <div className="Result">
        <div className="ResultBody">
          <section className="Top">
            <p>This is my suggestion:</p>
            <div className="mainText">
              <h4>{this.props.state.predictedResult}</h4>
            </div>
          </section>
          {/* <section className="Middle">
          <a className="playButton">
            <img src={recordButtonImg} />
          </a>
        </section> */}
          <section className="Bottom">
            <button className="playAudioButton">
              Click To Play
            </button>
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
                    I want to type
                  </button>
                </div> :
                <div className="textArea">
                  <textarea
                    className="textArea__Input"
                    onChange={this.onUserType} />
                  <button
                    className="sendCorrectionButton"
                    onClick={this.onUserClickToType}>
                    Send
                  </button>
                </div>

            }
          </section>

        </div>
      </div>
    )
  }

  onUserClickToType = () => {
    this.setState({ userToCorrect: true })
  }

  onUserType = (e: React.ChangeEvent) => {
    this.props.setState({
      // @ts-ignore
      correctedResult: e.target.value
    })
  }
}