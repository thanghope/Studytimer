import { useEffect, useState } from "react";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function App() {
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completed, setCompleted] = useState(() => {
    return Number(localStorage.getItem("pomodoro-completed")) || 0;
  });

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            const nextIsBreak = !isBreak;
            const nextTime = nextIsBreak ? BREAK_TIME : WORK_TIME;
            setIsBreak(nextIsBreak);
            if (!nextIsBreak) {
              const newCompleted = completed + 1;
              setCompleted(newCompleted);
              localStorage.setItem("pomodoro-completed", newCompleted.toString());
            }
            return nextTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isBreak, completed]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const reset = () => {
    setIsRunning(false);
    setSeconds(isBreak ? BREAK_TIME : WORK_TIME);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url('/anh-gai.webp')",
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",

      color: "white",
      fontFamily: "sans-serif",
      padding: "2rem",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>StudyTimer 🍅</h1>
      <div style={{ fontSize: "5rem", fontFamily: "monospace", marginTop: "1rem" }}>
        {formatTime(seconds)}
      </div>
      <p style={{ fontSize: "1.5rem" }}>{isBreak ? "Giờ nghỉ" : "Giờ học"}</p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{
            fontSize: "1rem",
            padding: "0.5rem 1.5rem",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {isRunning ? "Dừng" : "Bắt đầu"}
        </button>
        <button
          onClick={reset}
          style={{
            fontSize: "1rem",
            padding: "0.5rem 1.5rem",
            backgroundColor: "#e5e7eb",
            color: "#111827",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Reset
        </button>
      </div>
      <div style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
        ✅ Số phiên Pomodoro hôm nay: <strong>{completed}</strong>
      </div>
    </div>
  );
}

export default App;