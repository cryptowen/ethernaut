const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Coin Flip", function () {
  it("coin flip should success", async function () {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coin_flip = await CoinFlip.deploy();
    await coin_flip.deployed();

    const CoinFlipHacker = await ethers.getContractFactory("CoinFlipHacker");
    const coin_flip_hacker = await CoinFlipHacker.deploy(coin_flip.address);
    await coin_flip_hacker.deployed();

    for(let i=0; i<10; i++){
      const flipTx = await coin_flip_hacker.flip();
      await flipTx.wait();
    }
    expect(await coin_flip.consecutiveWins()).to.equal(10);
  });
});
