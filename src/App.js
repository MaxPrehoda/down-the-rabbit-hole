import "./App.css";
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="absolute top-0">
          <h1 className="mt-4">Down the Rabbit Hole 🐇</h1>
          <p className="relative text-base max-h-[12px] overflow-none mt-1 pb-1">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by <a href="https://maxprehoda.info/" className="portfolio-link">Maxwell Prehoda</a>
          </p>
        </div>
        <div className="card bg-gray-800 rounded-md p-4 pt-6">
        <p className="mb-8 text-2xl top-0">
          When browsing coding videos on Youtube I came across a tricky coding
          interview question:
        </p>
        <p className="text-xl mb-8 max-w-fit">
          There are 100 holes 🕳️ in a line, and there's a rabbit 🐰 hiding in
          one of the holes. You can only look in one hole at a time, and every
          time you look in a hole, the rabbit jumps to either adjacent hole.
        </p>
        </div>
        <div className="card bg-gray-800 rounded-md -mt-6 pl-6 pr-6 mb-12">
        <p className="text-3xl mb-6 mt-6">How can we find the rabbit on the first pass every time?</p>
        </div>
        <Game />
        <p className="text-xl max-w-[75ch] mt-8">
          Try out both initial looking 🔍 positions and a few different initial rabbit 🐰 positions. Do you see a correlation between the rabbit being found and the indexes of both initial positions?
        </p>
        <Answer/>
      </header>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rabbitPos: 5,
      startPos: 1,
    };
    this.startStopButtonHandleCallback =
      this.startStopButtonHandleCallback.bind(this);
  }

  startStopButtonHandleCallback = (childData) => {
    let interval = setInterval(() => {
      let newRabbitPos = Math.min(
        Math.max(this.state.rabbitPos + (Math.random() > 0.5 ? 1 : -1), 0),
        25
      );
      let newStartPos = this.state.startPos + 1;
      this.setState({ rabbitPos: newRabbitPos, startPos: newStartPos });
      if (newRabbitPos === newStartPos) {
        clearInterval(interval);
      };
      if (newStartPos > newRabbitPos) {
        clearInterval(interval);
      }
    }, 1000);
  };

  startConfigHandleCallback = (childData) => {
    this.setState({ startPos: Number(childData) });
  };

  rabbitConfigHandleCallback = (childData) => {
    this.setState({ rabbitPos: Number(childData) });
  };

  render() {
    return (
      <div className="game">
        <div className="flex flex-row justify-center"><span className="bg-gray-800 p-3 rounded-md flex gap-10">
        <RabbitConfig className="pt- mt-0" parentCallback={this.rabbitConfigHandleCallback} />
        <StartStopButton
          className="pt- mt-0"
          parentCallback={this.startStopButtonHandleCallback}
        />
        <StartConfig className="pt- mt-0" parentCallback={this.startConfigHandleCallback} /></span>
        </div>
        <div className="game-board mt-4 mb-4 pl-6 pr-6">
          <Board
            lookPos={this.state.startPos}
            rabbitPos={this.state.rabbitPos}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function Square(props) {
  return <button className="square drop-shadow-lg">{props.type}</button>;
}

function Board(props) {
  /*   incrementGuess() {
    let newRabbitPos = this.rabbitPos + (Math.random() > 0.5 ? 1 : -1);
    this.setState({
      squares: Array(25).fill(null),
      rabbitPos: newRabbitPos,
      lookPos: this.state.lookPos + 1,
    });
  } */

  let status;
  let squares = Array(25)
    .fill(null)
    .map((val, idx) => {
      if (idx === props.lookPos & idx > props.rabbitPos) return "👎";
      if (idx === props.lookPos & idx === props.rabbitPos) return "🏁";
      if (idx === props.rabbitPos) return "🐰";
      if (idx === props.lookPos) return "🔍";
      return "🕳️";
    });
  if (props.rabbitPos === props.lookPos) {
    status = "You found the rabbit!";
  } else if (props.lookPos > props.rabbitPos) {
    status = "You didn't find the rabbit. It slipped by you!";
  } else {
    status = "You haven't found the rabbit yet...";
  }
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row mt-2">
        {squares.map((val, idx) => (
          <Square key={idx} type={val}></Square>
        ))}
      </div>
    </div>
  );
}

class StartConfig extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    this.props.parentCallback(event.target.value);
  }

  render() {
    return (
      <div className="mb-6 space-x-6" onChange={this.onChangeValue}>
        🔍 
        <input className="ml-2" type="radio" value="0" name="startPos" />0
        <input type="radio" value="1" name="startPos" />1
      </div>
    );
  }
}

class RabbitConfig extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    this.props.parentCallback(event.target.value);
  }

  render() {
    return (
      <div>
        🐰
        <input
          className="mb-6 text-black rounded-sm drop-shadow-lg"
          type="range"
          min="0"
          max="24"
          value={this.props.rabbitPos}
          onChange={this.onChangeValue}
        />
      </div>
    );
  }
}

class StartStopButton extends React.Component {
  constructor(props) {
    super(props);
    this.onTrigger = this.onTrigger.bind(this);
  }
  onTrigger = () => {
    this.props.parentCallback(true);
  };

  render() {
    return (
      <div className="mb-6 space-x-6" onClick={this.onTrigger}>
        <button type="button">▶️</button>
      </div>
    );
  }
}

class Answer extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    this.props.parentCallback(event.target.value);
  }

  render() {
    return (
      <div className="pt-8">
      <button className="absolute bg-indigo-600 rounded-md pl-3 pr-3 text-md -ml-28 z-10">Reveal Answer</button>
      <div className="card bg-gray-800 rounded-md p-4 blur-xl">
      <p className="text-xl max-w-full">
        There are 100 holes 🕳️ in a line, and there's a rabbit 🐰 hiding in
      </p>
      </div>
      </div>
    );
  }
}

// ========================================

export default App;
