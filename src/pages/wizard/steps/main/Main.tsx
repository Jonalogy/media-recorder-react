import * as React from "react";
import { ICommonProps } from "../../Wizard";
import AudioContextRecorder from "recorders/ReactAudioRecorder/AudioContextRecorder";

import "./Main.scss"

export class Main extends React.Component<ICommonProps> {

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
}