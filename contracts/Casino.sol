//SPDX-License-Identifier:MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Casino is Ownable {

    uint private randNonce;
    uint private balance = 0;
    mapping(address => uint) private balances;
    mapping(address => bool) private isRegistered;
    event BetProcessed(address indexed _better, bool _didWin, uint _value);
    event Registration(address indexed _registeredAddress);
    event Deposit(address indexed _address, uint _amount);
    event Withdraw(address indexed _address, uint _amount);

    constructor() Ownable() {
        randNonce = 0;
    }
    modifier addressIsRegistered(address _address) { 
        require(isRegistered[_address], "Address is not registered!");
        _;
    }
    modifier contractBalanceSufficient(uint _amount) { 
        require(balance >= _amount, "contract balance is too low to perform this action!");
        _;
    }
    modifier addressBalanceSufficient(address _address, uint _amount) { 
        require(balances[_address] >= _amount, "balance of address is too low for that action!");
        _;
    }
    function registerAddress() public { 
        isRegistered[msg.sender] = true;
        balances[msg.sender] = 0;
    }
    function isAddressRegistered(address _address) public view returns(bool) { 
        return isRegistered[_address];
    }
    function getBalance(address _address) public view addressIsRegistered(_address) returns(uint) { 
        return(balances[_address]);
    }

    function deposit() public payable addressIsRegistered(msg.sender) { 
            balances[msg.sender] += msg.value;
            balance += msg.value;
            emit Deposit(msg.sender, msg.value);
    }
    function takeBet(uint _amount) public addressIsRegistered(msg.sender) contractBalanceSufficient(_amount) addressBalanceSufficient(msg.sender, _amount) { 
        bool _didWin = false;
        if(randMod(20) > 10) { 
            balances[msg.sender] += _amount;            
            _didWin = true;
        }else { 
            balances[msg.sender] -= _amount;
        }
        emit BetProcessed(msg.sender, _didWin, _amount);
    }

    receive() external payable { 
        balance += msg.value;
    }

    
    function ownerWithdraw(uint _amount) public onlyOwner() contractBalanceSufficient(_amount) { 
        payable(owner()).transfer(_amount);
        balance -= _amount;
    }

    function withdraw(uint _amount) public addressIsRegistered(msg.sender) contractBalanceSufficient(_amount) addressBalanceSufficient(msg.sender, _amount) {
        balances[msg.sender] -= _amount;
        balance -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdraw(msg.sender, _amount);
    }


    //TODO replace randMod with an orcalised random function
    function randMod(uint _modulus) internal returns(uint) {
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
    }
}