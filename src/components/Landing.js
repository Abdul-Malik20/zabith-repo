import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import "./Landing.css";

const quotes = [
  "Love surrounds you, Ayisha!",
  "Today is your magical day!",
  "Dream big, shine bright!",
  "Happiness blooms in your smile!",
  "Every moment is beautiful with love!"
];

const generateHearts = () => {
  return Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 95}%`,
      animationDuration: `${6 + Math.random() * 6}s`,
      fontSize: `${12 + Math.random() * 25}px`,
      opacity: 0.7 + Math.random() * 0.3
    }
  }));
};

const Landing = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({});
  const [quote, setQuote] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts] = useState(generateHearts());
  const audioRef = useRef(null);
  const [showSurprise, setShowSurprise] = useState(false);
  const [fadeQuote, setFadeQuote] = useState(true);

  // Random quote every 5 seconds
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const interval = setInterval(() => {
      setFadeQuote(false);
      setTimeout(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setFadeQuote(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const birthday = new Date("2025-09-24T00:00:00");
    const timer = setInterval(() => {
      const diff = birthday - new Date();
      if (diff <= 0) {
        clearInterval(timer);
        setShowSurprise(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="landing-hero">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <span key={heart.id} className="floating-heart" style={heart.style}>❤️</span>
      ))}

      <h1 className="hero-name">Ayisha Mubeena</h1>
      <h3 className="hero-dob">24 - 09 - 2025</h3>

      {/* Countdown */}
      <div className="countdown">
        {!showSurprise && (
          <>
            <div>{timeLeft.days}<span>Days</span></div>
            <div>{timeLeft.hours}<span>Hours</span></div>
            <div>{timeLeft.minutes}<span>Mins</span></div>
            <div>{timeLeft.seconds}<span>Secs</span></div>
          </>
        )}
      </div>

      {/* Surprise Button */}
      <button
        className={`surprise-btn ${showSurprise ? "active" : "locked"}`}
        disabled={!showSurprise}
        onClick={() => navigate("/surprise")}
      >
        {showSurprise ? "🎁 Unlocked" : "🔒 Locked - Click on your Birthday Ayisha ; ) "}
      </button>

      {/* Quotes */}
      <p className={`quote ${fadeQuote ? "fade-in" : "fade-out"}`}>{quote}</p>

      {/* Music Toggle */}
      <button className="music-btn" onClick={toggleMusic}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <audio ref={audioRef} src="/music.mp3" loop />
    </div>


  );
}

export default Landing;
