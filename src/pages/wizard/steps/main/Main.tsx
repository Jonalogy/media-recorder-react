import * as React from "react";
import { ICommonProps } from "../../Wizard";
import AudioContextRecorder from "recorders/ReactAudioRecorder/AudioContextRecorder";

import "./Main.scss"
import recordButtonImg from "images/button-record.svg";

export class Main extends React.Component<ICommonProps> {

  onClickRecord = () => {
    this.props.nextStep("result")
    this.props.nextRootState({ predictedResult: "Hello There" })
  }

  render () {
    return (
      <div className="Main">
        <div className="MainBody">

          <section className="Top">
            <div className="mainText">
              Hello, how I can help you today?
          </div>
          </section>

          <section className="Middle">

          </section>

          <section className="Bottom">
            <div className="userDirections">
              Click &#127897; and start speaking
          </div>
            <AudioContextRecorder {...this.props} />
            <div className="mic-holder">
              <img className="mic-button"
                src={recordButtonImg}
                alt="record"
                onClick={this.onClickRecord} />
              {/* <div className="mic-button"
                 onClick={() => props.nextStep("result")} /> */}
            </div>
          </section>

        </div>
    
      </div>
    )
  }
}