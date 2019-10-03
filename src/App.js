import React from 'react';

import OrderBook from './components/OrderBook';
import DepthControl from './components/DepthControl';
import ConnectButtons from './components/ConnectButtons';

import logo from './logo.svg';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ConnectButtons />
        <h2>Order Book</h2>
        <DepthControl />
        <OrderBook />
      </header>
    </div>
  );
}

export default App;
