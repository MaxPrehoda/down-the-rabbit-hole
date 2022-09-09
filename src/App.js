import "./App.css";
import React from "react";
import { CSSTransition } from "react-transition-group";


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
" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6366f1
" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </span>&nbsp;
            by<a href="https://maxprehoda.info/" className="portfolio-link">&nbsp; <span className="bg-surface-2 p-1 rounded-md">Maxwell Prehoda</span></a>
          </p>
        </div>
        <div className="card bg-surface-2 rounded-md p-4 pt-6 ml-12 mr-12 mt-24 md:mt-28 lg:mt-18">
          <p className="mb-2 text-2xl top-0">
            There are 100 holes 🕳️ in a line, and there's a rabbit 🐰 hiding in
            one of the holes. You can only look in one hole at a time, and every
            time you look in a hole, the rabbit jumps to either adjacent hole.
          </p>
        </div>
        <div className="card bg-surface-2 rounded-md -mt-6 pl-6 pr-6 mb-12 ml-12 mr-12">
          <p className="text-3xl mb-6 mt-6 pt-3 text-indigo-500">How can we find the rabbit without knowing its initial position?</p>
        </div>
        <div className="flex flex-col lg:flex-row relative ml-12 mr-12">
          <div className="card step1 bg-surface-2 rounded-md p-4 pt-0 md:ml-1 md:mr-1 xl:ml-5 xl:mr-5 mb-8 lg:mb-4 flex flex-col"><span className="text-md">Step 1.</span><span className="w-[300px] text-sm">Select an initial hole for the rabbit to hide in using the slider below.</span></div>
          <div className="card step2 bg-surface-2 rounded-md p-4 pt-0 md:ml-1 md:mr-1 xl:ml-5 xl:mr-5 mb-8 lg:mb-4 flex flex-col"><span className="text-md">Step 2.</span><span className="w-[300px] text-sm">Select an odd or even initial hole to start looking for the rabbit from below.</span></div>
          <div className="card step3 bg-surface-2 rounded-md p-4 pt-0 md:ml-1 md:mr-1 xl:ml-5 xl:mr-5 mb-2 lg:mb-4 flex flex-col"><span className="text-md">Step 3.</span><span className="w-[300px] text-sm">Press start below to begin guessing holes sequentially.</span></div>
        </div>
        <Game />
        <p className="text-xl max-w-[75ch] mt-8">
          Try out both initial looking 🔍 positions and a few different initial rabbit 🐰 positions. Do you see a correlation between the parity of both initial positions and finding the rabbit? How does this help us find the rabbit when we don't choose it's initial position?
        </p>
        <Answer />
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
      disabledConfigs: false
    };
    this.startStopButtonHandleCallback =
      this.startStopButtonHandleCallback.bind(this);
  }

  startStopButtonHandleCallback = (childData) => {
    this.setState({ disabledConfigs: true });
    let interval = setInterval(() => {
      let newRabbitPos = Math.min(
        Math.max(this.state.rabbitPos + (Math.random() > 0.5 ? 1 : -1), 0),
        29
      );
      if (this.state.rabbitPos === 29) {
        newRabbitPos = 28;
      }
      let newStartPos = this.state.startPos + 1;
      this.setState({ rabbitPos: newRabbitPos, startPos: newStartPos });
      if (newRabbitPos === newStartPos) {
        clearInterval(interval);
        this.setState({ disabledConfigs: false });
      };
      if (newStartPos > newRabbitPos) {
        clearInterval(interval);
        this.setState({ disabledConfigs: false });
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
    console.log(this.state);
    return (
      <div className="game w-[360px] sm:w-[620px] md:w-[740px] lg:w-[950px] xl:w-[1200px]">
        <div className="flex justify-center ml-4 mr-4"><span className="bg-transparent p-3 pt-8 pb-8 rounded-md flex flex-col ml-8 mr-8 gap-8 lg:flex-row lg:gap-6 md:gap-10">
          <RabbitConfig className="mt-0" disabledConfigs={this.state.disabledConfigs} rabbitPos={this.state.rabbitPos} parentCallback={this.rabbitConfigHandleCallback} />
          <StartConfig className="mt-0" parentCallback={this.startConfigHandleCallback} disabledConfigs={this.state.disabledConfigs} lookPos={this.state.startPos} /><StartStopButton
            className='mt-0'
            parentCallback={this.startStopButtonHandleCallback} disabledConfigs={this.state.disabledConfigs}
          /></span>
        </div>
        <div className="game-board mt-4 mb-4">
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
  let squares = Array(30)
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
      <div className="status text-indigo-500 border-4 border-surface-4 rounded-md ml-28 mr-28 sm:ml-44 sm:mr-44 2xl:ml-96 2xl:mr-96 mb-12">{status}</div>
      <div className="board-row mt-2 w-[300px] sm:w-[620px] md:w-[740px] lg:w-[950px] xl:w-[1200px] m-auto">
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
      <div className={this.props.disabledConfigs === false ? "card step2 bg-surface-2 pl-3 pr-3 pt-8 pb-8 rounded-md m-auto" : "card step2 bg-surface-2 pl-3 pr-3 pt-8 pb-8 rounded-md m-auto disabled"}>
        <div className="space-x-5 flex gap-2.5 text-2xl" onChange={this.onChangeValue}>
          <input disabled={this.props.disabledConfigs} className="" type="radio" value="0" name="startPos" />odd
          <input disabled={this.props.disabledConfigs} type="radio" value="1" name="startPos" />even
        </div>
      </div >
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
    let even_odd = this.props.rabbitPos % 2 !== 0 ? "(0 based even)" : "(0 based odd)"
    return (
      <div className={this.props.disabledConfigs === false ? "card step1 rounded-md bg-surface-2 pb-2 pt-2 m-auto" : "card step1 rounded-md bg-surface-2 pb-2 pt-2 m-auto disabled"}>
        <div className="relative flex"><div className="w-[40px] pt-6 lg:pt-3 lg:pb-3 lg:pl-3">🐰</div><div className="w-[35px] lg:w-[60px] bg-surface rounded-lg lg:pl-5 lg:pr-0.5 pt-6 lg:pt-4 pb-4">{this.props.disabledConfigs ? "0" : this.props.rabbitPos}&nbsp;
        </div><input
            className="text-black rounded-sm drop-shadow-lg ml-2"
            type="range"
            min="0"
            max="29"
            value={this.props.disabledConfigs ? "0" : this.props.rabbitPos}
            onChange={this.onChangeValue}
            disabled={this.props.disabledConfigs}
          /><div className="text-sm w-[135px] lg:ml-2 pt-8 pb-8">{this.props.disabledConfigs ? "process running" : even_odd}</div>
        </div>
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
      <div className={this.props.disabledConfigs === false ? "card step3 bg-surface-2 pl-6 pr-6 pt-7 pb-4 rounded-md w-[100px] m-auto lg:w-full lg:m-0" : "card step3 bg-surface-2 pl-6 pr-6 pt-7 pb-4 rounded-md w-[100px] m-auto lg:w-full lg:m-0 disabled"}>
        <div className="space-x-6" onClick={this.onTrigger}>
          <button type="button" disabled={this.props.disabledConfigs} className="bg-indigo-500 rounded-md p-2 pl-2.5 mb-3 lg:mb-0 border-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-6 h-6">
            <path strokeLineCap="round" strokeLineJoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          </button>
        </div>
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
    let revealClass = this.state.clicked ? 'card bg-surface-2 rounded-md p-4' : 'card bg-surface-2 rounded-md p-4 blur-xl';
    let hiddenClass = this.state.clicked ? 'hidden' : 'absolute bg-indigo-500 rounded-md pl-6 pr-6 text-md -ml-36 sm:-ml-32 z-10 customText mt-20 border-0';
    return (
      <div className="pt-8 pl-12 pr-12 pb-10">
        <button className={hiddenClass} onClick={this.handleClick}>Reveal Answer</button>
        <div className={revealClass}>
          <p className="text-xl max-w-full">
            As you might have discovered from the demonstration above, if you know the rabbit's starting position is even you should start guessing holes from an even position as you will always find the rabbit on the first pass through. However, if you don't know where the rabbit is, look through all the holes from hole 1 (even). If you don't find the rabbit, then the rabbit is in an odd-numbered hole, iterate through all holes again starting from hole 0 (odd), and you are guaranteed to find the rabbit.      </p>
          <p className="text-sm pt-4">
            Example: You know the Rabbit starts at position 7, you can always find the rabbit by starting your look position at 1, and incrementing your guess by 1 each time. This is because position 7 in a zero-based index is even and 1 is as well. You can use this same logic to solve the problem if you don't know where the rabbit starts, you'll just have to check both evens and odds in the worst-case scenario.
          </p>
        </div>
      </div>
    );
  }
}

// ========================================

export default App;
