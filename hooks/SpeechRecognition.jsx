'use client'
import React, {useEffect, useState} from 'react'

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState(null)
    let recognition;

    useEffect(() => {
        if(!(window.hasOwnProperty("webkitSpeechRecognition"))){
            setError("speech recognition is not supported in the browser.")
        }

        recognition = new window.webkitSpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true

        recognition.onresult = (e) => {
            let transcriptMsg = e.results[e.results.length - 1][0].transcript
            setTranscript(transcriptMsg)
        }

        recognition.onerror = (e) => {
            setError(e.error)
        }
        return () => {
            if(recognition){
                recognition.stop()
            }
        }
    }, []);

    const startListening = () => {
        if(recognition){
            recognition.start()
            setIsListening(true)
        }
    }

    const stopListening = () => {
        if(recognition){
            recognition.stop()
            setIsListening(false)
        }
    }

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        error
    }
}
export default useSpeechRecognition
