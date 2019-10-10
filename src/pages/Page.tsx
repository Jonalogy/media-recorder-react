import * as React from "react";
import './Page.css';

export const Page = (props: React.Props<{}>) => {
  return(
    <div className="Page">
      { props.children }
    </div>
  )
}