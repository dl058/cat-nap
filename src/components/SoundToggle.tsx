import "./SoundToggle.css";
import { useState, useRef, useEffect } from "react";
const SoundToggle = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const [isRunning, setIsRunning] = useState(false); // Placeholder for isRunning state

  useEffect(() => {
    setIsRunning(true); // Set isRunning to true when the component mounts
  }, []);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (audioRef.current) {
      if (isSoundOn && isRunning) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isSoundOn, isRunning]);
  return (
    <div className="SoundToggle">
      {" "}
      <audio
        ref={audioRef}
        src={`${import.meta.env.VITE_PUBLIC_URL}/nap-music.mp3`}
        loop
      />
      <button
        onClick={async () => {
          setIsSoundOn((prev) => {
            const newState = !prev;
            return newState;
          });
          if (audioRef.current) {
            if (!isSoundOn) {
              // Turning sound ON, try to play
              try {
                await audioRef.current.play();
              } catch (e) {
                // Handle play() promise rejection
                console.error("Audio play failed:", e);
              }
            } else {
              // Turning sound OFF, pause
              audioRef.current.pause();
            }
          }
        }}
        className="SoundBtn"
      >
        {isSoundOn ? "🔊 Sound On" : "🔇 Sound Off"}
      </button>
    </div>
  );
};

export default SoundToggle;
