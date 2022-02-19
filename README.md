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