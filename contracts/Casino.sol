// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "./GambaCoin.sol";

contract Casino {
    uint private randNonce = 0;
    uint public balance = 0;
    GambaCoin public gambaCoin;
    address owner;
    event BetProcessed(address indexed _better, bool _didWin, uint _value);

    constructor(address _gambaCoinAddress) {
        owner = msg.sender;
        gambaCoin = GambaCoin(_gambaCoinAddress);
    }

    function takeBet(uint _betSize) public { 
        require(gambaCoin.balanceOf(msg.sender) >= _betSize, "better doesn't have enough GambaCoin!");

        gambaCoin.receiveBet(msg.sender, _betSize);
        bool _didWin = false;
        if(randMod(20) > 10) { 
            // payable(msg.sender).transfer(msg.value * 2);
            gambaCoin._payout(msg.sender, _betSize * 2);
            _didWin = true;
        }
        emit BetProcessed(msg.sender, _didWin, _betSize);
    }

    receive() external payable { 
        balance += msg.value;
    }

    modifier onlyOwner() { 
        require(msg.sender == owner);
        _;
    }
    function withdraw(uint _amount) public onlyOwner() { 
        payable(owner).transfer(_amount);
    }


    function randMod(uint _modulus) internal returns(uint) {
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
    }
}