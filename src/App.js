import logo from './logo.svg';
import './App.css';
import './index.js'
import StartFilters from './StartFilters';
import Holes from './Holes.js'
import React, {useState} from 'react';

function App() {
  const [holeStatus, setHoles] = useState([{start:0,rabbit:50}]);
  return (
    <div className="App">
      <header className="App-header">
        <div className='absolute top-0 mt-8'>
        <h1>
          Down the Rabbit Hole 🐇
        </h1><p className='mt-2 text-base'>Made with <span role="img" aria-label="heart">❤️</span> and <span role="img" aria-label="react-logo"><img src={logo} className="App-logo w-9 -ml-1 -mr-1 mb-0.5 inline-block" alt="logo" /></span> by <a href="https://maxprehoda.info/">Maxwell Prehoda</a></p>
      </div>

      <p className='mb-12 text-3xl'>When browsing coding videos on Youtube I came across a tricky coding interview question:</p>
        <p className='text-xl max-w-[75ch] mb-96'>

There are 100 holes 🕳️ in a line, and there's a rabbit 🐰 hiding in one of the holes

You can only look in one hole at a time, and every time you look in a hole, the rabbit jumps to an adjacent hole. Find the rabbit

A good solution finds the right algorithm with the best time complexity, bonus points for providing the exact number of worst case searches for 100 holes

If we move through the holes by checking them sequentially from the first hole, the rabbit could jump back when we check the hole next to it, thereby slipping past us.</p></header>
      <section className="App-section">
        <StartFilters />
        <Holes holesStatus={holeStatus}/>
      </section>
    </div>
  );
  
}

export default App;
