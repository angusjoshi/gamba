var casino = artifacts.require("./Casino.sol");

module.exports = function(deployer) { 
    deployer.deploy(casino);
}