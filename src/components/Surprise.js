import React, { useState, useEffect, useRef } from "react";
import "./Surprise.css";
import { FaPlay, FaPause } from "react-icons/fa";

const quotes = [
  "You deserve all the happiness!",
  "Enjoy your special day!",
  "Celebrate life’s little moments!",
  "Make today amazing!",
  "Smiles and surprises await!"
];

const heartsCount = 30;
const generateHearts = () =>
  Array.from({ length: heartsCount }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${18 + Math.random() * 30}px`,
    duration: `${4 + Math.random() * 3}s`,
    delay: `${Math.random() * 5}s`
  }));

const Surprise = () => {
  const [quote, setQuote] = useState("");
  const [hearts] = useState(generateHearts());
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="surprise-page">
      {/* Background Video */}
      <video
        className="bg-video"
        src="/bday.mp4"
        autoPlay
        loop
        
        playsInline
      ></video>

      {/* Floating Hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart"
          style={{
            left: h.left,
            fontSize: h.size,
            animationDuration: h.duration,
            animationDelay: h.delay
          }}
        >
          
        </span>
      ))}

      {/* Content Overlay */}
      <div className="surprise-content text-center">
        <h1 className="surprise-title">Happy Birthday Ayisha Mubeena</h1>

        <div className="letter-pad mt-4 p-4">
          <h2 className="letter-title">A Special Letter for You 💌</h2>
          <p className="letter-content">
            Dear Ayisha Mubeena,<br />
            Wishing you a day filled with love, laughter, and endless joy. 
            May all your dreams come true and every moment be as special as you are. 
            Keep shining and smiling, today and always!
          </p>
          <p className="surprise-quote">✨ {quote} ✨</p>
        </div>

        {/* Image Row */}
        <div className="image-row mt-5">
          <div className="surprise-img-container">
            <img src="/img1.jpg" alt="Surprise 1" className="surprise-img" />
          </div>
          <div className="surprise-img-container">
            <img src="/img2.jpg" alt="Surprise 2" className="surprise-img" />
          </div>
        </div>

        {/* Music Button */}
        <button className="music-btn mt-5" onClick={toggleMusic}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <audio ref={audioRef} src="/music.mp3" loop />
      </div>
    </div>
  );
};

export default Surprise;
