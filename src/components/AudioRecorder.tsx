// src/components/AudioRecorder.tsx
import React, { useState, useRef } from "react";

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      let chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        chunks = [];
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const handleSendAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    try {
      const response = await fetch("https://your-server.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Audio file uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading audio file:", error);
    }
  };

  return (
    <div>
      <h2 className="flex justify-center p-2 bg-yellow-300 mb-3">
        Audio Recorder
      </h2>
      <div className="flex gap-3">
        <button
          onClick={handleStartRecording}
          disabled={recording}
          className="bg-black text-white rounded p-2"
        >
          Start Recording
        </button>
        <button
          onClick={handleStopRecording}
          disabled={!recording}
          className="bg-red-600 text-white rounded p-2"
        >
          Stop Recording
        </button>
      </div>
      {audioURL && (
        <div>
          <audio controls src={audioURL} />
          <button onClick={handleSendAudio}>Send Audio</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
