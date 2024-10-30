const Game = (props) => {
  return (
    <>
      <div id="game" className="card">
        <div id="wordDisplay">{props.currentWord.japanese}</div>
        <div id="romanDisplay">{props.currentWord.roman}</div>
        <input
          type="text"
          id="userInput"
          placeholder="ここにタイピングしてください"
          value={props.userInput}
          onChange={props.handleInputChange}
        />
        <div id="score">スコア: {props.score}</div>
        <div id="questionCount">残りの出題数: {props.questionRemaining}</div>
      </div>
    </>
  );
};

export default Game;
