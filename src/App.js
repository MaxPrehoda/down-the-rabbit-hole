import "./App.css";
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="absolute top-0">
          <h1 className="mt-4">Down the Rabbit Hole 🐇</h1>
          <p className="relative text-base max-h-[12px] overflow-none mt-1 pb-1 flex sm:pl-0 md:pl-8 lg:pl-16">
            Made with&nbsp;
            <span role="img" aria-label="heart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#6366f1
" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6366f1
" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>

            </span>&nbsp;
            by<a href="https://maxprehoda.info/" className="portfolio-link">&nbsp; Maxwell Prehoda</a>
          </p>
        </div>
        <div className="card bg-gray-800 rounded-md p-4 pt-6 mt-32 md:mt-28 lg:mt-12">
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
        <p className="text-3xl mb-6 mt-6">How can we find the rabbit without knowing it's initial position?</p>
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
        <button type="button" className="bg-indigo-500 rounded-md p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-6 h-6">
  <path strokeLineCap="round" strokeLineJoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
</svg>
</button>
      </div>
    );
  }
}

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({ clicked: true });
  };

  render() {
    let revealClass = this.state.clicked ? 'card bg-gray-800 rounded-md p-4' : 'card bg-gray-800 rounded-md p-4 blur-xl';
    let hiddenClass = this.state.clicked ? 'hidden' : 'absolute bg-indigo-500 rounded-md pl-3 pr-3 text-md -ml-28 z-10';
    return (
      <div className="pt-8 pl-12 pr-12">
      <button className={hiddenClass} onClick={this.handleClick}>Reveal Answer</button>
      <div className={revealClass}>
      <p className="text-xl max-w-full">
        As demonstarted above, If you know the rabbit's starting position is even you can start guessing holes from an even position and you will always find the rabbit on the first pass through. However, if you don't know where the rabbit is, look through the holes all the holes from hole 1. If you don't find the rabbit, then the rabbit is in an odd numbered hole, iterate through all holes again starting from hole 0, you are guranteed to find the rabbit.
      </p>
      <p className="text-sm pt-4">
        Example: You know the Rabbit starts at position 7, you can always find the rabbit by starting your look position at 1, and incrementing your guess by 1 each time. This is because position 7 in a zero based index is even and 1 is as well. You can use this same logic to solve the problem if you don't know where the rabbit starts you just have to check both evens and odds in the worst case scenario.
      </p>
      </div>
      </div>
    );
  }
}

// ========================================

export default App;
