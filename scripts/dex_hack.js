const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const user = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider);
  const Dex = await ethers.getContractFactory("Dex");
  const Token = await ethers.getContractFactory("SwappableToken");
  const dex = Dex.attach(process.env.DEX_ADDR);
  console.log(`token1: ${ await dex.token1() }, token2: ${ await dex.token2() }`);
  const token1 = Token.attach(await dex.token1());
  const token2 = Token.attach(await dex.token2());
  console.log(`dex: ${ dex.address }, user: ${ user.address }`);
  let tx = await dex.connect(user).approve(dex.address, 10000000);
  await tx.wait();
  let isToken1 = true;
  let token, amount, isFinished;
  while(true) {
    if(isToken1) {
      token = token1;
    } else {
      token = token2;
    }
    const dexBalance = await token.balanceOf(dex.address);
    const userBalance = await token.balanceOf(user.address);
    if(userBalance >= dexBalance) {
      amount = dexBalance;
      isFinished = true;
    } else {
      amount = userBalance;
    }
    if(isToken1) {
      tx = await dex.connect(user).swap(token1.address, token2.address, amount);
    } else {
      tx = await dex.connect(user).swap(token2.address, token1.address, amount);
    }
    await tx.wait();
    console.log(`dex token1 balance: ${await dex.balanceOf(token1.address, dex.address)}`);
    console.log(`dex token2 balance: ${await dex.balanceOf(token2.address, dex.address)}`);
    console.log(`user token1 balance: ${await dex.balanceOf(token1.address, user.address)}`);
    console.log(`user token2 balance: ${await dex.balanceOf(token2.address, user.address)}`);
    if(isFinished) {
      break;
    }
    isToken1 = !isToken1;
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
