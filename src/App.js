import React, { useState } from "react";
import "./App.css";

function App() {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  // Generate a random number between 1 and 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Handle user input
  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  // Check the user's guess
  const handleGuess = () => {
    if (gameOver) return;

    const numberGuess = parseInt(guess, 10);

    if (isNaN(numberGuess) || numberGuess < 1 || numberGuess > 100) {
      setFeedback("Please enter a valid number between 1 and 100.");
      return;
    }

    if (numberGuess === secretNumber) {
      setFeedback("🎉 Congratulations! You win!");
      setGameOver(true);
    } else if (numberGuess < secretNumber) {
      setFeedback("Too low! Try again.");
    } else {
      setFeedback("Too high! Try again.");
    }

    setAttemptsLeft((prev) => prev - 1);

    if (attemptsLeft - 1 === 0 && numberGuess !== secretNumber) {
      setFeedback(`Game Over! The number was ${secretNumber}.`);
      setGameOver(true);
    }

    setGuess(""); // Clear input
  };

  // Restart the game
  const restartGame = () => {
    setSecretNumber(generateRandomNumber());
    setGuess("");
    setFeedback("");
    setAttemptsLeft(10);
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>🎲 Number Guesser Game 🎲</h1>
      <p>Guess the number between 1 and 100!</p>
      <p>Attempts Left: {attemptsLeft}</p>
      <p>{feedback}</p>
      {!gameOver && (
        <>
          <input
            type="number"
            value={guess}
            onChange={handleInputChange}
            placeholder="Enter your guess"
            disabled={gameOver}
          />
          <button onClick={handleGuess} disabled={gameOver}>
            Submit Guess
          </button>
        </>
      )}
      {gameOver && <button onClick={restartGame}>Play Again</button>}
    </div>
  );
}

export default App;
