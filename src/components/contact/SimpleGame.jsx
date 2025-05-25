import React, { useState, useEffect } from "react";
import "./styles/simpleGame.css";

const SimpleGame = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ top: 50, left: 50 });
  const [targetColor, setTargetColor] = useState("#4caf50");
  const [clickCount, setClickCount] = useState(0);
  
  const colors = ["#4caf50", "#2196f3", "#f44336", "#ff9800", "#9c27b0"];
  
  // Move the target to a random position
  const moveTarget = () => {
    const gameArea = document.querySelector(".simple-game-area");
    if (!gameArea) return;
    
    const maxTop = gameArea.offsetHeight - 30;
    const maxLeft = gameArea.offsetWidth - 30;
    
    setTargetPosition({
      top: Math.floor(Math.random() * maxTop),
      left: Math.floor(Math.random() * maxLeft)
    });
    
    // Change color every 3 clicks
    if (clickCount % 3 === 0) {
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setTargetColor(newColor);
    }
  };
  
  // Handle target click
  const handleTargetClick = () => {
    if (!gameActive) return;
    
    // Increase score
    const newScore = score + 1;
    setScore(newScore);
    
    // Update high score if needed
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("simpleGameHighScore", newScore.toString());
    }
    
    // Increment click count
    setClickCount(clickCount + 1);
    
    // Move target
    moveTarget();
  };
  
  // Start/stop game
  const toggleGame = () => {
    if (gameActive) {
      setGameActive(false);
    } else {
      setScore(0);
      setClickCount(0);
      setGameActive(true);
      moveTarget();
    }
  };
  
  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("simpleGameHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
  return (
    <div className="simple-game-container">
      <h3 className="simple-game-title">Quick Reflex Game</h3>
      <p className="simple-game-description">
        Click the colored dot as many times as you can. It moves faster as you progress!
      </p>
      
      <div className="simple-game-area">
        {gameActive && (
          <div 
            className="simple-game-target"
            style={{ 
              top: `${targetPosition.top}px`, 
              left: `${targetPosition.left}px`,
              backgroundColor: targetColor,
              transition: `all ${Math.max(0.5 - (score * 0.01), 0.1)}s ease-out`
            }}
            onClick={handleTargetClick}
          />
        )}
      </div>
      
      <div className="simple-game-controls">
        <div className="simple-game-score">
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
        </div>
        <button 
          className="simple-game-button"
          onClick={toggleGame}
        >
          {gameActive ? "Stop Game" : "Start Game"}
        </button>
      </div>
    </div>
  );
};

export default SimpleGame;
