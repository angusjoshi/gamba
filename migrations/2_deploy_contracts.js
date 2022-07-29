var casino = artifacts.require("./Casino.sol");
var gambaCoin = artifacts.require("./GambaCoin.sol");

module.exports = function(deployer) { 
    deployer.deploy(gambaCoin)
    .then(() => {
        return deployer.deploy(casino, gambaCoin.address);
    });
}