// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GambaCoin is ERC20, Ownable { 
    uint private constant _INITIAL_SUPPLY = 1000 * (10**18);
    uint private ethBalance;

    event Buy(address indexed buyer, uint amount);
    event Sell(address indexed seller, uint amount);

    constructor() ERC20("GambaCoin", "GMB") Ownable() { 
        _mint(msg.sender, _INITIAL_SUPPLY);
        ethBalance = 0;


    }
    function receiveBet(address from, uint amount) external { 
        transferFrom(from, owner(), amount);
    }
    function _payout(address to, uint amount) internal { 
        _transfer(owner(), to, amount);
    }

    function _buy() external payable { 
        require(msg.value > 0, "tx value must be >0 to buy GambaCoin");
        ethBalance += msg.value;
        _mint(msg.sender, msg.value);
        emit Buy(msg.sender, msg.value);
    }

    function _sell(address seller, uint _amount) external { 
        require(_amount <= balanceOf(seller), "balance of sender is less than withdrawal amount!");
        ethBalance -= _amount;
        _burn(seller, _amount);
        payable(seller).transfer(_amount);
        
        emit Sell(seller, _amount);
    }

}