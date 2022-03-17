// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import "hardhat/console.sol";

contract Reentrance {

    using SafeMath for uint256;
    mapping(address => uint) public balances;

    function donate(address _to) public payable {
//        console.log("to: %s, value: %s", _to, msg.value);
        balances[_to] = balances[_to].add(msg.value);
//        console.log("balances: %s %s", _to, balances[_to]);
    }

    function balanceOf(address _who) public view returns (uint balance) {
//        console.log("balances: %s %s", _who, balances[_who]);
        return balances[_who];
    }

    function withdraw(uint _amount) public {
        console.log("enter withdraw");
        if(balances[msg.sender] >= _amount) {
            console.log("transfer");
            (bool result,) = msg.sender.call{value:_amount}("");
            if(result) {
                console.log("transfer success");
                _amount;
            }
            balances[msg.sender] -= _amount;
        }
        console.log("exit withdraw");
    }

    receive() external payable {}
}