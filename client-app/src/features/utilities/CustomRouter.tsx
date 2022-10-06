import { BrowserHistory } from "history";
import React, { ReactNode } from "react";
import { Router } from "react-router-dom";

interface Props {
  basename?: string;
  children?: ReactNode;
  history: BrowserHistory;
}

export default function CustomRouter({ basename, children, history }: Props) {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}
