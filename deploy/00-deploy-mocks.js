const { developmentChains } = require("../helper-hardhat-config");
const BASE_FEE = ethers.parseEther("0.25");
//it costs 0.25 link for each request
const GAS_PRICE_LINK = 1e9;
//this is based on the gas price of the chain
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [BASE_FEE, GAS_PRICE_LINK];
  const chainId = network.name;

  if (developmentChains.includes(network.name)) {
    log("local network detected! Deploying mocks...");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: args,
    });
    log("mocks Deployed!");
    log("--------------------------------------------");
  }
};

module.exports.tags = ["all", "mocks "];
