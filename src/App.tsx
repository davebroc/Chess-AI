import React from 'react';
import './App.css';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <div id="myBoard" ></div>

        <Game />
      </main>
    </div>
  );
}

export default App;
