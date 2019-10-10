import * as React from "react";
import { useState } from "react";
import { Main } from "pages/wizard/steps/main/Main";
import { Result } from "pages/wizard/steps/result/Result";
import "./Wizard.scss"
import { IRootState } from "App";

export interface ICommonProps extends IRootState {
  nextStep: (s: string) => void;
}

export const Wizard = (props: IRootState) => {
  const [step, nextStep] = useState("main")
  const commonProps = { nextStep, ...props }
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