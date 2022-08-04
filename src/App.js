import logo from './logo.svg';
import './App.css';

import Button from  "./Button.js";
import Input from "./Input.js";
import React from 'react';
import Web3 from 'web3';
import { CASINO_ABI, CASINO_ADDRESS } from './config.js';
// const CONTRACT_JSON = require('../build/contracts/Casino.json');

export default class App extends React.Component {
  
  constructor(props) { 
    super(props);
    this.state = { 
      didWin: null,
      currAccountBalance: 0,
    };
  }
  componentWillMount() { 
    this.loadBlockchainData();
  }

  async loadBlockchainData() { 
    console.log(CASINO_ADDRESS);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
    console.log(accounts[0]);
    window.web3 = new Web3(window.ethereum);
    const casino = new window.web3.eth.Contract(CASINO_ABI, CASINO_ADDRESS);
    
    casino.events.BetProcessed()
      .on("data", this.handleBetProcessed)
      .on("error", console.error);

    casino.events.Withdraw()
      .on("data", this.handleWithdraw)
      .on("error", console.error)
    
    casino.events.Deposit()
      .on("data", this.handleDeposit)
      .on("error", console.error)

      casino.methods.isAddressRegistered(accounts[0]).call( (error, result) => { 
        if(!result) { 
          casino.methods.registerAddress().send({ from: accounts[0]});
        }
      });
      //const currAccountBalance = casino.methods.getBalance(accounts[0]).call();
      
      this.setState({ casino: casino, account: accounts[0] });
      this.updateAccountBalance();
    
  }
  makeBet(amount) { 
    this.state.casino.methods.takeBet(amount).send({ from: this.state.account });
  }  

  handleClick = () => this.makeBet(window.web3.utils.toWei('5', 'ether'));

  handleBetProcessed = event => { 
    const returnValues = event.returnValues;
    console.log(returnValues._didWin);
    this.setState({ didWin: returnValues._didWin});
    this.updateAccountBalance();
  }

  handleWithdraw = event => { 
    this.updateAccountBalance();
  }
  handleDeposit = event => { 
    this.updateAccountBalance();
  }

  didWinToFace = () => { 
    if(this.state.didWin === null) return ':|';
    return this.state.didWin ? ':)' : ':(';
  }
  updateAccountBalance() {
    // this.state.casino.methods.getBalance(this.state.account).call().toString()
    // const newAccountBalance = 
    this.state.casino.methods.getBalance(this.state.account).call()
    .then(value => console.log(value));
    // this.setState({ currAccountBalance: newAccountBalance });
  }
  depositEth = () => { 
    this.state.casino.methods.deposit().send({ from: this.state.account, value: window.web3.utils.toWei('10', 'ether')});
  }
  withdrawAllEth = () => { 
    const totalEth = this.state.casino.methods.getBalance(this.state.account).call();
    this.state.casino.methods.withdraw(totalEth).send({ from: this.state.account});
  }
  render () {
    return (
    <div className="App">
      <header className="App-header">
      <Button onClick={this.handleClick} text={this.didWinToFace()}/>
        <p>{this.state.currAccountBalance}</p>
        <Button onClick={this.depositEth} text="deposit 10 eth" />
        <Button onClick={this.withdrawAllEth} text="withdraw all eth" />
      </header>
    </div>
    );
  };
}

