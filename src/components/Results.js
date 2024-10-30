const Result = (props) => {
  return (
    <>
      <div id="endGame" className="card">
        <div id="finalScore">
          あなたのスコアは
          <span id="correctAnswers">{props.score}</span> 点 /{" "}
        </div>
        <p>間違った数: {props.mistakeCount}</p>
        <button id="retryButton" className="button" onClick={props.handleRetry}>
          再チャレンジ
        </button>
      </div>
    </>
  );
};

export default Result;
