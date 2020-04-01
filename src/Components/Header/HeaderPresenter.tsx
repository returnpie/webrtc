import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AppBar = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkButton = styled.button`
  width: 300px;
  height: 30px;
  border-radius: 6px;
`;

const HeaderPresenter = () => {
  return (
    <AppBar>
      <Link to={"/"}>
        <LinkButton>Home</LinkButton>
      </Link>
      <Link to={"/videoCapture"}>
        <LinkButton>VideoCapture</LinkButton>
      </Link>
      <Link to={"/RTCPeerConnection"}>
        <LinkButton>RTCPeerConnection</LinkButton>
      </Link>
      <Link to={"/callAndTurnVideoOn"}>
        <LinkButton>CallAndTurnVideoOn</LinkButton>
      </Link>
    </AppBar>
  );
};

export default HeaderPresenter;
