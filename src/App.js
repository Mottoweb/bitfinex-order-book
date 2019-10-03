import React from 'react';
import { Button } from '@blueprintjs/core';

import logo from './logo.svg';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload!.
        </p>
        <Button intent="success" text="button content" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
