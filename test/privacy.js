const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Privacy", function () {
  it("Privacy", async function () {
    const Privacy = await ethers.getContractFactory("Privacy");
    const privacy = await Privacy.deploy([
      '0x0000000000000000000000000000000100000000000000000000000000000002',
      '0x0000000000000000000000000000000300000000000000000000000000000004',
      '0x0000000000000000000000000000000500000000000000000000000000000006',
    ]);
    await privacy.deployed();

    const key = await privacy.getKey();
    console.log(`key: ${key}`);
    const storage = await ethers.provider.getStorageAt(privacy.address, 5);
    console.log(`slot 5: ${storage}`);
    expect(key).to.be.equal(storage.slice(0, 34));
  });
});
