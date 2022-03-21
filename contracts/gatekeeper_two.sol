// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

contract GatekeeperTwo {

    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        uint x;
        assembly { x := extcodesize(caller()) }
        require(x == 0, "x != 0");
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        console.log("msg.sender: %s", msg.sender);
        console.logBytes32(keccak256(abi.encodePacked(msg.sender)));
        console.log("xor left: %s", uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))));
//        bytes32 addrHash = keccak256(abi.encodePacked(msg.sender));
//        console.log("addrHash: %s", addrHash);
        require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == uint64(0) - 1, "gate 3 failed");
        _;
    }

    function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}