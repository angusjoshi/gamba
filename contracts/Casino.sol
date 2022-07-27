pragma solidity >=0.8.0 <0.9.0;

contract Casino {

    mapping(uint => string) test;
    uint randNonce = 0;
    uint public balance = 0;
    address owner;
    event BetProcessed(address indexed _better, bool _didWin, uint _value);

    constructor() {
        owner = msg.sender;
    }

    function takeBet() public payable { 
        balance += msg.value;
        bool _didWin = false;
        if(randMod(20) > 10) { 
            payable(msg.sender).transfer(msg.value * 2);
            _didWin = true;
        }
        emit BetProcessed(msg.sender, _didWin, msg.value);
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


    function setTest(uint _key, string memory _value) public { 
        test[_key] = _value;
    }

    function getTest(uint _id) public view returns(string memory) { 
        return test[_id];
    }

    function randMod(uint _modulus) internal returns(uint) {
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
    }
}