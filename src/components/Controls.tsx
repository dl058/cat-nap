import "./Controls.css";
import { useEffect, useState } from "react";
const Controls = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // Default to 10 minutes (600 seconds)

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isRunning || timeLeft === 0) {
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCustomMinutes(val);
    setTimeLeft(val * 60);
    localStorage.setItem("catNapLength", val.toString());
  };
  const [customMinutes, setCustomMinutes] = useState(
    Number(localStorage.getItem("catNapLength")) || 10
  );

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTimeLeft(600);
    setIsRunning(false);
  };

  return (
    <div className="container">
      <div className="Countdown">{formatTime(timeLeft)}</div>

      <div className="CustomTime">
        Custom Time:
        <input
          type="number"
          min="1"
          value={customMinutes}
          onChange={handleCustomTimeChange}
          className="customTimeInput"
        />
        <div className="TimersControls">
          <div className="timer-control-buttons"></div>
          <button onClick={startTimer} className="startBtn">
            Start
          </button>
          <button onClick={pauseTimer} className="pauseBtn">
            Pause
          </button>
          <button onClick={resetTimer} className="resetBtn">
            Reset
          </button>
        </div>
      </div>

      <div className="preset-buttons">
        <button
          onClick={() => {
            setTimeLeft(300);
            setCustomMinutes(5);
            localStorage.setItem("catNapLength", "5");
          }}
          className="presetBtn"
        >
          5 min
        </button>
        <button
          onClick={() => {
            setTimeLeft(600);
            setCustomMinutes(10);
            localStorage.setItem("catNapLength", "10");
          }}
          className="presetBtn"
        >
          10 min
        </button>
        <button
          onClick={() => {
            setTimeLeft(900);
            setCustomMinutes(15);
            localStorage.setItem("catNapLength", "15");
          }}
          className="presetBtn"
        >
          15 min
        </button>
        <button
          onClick={() => {
            setTimeLeft(1200);
            setCustomMinutes(20);
            localStorage.setItem("catNapLength", "20");
          }}
          className="presetBtn"
        >
          20 min
        </button>
      </div>
    </div>
  );
};

export default Controls;
