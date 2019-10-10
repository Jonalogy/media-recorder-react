import * as React from "react";
import { useState } from "react";
import { Main } from "./steps/main/Main";
import { Result } from "./steps/result/Result";
import "./Wizard.scss"

export interface ICommonProps {
  nextStep: (s: string) => void;
}

export const Wizard = (props: React.Props<{}>) => {
  const [step, nextStep] = useState("main")
  const commonProps:ICommonProps = { nextStep }
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