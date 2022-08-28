import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faClose, faPause, faSave, faPlay } from '@fortawesome/free-solid-svg-icons'

import useAudioRecorder from "../hooks/useAudioRecorder"

import "../styles/audio-recorder.css";

interface Props {
    /**
     * This gets called when the save button is clicked.
     * In case the recording is cancelled, the blob is discarded.
    **/
    onRecordingComplete?: (blob: Blob) => void;
}

const AudioRecorder = ({ onRecordingComplete }: Props ) => {
    const { startRecording, stopRecording, togglePauseResume, recordingBlob, isRecording, isPaused, recordingTime } = useAudioRecorder()
    const [shouldSave, setShouldSave] = useState(false)

    const stopAudioRecorder = (save: boolean = true) => {
        setShouldSave(save);
        stopRecording()
    }

    useEffect(() => {
        if (shouldSave && recordingBlob && onRecordingComplete) {
            onRecordingComplete(recordingBlob)
        }
    }, [recordingBlob])

    return (
        <div className={`audio-recorder ${isRecording ? "recording" : "" }`} >
            <FontAwesomeIcon icon={isRecording ? faSave : faMicrophone}  className="audio-recorder-mic" onClick={isRecording ? () => stopAudioRecorder() : startRecording}/>
            <span className={`audio-recorder-timer ${!isRecording ? "display-none" : "" }`}>{recordingTime[0]}:{recordingTime[1] >= 10 ? recordingTime[1] : `0${recordingTime[1]}`}</span>
            <FontAwesomeIcon icon={isPaused ? faPlay: faPause} className={`audio-recorder-options ${!isRecording ? "display-none" : "" }`} onClick={togglePauseResume}/>
            <FontAwesomeIcon icon={faClose} className={`audio-recorder-options ${!isRecording ? "display-none" : "" }`} onClick={() => stopAudioRecorder(false)}/>
        </div>
    )
}

export default AudioRecorder