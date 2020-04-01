import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../Routes/Home";
import VidepCapture from "../../Routes/VideoCapture";
import RTCPeerConnection from "../../Routes/RTCPeerConnection";
import CallAndTurnVideoOn from "../../Routes/CallAndTurnVideoOn";

const RouterPresenter = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Home} />
      <Route path={"/videoCapture"} component={VidepCapture} />
      <Route path={"/RTCPeerConnection"} component={RTCPeerConnection} />
      <Route path={"/callAndTurnVideoOn"} component={CallAndTurnVideoOn} />
    </Switch>
  );
};

export default RouterPresenter;
