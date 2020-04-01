import React, { useRef, useState } from 'react';
import VideoCapturePresenter from './CallAndTurnVideoOnPresenter';

const CONSTRAINTS = { video: true, audio: true };
const OFFEROPTIONS = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
};

const CallAndTurnVideoOnContainer = () => {
    const originVideo = useRef<HTMLVideoElement>(null);
    const remoteVideo = useRef<HTMLVideoElement>(null);

    const [startButtonDisabled, setStartButtonDisabled] = useState(false);
    const [callButtonDisabled, setCallButtonDisabled] = useState(true);
    const [hangUpButtonDisabled, setHangUpButtonDisabled] = useState(true);
    const [errMsg, setErrMsg] = useState('');

    const [stream, setStream] = useState<MediaStream>();

    const originPC = new RTCPeerConnection({});
    const remotePC = new RTCPeerConnection({});

    const start = async () => {
        setStartButtonDisabled(true);
        setCallButtonDisabled(false);

        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        
        if (stream && originVideo && originVideo.current && !originVideo.current.srcObject) {
            originVideo.current.srcObject = stream;
            setStream(stream);
        } else {
            setErrMsg(' check your cam, please retry ');
        }
    }

    const getOtherPc = (pc: RTCPeerConnection) => {
        return (pc === originPC) ? remotePC : originPC;
    }

    const onIceCandidate = async (pc: RTCPeerConnection, event: RTCPeerConnectionIceEvent) => {
        try {
            if (event.candidate) {
                await (getOtherPc(pc).addIceCandidate(event.candidate));
            }
        } catch (error) {
            console.log('on - ', error);
        }
    }

    const gotRemoteStream = (event: RTCTrackEvent) => {
        if (remoteVideo && remoteVideo.current && !remoteVideo.current.srcObject) {
            remoteVideo.current.srcObject = event.streams[0];
        }
    }

    const onCreateAnswerSuccess = async (desc: RTCSessionDescription) => {
        try {
            await remotePC.setLocalDescription(desc);
        } catch (error) {
            console.log('answer - setLocal -', error);
        }

        try {
            await originPC.setRemoteDescription(desc);
        } catch (error) {
            console.log('answer - setRemote -', error);
        }
    }

    const onCreateOfferSuccess = async (desc: RTCSessionDescription) => {
        try {
            await originPC.setLocalDescription(desc);
        } catch (error) {
            console.log('offer - setLocal -', error);
        }

        try {
            await remotePC.setRemoteDescription(desc);
        } catch (error) {
            console.log('offer - setRemote -', error);
        }

        try {
            const answer = await remotePC.createAnswer() as RTCSessionDescription;
            await onCreateAnswerSuccess(answer);
        } catch (error) {
            console.log('offer - createAnswer -', error);
        }
    }

    const call = async () => {
        setCallButtonDisabled(true);
        setHangUpButtonDisabled(false);

        remotePC.addEventListener('icecandidate', event => onIceCandidate(remotePC, event));
        remotePC.addEventListener('track', gotRemoteStream);

        if (stream) {
            stream.getTracks().forEach(track => originPC.addTrack(track, stream));
        }

        try {
            const offer = await originPC.createOffer(OFFEROPTIONS) as RTCSessionDescription;
            onCreateOfferSuccess(offer);
        } catch (error) {
            console.log('call - ', error);
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
            start={start}
            call={call}
            hangUp={hangUp}
            startButtonDisabled={startButtonDisabled}
            callButtonDisabled={callButtonDisabled}
            hangUpButtonDisabled={hangUpButtonDisabled}
        />
    );
}

export default CallAndTurnVideoOnContainer;