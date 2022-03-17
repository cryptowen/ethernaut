const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Force", function () {
  it("coin flip should success", async function () {
    const Force = await ethers.getContractFactory("Force");
    const force = await Force.deploy();
    await force.deployed();

    const ForceHacker = await ethers.getContractFactory("ForceHacker");
    const force_hacker = await ForceHacker.deploy();
    await force_hacker.deployed();

    const tx = await force_hacker.attack(force.address, {
      value: 1,
    });
    await tx.wait();
    const forceBalance = await ethers.provider.getBalance(force.address);
    console.log(`force balance: ${forceBalance}`);
    expect(forceBalance).to.be.gt(0);
  });
});
