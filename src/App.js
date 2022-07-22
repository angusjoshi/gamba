import logo from './logo.svg';
import './App.css';

import Button from  "./Button.js";
import React from 'react';
import makeBet from './Casino.js';

export default class App extends React.Component {
  
  handleClick = () => makeBet();
  render () {
    return (
    <div className="App">
      <header className="App-header">
        <Button onClick={this.handleClick}/>
      </header>
    </div>
    );
  };
}

