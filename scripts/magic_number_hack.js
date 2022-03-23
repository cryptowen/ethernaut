const {ethers} = require("hardhat");
const {getContractAddress} = require("@ethersproject/address");
const {BigNumber} = require("ethers");
require('dotenv').config()

async function main() {
  const MagicNum = await ethers.getContractFactory("MagicNum");
  const magicNum = MagicNum.attach(process.env.MAGIC_NUMBER_ADDR);

  const MagicNumHacker = await ethers.getContractFactory("MagicNumHacker");
  const magicNumHacker = await MagicNumHacker.deploy();
  await magicNumHacker.deployed();
  console.log(`MagicNumHacker address: ${magicNumHacker.address}`);

  const tx = await magicNum.setSolver(magicNumHacker.address);
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
