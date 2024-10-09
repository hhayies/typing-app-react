import { useState } from "react";
import words from "../data/words"

const Typing = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentWord, setCurrentWord] = useState({});
  const [userInput, setUserInput] = useState("");
  const [mistakeCount, setMistakeCount] = useState(0);
  const [questionRemaining, setQuestionRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const [questionLimit, setQuestionLimit] = useState(10);

  const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const displayNewWord = () => {
    setCurrentWord(getRandomWord());
    setUserInput("");
    setMistakeCount(0);
  };

  const startGame = () => {
    setScore(0);
    setQuestionRemaining(questionLimit);
    setIsGameStarted(true);
    setIsGameOver(false);
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
      setQuestionRemaining(questionRemaining - 1);
      if (questionRemaining > 0) {
        displayNewWord();
        setMistakeCount(mistakeCount + 1);
      } else {
        endGameSequence();
      }
    } else if (userInputValue === currentWord.roman) {
      setScore(score + 1);
      setQuestionRemaining(questionRemaining - 1);
      if (questionRemaining > 0) {
        displayNewWord();
      } else {
        endGameSequence();
      }
    }
  };

  return (
    <div id="gameContainer">
      <div id="header">
        <h1>タイピングゲーム</h1>
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbD3SuxLoCGJyFOlF3MnAuhkXhfAnVYJGBcmzyN3vSFd9KXe6DHeNb64ob4kYN4z2ymyhEPw34exuVkqZKJJca5ojHTgxRcFhoi_iL-hUU5_tU5KP0suUJ-6ZR9rKN3PMISMqJ9FH0LCxg/s800/computer_typing_hayai.png"
          alt="タイピングゲーム"
        />
      </div>
      <p id="subText">プログラミングに挑戦してみよう！</p>
      {!isGameStarted && !isGameOver && (
        <div id="settings" className="card">
          <label htmlFor="questionSelect">出題数を選んでください:</label>
          <div className="select-box">
            <select
              id="questionSelect"
              value={questionLimit}
              onChange={(e) => setQuestionLimit(Number(e.target.value))}
            >
              <option value="10">10問</option>
              <option value="20">20問</option>
              <option value="30">30問</option>
            </select>
          </div>
          <button type="button" id="startButton" className="button" onClick={startGame}>
            開始
          </button>
        </div>
      )}
      {isGameStarted && (
        <div id="game" className="card">
          <div id="wordDisplay">{currentWord.japanese}</div>
          <div id="romanDisplay">{currentWord.roman}</div>
          <input
            type="text"
            id="userInput"
            placeholder="ここにタイピングしてください"
            value={userInput}
            onChange={handleInputChange}
          />
          <div id="score">スコア: {score}</div>
          <div id="questionCount">残りの出題数: {questionRemaining}</div>
        </div>
      )}
      {isGameOver && (
        <div id="endGame" className="card">
          <div id="finalScore">
            あなたのスコアは
            <span id="correctAnswers">{score}</span> 点 /{" "}
            <span id="totalQuestions">{questionLimit}</span> 問でした。
          </div>
          <p>間違った数: {mistakeCount}</p>
          <button id="retryButton" className="button" onClick={handleRetry}>
            再チャレンジ
          </button>
        </div>
      )}
    </div>
  );
};

export default Typing;
