import { createRoot } from "react-dom/client";
import React from "react";
import styled from "@emotion/styled";
import "./index.css";

const StyledDiv = styled.div`
  color: red;
`;

createRoot(document.getElementById("root")!).render(
  <StyledDiv>hello world</StyledDiv>
);
