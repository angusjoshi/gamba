import logo from './logo.svg';
import './App.css';

import Button from  "./Button.js";
import React from 'react';
import Web3 from 'web3';
import { CASINO_ABI, CASINO_ADDRESS } from './config.js';
// const CONTRACT_JSON = require('../build/contracts/Casino.json');

export default class App extends React.Component {
  

  componentWillMount() { 
    this.loadBlockchainData();
  }

  async loadBlockchainData() { 
    console.log(CASINO_ADDRESS);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
    console.log(accounts[0]);
    window.web3 = new Web3(window.ethereum);

    // const web3 = new Web3(Web3.givenProvider);
    const casino = new window.web3.eth.Contract(CASINO_ABI, CASINO_ADDRESS);
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts[6]);
    this.setState({ casino: casino, account: accounts[0] });
    //casino.methods.takeBet().send({value: window.web3.utils.toWei('5', 'ether'), from: accounts[0]});
    this.state.casino.events.BetProcessed()
      .on("data", (event) => { 
        const asdf = event.returnValues;
        console.log(asdf._didWin);
      })
      .on("error", console.error);
    
  }
  makeBet() { 
    this.state.casino.methods.takeBet().send({value: window.web3.utils.toWei('5', 'ether'), from: this.state.account});
  }  

  handleClick = () => this.makeBet();

 
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

