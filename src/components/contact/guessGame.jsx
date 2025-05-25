import React, { useState, useEffect } from "react";
import "./styles/guessGame.css";

const GuessGame = () => {
  const [secretNumber, setSecretNumber] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100");
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize the game
  const initGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("Guess a number between 1 and 100");
    setAttempts(0);
    setGameWon(false);
    setGameStarted(true);
  };

  // Handle guess submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!gameStarted) {
      initGame();
      return;
    }
    
    if (gameWon) {
      initGame();
      return;
    }

    const userGuess = parseInt(guess);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage("Please enter a valid number between 1 and 100");
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === secretNumber) {
      setMessage(`🎉 Congratulations! You guessed the number in ${attempts + 1} attempts!`);
      setGameWon(true);
    } else if (userGuess < secretNumber) {
      setMessage("Too low! Try a higher number.");
    } else {
      setMessage("Too high! Try a lower number.");
    }

    setGuess("");
  };

  // Initialize game on component mount
  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className="guess-game-container">
      <h3 className="guess-game-title">Take a Break: Guess the Number</h3>
      <p className="guess-game-description">
        While you're here, why not play a quick game? I've selected a random number between 1 and 100.
        See if you can guess it!
      </p>
      
      <div className="guess-game-content">
        <p className="guess-message">{message}</p>
        
        <form onSubmit={handleSubmit} className="guess-form">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            min="1"
            max="100"
            className="guess-input"
          />
          <button type="submit" className="guess-button">
            {gameWon ? "Play Again" : gameStarted ? "Submit" : "Start Game"}
          </button>
        </form>
        
        {attempts > 0 && !gameWon && (
          <p className="guess-attempts">Attempts: {attempts}</p>
        )}
      </div>
    </div>
  );
};

export default GuessGame;
