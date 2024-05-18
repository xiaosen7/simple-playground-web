import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import * as xstateReact from "@xstate/react";
import * as xstate from "xstate";

const modules = {
  react: React,
  "react-dom/client": ReactDOMClient,
  "@xstate/react": xstateReact,
  xstate: xstate,
};

export default modules;
