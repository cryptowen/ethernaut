const { ethers } = require("hardhat");
const { getContractAddress } = require('@ethersproject/address')
const {BigNumber} = require("ethers");
require('dotenv').config()

describe("GatekeeperTwo", function () {
  it("GatekeeperTwo", async function () {
    const GatekeeperTwo = await ethers.getContractFactory("GatekeeperTwo");
    const gatekeeper_two = await GatekeeperTwo.deploy();
    await gatekeeper_two.deployed();
    console.log(`entrant: ${await gatekeeper_two.entrant()}`);

    const [owner] = await ethers.getSigners()
    const transactionCount = await owner.getTransactionCount()
    const futureAddress = getContractAddress({
      from: owner.address,
      nonce: transactionCount
    })
    console.log(`futureAddress: ${futureAddress}`);
    // calc uint64(bytes8(keccak256(abi.encodePacked(msg.sender))))
    const addrHash = ethers.utils.solidityKeccak256(['address'], [futureAddress]);
    console.log(`addrHash: ${addrHash}`);
    const xorLeft = BigNumber.from(addrHash.slice(0, 18));
    console.log(`xorLeft: ${xorLeft}`);
    const key = xorLeft.xor(BigNumber.from('0xffffffffffffffff'));
    console.log(`key: ${key}`);

    const GatekeeperTwoHacker = await ethers.getContractFactory("GatekeeperTwoHacker");
    const gatekeeper_one_hacker = await GatekeeperTwoHacker.deploy(gatekeeper_two.address, key);
    await gatekeeper_one_hacker.deployed();

    console.log(`entrant: ${await gatekeeper_two.entrant()}`);
  });
});
