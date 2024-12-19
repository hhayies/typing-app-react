import { useState } from "react";
import Start from "./Start";
import Game from "./Game";
import Result from "./Results";
import words from "../data/words";


const Typing = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [questionRemaining, setQuestionRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [userInput, setUserInput] = useState("");

  const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const displayNewWord = () => {
		setCurrentWord(getRandomWord());
		setUserInput("");
	};

  const startGame = () => {
		setScore(0);
		setIsGameStarted(true);
		setIsGameOver(false);
    setMistakeCount(0);
		displayNewWord();
	};

  const endGameSequence = () => {
    setIsGameStarted(false);
    setIsGameOver(true);
  };

  const handleRetry = () => {
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  const handleMistakes = () => {
    setQuestionRemaining(questionRemaining - 1);
    if (questionRemaining > 0) {
      displayNewWord();
      setMistakeCount(mistakeCount + 1);
    } else {
      endGameSequence();
    }
  }

  const handleCorrect = () => {
    setScore(score + 1);
    setQuestionRemaining(questionRemaining - 1);
    if (questionRemaining > 0) {
      displayNewWord();
    } else {
      endGameSequence();
    }
  }

  const handleInputChange = (e) => {
    const userInputValue = e.target.value;
    setUserInput(userInputValue);
    let mistakes = 0;

    for (let i = 0; i < userInputValue.length; i++) {
      if (userInputValue[i] !== currentWord.roman[i]) {
        mistakes++;
      }
    }

    if (mistakes >= 2) {
      handleMistakes();
    } else if (userInputValue === currentWord.roman) {
      handleCorrect();
    }
  };

  return (
    <div id="gameContainer">
      {!isGameStarted && !isGameOver &&
      <Start 
        isGameStarted={isGameStarted}
        isGameOver={isGameOver}
        startGame={startGame}
        setQuestionRemaining={setQuestionRemaining}
      />}
      {isGameStarted && 
      <Game
        isGameStarted={isGameStarted}
        currentWord={currentWord}
        userInput={userInput}
        handleInputChange={handleInputChange}
        score={score}
        questionRemaining={questionRemaining}
      />}
      {isGameOver && 
      <Result
        score={score}
        mistakeCount={mistakeCount}
        handleRetry={handleRetry}
      />}
    </div>
  );
};

export default Typing;
