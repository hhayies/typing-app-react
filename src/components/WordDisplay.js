import { useReducer } from "react";
import Start from "./Start";
import Game from "./Game";
import Result from "./Results";
import words from "../data/words";

const initialState = {
  isGameStarted: false,
  questionRemaining: 0,
  score: 0,
  isGameOver: false,
  mistakeCount: 0,
  currentWord: {},
  userInput: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        isGameStarted: true,
        questionRemaining: action.payload,
      };
    case "END_GAME":
      return { ...state, isGameStarted: false, isGameOver: true };
    case "UPDATE_USER_INPUT":
      return { ...state, userInput: action.payload };
    case "CORRECT_INPUT":
      return {
        ...state,
        score: state.score + 1,
        questionRemaining: state.questionRemaining - 1,
        userInput: "",
      };
    case "WRONG_INPUT":
      return {
        ...state,
        mistakeCount: state.mistakeCount + 1,
        questionRemaining: state.questionRemaining - 1,
        userInput: "",
      };
    case "SET_NEW_WORD":
      return { ...state, currentWord: action.payload };
    case "RETRY_GAME":
      return initialState;
    default:
      return state;
  }
};

const Typing = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isGameStarted, questionRemaining, score, isGameOver, mistakeCount, currentWord, userInput } = state;

  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

  const displayNewWord = () => {
    dispatch({ type: "SET_NEW_WORD", payload: getRandomWord() });
  };

  const startGame = (questionLimit) => {
    dispatch({ type: "START_GAME", payload: questionLimit });
    displayNewWord();
  };

  const handleInputChange = (e) => {
    const userInputValue = e.target.value;
    dispatch({ type: "UPDATE_USER_INPUT", payload: userInputValue });

    const mistakes = countMistakes(userInputValue);

    if (mistakes >= 2) {
      if (questionRemaining > 1) {
        displayNewWord();
        dispatch({ type: "WRONG_INPUT" });
      } else {
        dispatch({ type: "END_GAME" });
      }
    } else if (userInputValue === currentWord.roman) {
      if (questionRemaining > 1) {
        displayNewWord();
        dispatch({ type: "CORRECT_INPUT" });
      } else {
        dispatch({ type: "END_GAME" });
      }
    }
  };

  const countMistakes = (input) => {
    let mistakes = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== currentWord.roman[i]) {
        mistakes++;
      }
    }
    return mistakes;
  };

  const handleRetry = () => {
    dispatch({ type: "RETRY_GAME" });
  };

  return (
    <div id="gameContainer">
      {!isGameStarted && !isGameOver && (
        <Start 
          isGameStarted={isGameStarted}
          isGameOver={isGameOver}
          startGame={startGame}
          setQuestionRemaining={(limit) => dispatch({ type: "START_GAME", payload: limit })}
        />
      )}
      {isGameStarted && (
        <Game
          isGameStarted={isGameStarted}
          currentWord={currentWord}
          userInput={userInput}
          handleInputChange={handleInputChange}
          score={score}
          questionRemaining={questionRemaining}
        />
      )}
      {isGameOver && (
        <Result
          score={score}
          mistakeCount={mistakeCount}
          handleRetry={handleRetry}
        />
      )}
    </div>
  );
};

export default Typing;
