import logo from '../logo.svg';
import './App.css';

import Button from  "./Button.js";
import Input from "./Input.js";
import useAccounts from '../hooks/useAccounts';
import useCasino from '../hooks/useCasino';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { CASINO_ABI, CASINO_ADDRESS } from './config.js';
// const CONTRACT_JSON = require('../build/contracts/Casino.json');

function App() {
  
//  const provider = useProvider();
//  const web3 = useWeb3(provider);
 const casino = useCasino(CASINO_ABI, CASINO_ADDRESS);
 const accounts = useAccounts();
 
  const [didWin, setDidWin] = useState(null);
  const [currAccountBalance, setCurrAccountBalance] = useState(0);
  
    


  // const loadBlockchainData = async () => { 
  //   console.log(CASINO_ADDRESS);
  //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
  //   console.log(accounts[0]);
  //   window.web3 = new Web3(window.ethereum);
  //   const casino = new window.web3.eth.Contract(CASINO_ABI, CASINO_ADDRESS);
    
  //   casino.events.BetProcessed()
  //     .on("data", this.handleBetProcessed)
  //     .on("error", console.error);

  //   casino.events.Withdraw()
  //     .on("data", this.handleWithdraw)
  //     .on("error", console.error)
    
  //   casino.events.Deposit()
  //     .on("data", this.handleDeposit)
  //     .on("error", console.error)

  //     casino.methods.isAddressRegistered(accounts[0]).call( (error, result) => { 
  //       if(!result) { 
  //         casino.methods.registerAddress().send({ from: accounts[0]});
  //       }
  //     });
  //     //const currAccountBalance = casino.methods.getBalance(accounts[0]).call();
  //     const currAccountBalance = await casino.methods.getBalance(accounts[0]).call();
  //     this.setState({ 
  //       casino: casino, account: accounts[0],
  //       currAccountBalance: window.web3.utils.fromWei(currAccountBalance, 'ether'),
  //     });
  //     //this.updateAccountBalance();
    
  // }
  // makeBet(amount) { 
  //   this.state.casino.methods.takeBet(amount).send({ from: this.state.account });
  // }  

  // const handleClick = () => this.makeBet(window.web3.utils.toWei('5', 'ether'));

  // const handleBetProcessed = event => { 
  //   const returnValues = event.returnValues;
  //   console.log(returnValues._didWin);
  //   setDidWin(returnValues._didWin);
  //   updateAccountBalance();
  // }

  // const handleWithdraw = event => { 
  //   this.updateAccountBalance();
  // }
  // const handleDeposit = event => { 
  //   this.updateAccountBalance();
  // }

  // const didWinToFace = () => { 
  //   if(this.state.didWin === null) return ':|';
  //   return this.state.didWin ? ':)' : ':(';
  // }
  // const currAccountBalanceEth = () => { 
    
  //   return window.web3.utils.toWei('1', 'ether');
  // }
  // const updateAccountBalance= () => {
  //   // this.state.casino.methods.getBalance(this.state.account).call().toString()
  //   // const newAccountBalance = 
  //   this.state.casino.methods.getBalance(this.state.account).call()
  //   .then(value => this.setState({ currAccountBalance: window.web3.utils.fromWei(value, 'ether') }));
  //   // this.setState({ currAccountBalance: newAccountBalance });
  // }
  // const depositEth = () => { 
  //   this.state.casino.methods.deposit().send({ from: this.state.account, value: window.web3.utils.toWei('10', 'ether')});
  // }
  // const withdrawAllEth = () => { 
  //   this.state.casino.methods.getBalance(this.state.account).call().then(
  //     value => this.state.casino.methods.withdraw(value).send({ from: this.state.account})
  //   );
    
  // }
  
    return (
    <div className="App">
      <header className="App-header">
        <p>{accounts[0]}</p>
      {/* <Button onClick={this.handleClick} text={this.didWinToFace()}/>
        <p>current balance: {this.state.currAccountBalance} ETH</p>
        <Button onClick={this.depositEth} text="deposit 10 eth" />
        <Button onClick={this.withdrawAllEth} text="withdraw all eth" /> */}
      </header>
    </div>
    );
  
};
export default App;

