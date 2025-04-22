import { useEffect, useState, useRef } from "react";
import "./Timer.css";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (in seconds)
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isSoundOn] = useState(true);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (audioRef.current) {
      if (isSoundOn && timeLeft === 0) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else if (!isRunning || timeLeft > 0) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isSoundOn, isRunning, timeLeft]);

  return (
    <div className="Timer">
      <h1>Cat Nap Timer</h1>
      {!isRunning && timeLeft === 0 && (
        <>
          <p className="NapsOver">Naptime's over! 🐾 Time to stretch!</p>
          <audio ref={audioRef} src="/alarm.mp3" />
        </>
      )}
      {(isRunning || timeLeft > 0) && (
        <audio ref={audioRef} src="/alarm.mp3" style={{ display: "none" }} />
      )}
    </div>
  );
};
export default Timer;
