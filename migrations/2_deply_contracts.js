const Evaluation = artifacts.require("Evaluation");

module.exports  = function (deployer) {
    deployer.deploy(Evaluation);
}