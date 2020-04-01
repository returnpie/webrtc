import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ColumnDiv = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: center;
    margin: 0 1%;
`;

const RowDiv = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
`;

const VideoDiv = styled.div`
    width: 640px; 
    height: 480px;
    background-color: #090909;
`;

const Button = styled.button`
    width: 100px;
    height: 40px;
    margin: 10px;
    background-color: #f44336;
    color: #ededed;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    &:focus {
        outline: none;
    }
`;

interface Props {
    errMsg: string;
    originVideo: React.RefObject<HTMLVideoElement> | null | undefined;
    remoteVideo: React.RefObject<HTMLVideoElement> | null | undefined;
    start: () => void;
    call: () => void;
    hangUp: () => void;
    startButtonDisabled: boolean;
    callButtonDisabled: boolean;
    hangUpButtonDisabled: boolean;
}

const CallAndTurnVideoOnPresenter = (props: Props) => {
    const {
        errMsg,
        originVideo,
        remoteVideo,
        start,
        call,
        hangUp,
        startButtonDisabled,
        callButtonDisabled,
        hangUpButtonDisabled,
    } = props;
    return (
        <Wrapper>
            <h2>Peer Connection - Call And Turn video on (SDP Semantics: Default)</h2>
            {errMsg && <h4>{errMsg}</h4>}
            {!errMsg && (
                <RowDiv>
                    <ColumnDiv>
                        <VideoDiv>
                            <video autoPlay ref={originVideo} />
                        </VideoDiv>
                        <h5>[origin video]: getUserMedia()</h5>
                    </ColumnDiv>
                    <ColumnDiv  >
                        <VideoDiv>
                            <video autoPlay ref={remoteVideo} />
                        </VideoDiv>
                        <h5>[remote video]: RTCPeerConnection</h5>
                    </ColumnDiv>
                </RowDiv>
            )}
            <RowDiv>
                <Button onClick={start} disabled={startButtonDisabled}>Start</Button>
                <Button onClick={call} disabled={callButtonDisabled}>Call</Button>
                <Button>Video</Button>
                <Button onClick={hangUp} disabled={hangUpButtonDisabled}>Hang Up</Button>
            </RowDiv>
        </Wrapper>
    );
}

export default CallAndTurnVideoOnPresenter;
