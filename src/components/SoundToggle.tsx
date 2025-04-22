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
        onClick={() => setIsSoundOn((prev) => !prev)}
        className="SoundBtn"
      >
        {isSoundOn ? "🔊 Sound On" : "🔇 Sound Off"}
      </button>
    </div>
  );
};

export default SoundToggle;
