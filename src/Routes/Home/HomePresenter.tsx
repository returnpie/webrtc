import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Anchor = styled.a`
  text-decoration: none;
`;

const Intro = styled.p`
  width: 60%;
  height: 100%;
  color: black;
`;

const HomePresenter = () => {
  return (
    <Wrapper>
      <h2>
        <Anchor href={"https://webrtc.org/"}>Web RTC</Anchor>
      </h2>
      <Intro>
        Real-time communication for the web With WebRTC, you can add real-time
        communication capabilities to your application that works on top of an
        open standard. It supports video, voice, and generic data to be sent
        between peers, allowing developers to build powerful voice- and
        video-communication solutions. The technology is available on all modern
        browsers as well as on native clients for all major platforms. The
        technologies behind WebRTC are implemented as an open web standard and
        available as regular JavaScript APIs in all major browsers. For native
        clients, like Android and iOS applications, a library is available that
        provides the same functionality. The WebRTC project is open-source and
        supported by Apple, Google, Microsoft and Mozilla, amongst others. This
        page is maintained by the Google WebRTC team.
      </Intro>
      <h2>
        <Anchor href={"https://webrtc.github.io/samples/"}>Sample</Anchor>
      </h2>
      <Intro>
        This is a collection of small samples demonstrating various parts of the
        WebRTC APIs. The code for all samples are available in the GitHub
        repository. Most of the samples use adapter.js, a shim to insulate apps
        from spec changes and prefix differences. <Anchor href={"https://webrtc.org/testing"}>https://webrtc.org/testing</Anchor>
        lists command line flags useful for development and testing with Chrome.
        Patches and issues welcome! See CONTRIBUTING.md for instructions.
        Warning: It is highly recommended to use headphones when testing these
        samples, as it will otherwise risk loud audio feedback on your system.
      </Intro>
    </Wrapper>
  );
};

export default HomePresenter;
