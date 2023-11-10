import React from 'react';
import './App.css';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <h1>Cheeky Ai Chess</h1>

        <Game />
      </main>
    </div>
  );
}

export default App;
