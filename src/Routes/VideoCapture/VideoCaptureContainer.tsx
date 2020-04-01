import React, { useRef, useState } from 'react';
import VideoCapturePresenter from "./VideoCapturePresenter";

const CONSTRAINTS = { video: true };

const VideoPeerConnection = () => {
    const originVideo = useRef<HTMLVideoElement>(null);
    const remoteVideo = useRef<HTMLVideoElement>(null);

    const [startButtonDisabled, setStartButtonDisabled] = useState(false);
    const [callButtonDisabled, setCallButtonDisabled] = useState(true);
    const [hangUpButtonDisabled, setHangUpButtonDisabled] = useState(true);

    const [errMsg, setErrMsg] = useState('');

    const startTarget = async () => {
        setStartButtonDisabled(true);
        setCallButtonDisabled(false);
        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        if (stream && originVideo && originVideo.current && !originVideo.current.srcObject) {
            originVideo.current.srcObject = stream;
        } else {
            setErrMsg(' check your cam, please retry ');
        }
    }

    const callCapture = () => {
        setCallButtonDisabled(true);
        setHangUpButtonDisabled(false);
        // any: captureStream이 표준화 되지 않아서 HTMlVideoElement typeDefs에 없음.
        const stream = (originVideo.current as any).captureStream();
        if (stream && remoteVideo && remoteVideo.current) {
            remoteVideo.current.srcObject = stream;
        }
    }

    const hangUp = () => {
        setStartButtonDisabled(false);
        setCallButtonDisabled(true);
        setHangUpButtonDisabled(true);
        if (originVideo && originVideo.current && originVideo.current.srcObject) {
            originVideo.current.srcObject = null;
        }
        if (remoteVideo && remoteVideo.current && remoteVideo.current.srcObject) {
            remoteVideo.current.srcObject = null;
        }
    }

    return (
        <VideoCapturePresenter
            errMsg={errMsg}
            originVideo={originVideo}
            remoteVideo={remoteVideo}
            start={startTarget}
            call={callCapture}
            hangUp={hangUp}
            startButtonDisabled={startButtonDisabled}
            callButtonDisabled={callButtonDisabled}
            hangUpButtonDisabled={hangUpButtonDisabled}
        />
    );
}

export default VideoPeerConnection;
