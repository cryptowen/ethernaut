const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Elevator", function () {
  it("Elevator", async function () {
    const Elevator = await ethers.getContractFactory("Elevator");
    const elevator = await Elevator.deploy();
    await elevator.deployed();
    console.log(`elevator is top: ${await elevator.top()}`);

    const ElevatorHacker = await ethers.getContractFactory("ElevatorHacker");
    const elevator_hacker = await ElevatorHacker.deploy(elevator.address);
    await elevator_hacker.deployed();

    const tx = await elevator_hacker.attack();
    await tx.wait();
    console.log(`elevator is top: ${await elevator.top()}`);
    expect(await elevator.top()).to.equal(true);
  });
});
