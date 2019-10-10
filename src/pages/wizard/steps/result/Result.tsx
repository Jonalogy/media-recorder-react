import * as React from "react";
import { ICommonProps } from "../..";
import "./Result.scss"

export const Result = (props: ICommonProps) => {
  return (
    <div className="Result">
      <section className="Top">
        <p>This is my suggestion:</p>
        <div>
          <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit</h4>
        </div>
      </section>
      <section className="Middle">
        <button className="playButton">Click To Play</button>
      </section>
      <section className="Bottom">
        <textarea className="textArea" />
      </section>
    </div>
  )
}