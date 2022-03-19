const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const Privacy = await ethers.getContractFactory("Privacy");
  console.log(`privacy env: ${process.env.PRIVACY_ADDR}`);
  const privacy = Privacy.attach(process.env.PRIVACY_ADDR);
  console.log(`privacy address: ${privacy.address}`);

  const key = (await ethers.provider.getStorageAt(privacy.address, 5)).slice(0, 34);
  console.log(`privacy key: ${key}`);

  console.log(`unlocked: ${await privacy.locked()}`);
  const tx = await privacy.unlock(key);
  await tx.wait();
  console.log(`unlocked: ${await privacy.locked()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
