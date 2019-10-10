import * as React from "react";
import { ICommonProps } from "pages/wizard/Wizard";
import "./Result.scss"

export class Result extends React.Component <ICommonProps> {
  render () {
    return (
      <div className="Result">
        <section className="Top">
          <p>This is my suggestion:</p>
          <div className="mainText">
            <h4>{this.props.state.predictedResult}</h4>
          </div>
        </section>
        <section className="Middle">
          {/* <a className="playButton">
            <img src={recordButtonImg} />
          </a> */}
        </section>
        <section className="Bottom">
          <button className="clickToPlayButton">
            Click To Play
          </button>

          <div className="textArea">
            <textarea
              className="textArea__Input"
              onChange={this.onUserType} />
          </div>
        </section>
      </div>
    )
  }

  onUserType = (e: React.ChangeEvent) => {
    this.props.setState({ 
      // @ts-ignore
      correctedResult: e.target.value
    })
  }
}