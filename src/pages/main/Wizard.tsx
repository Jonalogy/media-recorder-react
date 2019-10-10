import * as React from "react";
import { useState } from "react";
import "./Main.scss"
import { Page } from "../Page";

interface ICommonProps {
  nextStep: (s: string) => void;
}
const Main = (props: ICommonProps) => (
  <div className="Page">
    <section className="Top">Hello, how I can help you today?</section>

    <section className="Middle">
      Click
      &#127897;
      and start speaking
    </section>

    <section className="Bottom">
      <div className="Mic-button"
        onClick={() => props.nextStep("result")} />
    </section>
  </div>
)

const Result = (props: ICommonProps) => {
  return (
    <div className="Page">
      <section className="Top">I am listenng...</section>
      <section className="Middle">|||</section>
      <section className="Bottom">
        <div className="Mic-button"
          onClick={() => props.nextStep("main")} />
      </section>
    </div>
  )
}

export const Wizard = (props: React.Props<{}>) => {
  const [step, nextStep] = useState("main")
  const commonProps = { nextStep }
  return (
    <>
      {
        step === "main" && <Main {...commonProps} />
      }
      {
        step === "result" && <Result {...commonProps} />
      }
    </>
  )
}