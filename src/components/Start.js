import { useState } from "react";

const Start = (props) => {
	const [questionLimit, setQuestionLimit] = useState(10);
  return (
    <>
      <div id="header">
        <h1>タイピングゲーム</h1>
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbD3SuxLoCGJyFOlF3MnAuhkXhfAnVYJGBcmzyN3vSFd9KXe6DHeNb64ob4kYN4z2ymyhEPw34exuVkqZKJJca5ojHTgxRcFhoi_iL-hUU5_tU5KP0suUJ-6ZR9rKN3PMISMqJ9FH0LCxg/s800/computer_typing_hayai.png"
          alt="タイピングゲーム"
        />
      </div>
      <p id="subText">プログラミングに挑戦してみよう！</p>

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
        <button
          type="button"
          id="startButton"
          className="button"
          onClick={() => {
            props.startGame();
            props.setQuestionRemaining(questionLimit);
          }}
        >
          開始
        </button>
      </div>
    </>
  );
};

export default Start;
