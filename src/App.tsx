import React from "react";
import styled from "styled-components";
import Header from "./Components/Header";
import Router from "./Components/Router";
import { BrowserRouter } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <Router />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
