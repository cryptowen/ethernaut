const {ethers} = require("hardhat");
const {getContractAddress} = require("@ethersproject/address");
const {BigNumber} = require("ethers");
require('dotenv').config()

async function main() {
  const recoveryAddr = process.env.RECOVERY_ADDR;
  const firstAddr = getContractAddress({
    from: recoveryAddr,
    nonce: 1,
  })
  console.log(`firstAddr: ${firstAddr}`);

  const SimpleToken = await ethers.getContractFactory("SimpleToken");
  const simpleToken = SimpleToken.attach(firstAddr);
  const [user] = await ethers.getSigners();
  const tx = await simpleToken.destroy(user.address);
  await tx.wait();
  console.log(`success`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
