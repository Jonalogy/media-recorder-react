import * as React from "react";
import { ICommonProps } from "../..";

export const Main = (props: ICommonProps) => (
  <div className="Page">
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
      <div className="mic-holder">
        <div className="mic-button"
             onClick={() => props.nextStep("result")} />
      </div>
    </section>

  </div>
)