import * as React from "react";
import './Page.scss';

export const Page = (props: React.Props<{}>) => {
  return(
    <div className="PageContainer">
      { props.children }
    </div>
  )
}