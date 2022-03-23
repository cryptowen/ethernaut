// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

//import '../helpers/Ownable-05.sol';

contract AlienCodex {
    address public owner;
    bool public contact;
    bytes32[] public codex;

    modifier contacted() {
        assert(contact);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function make_contact() public {
        contact = true;
    }

    function record(bytes32 _content) contacted public {
        codex.push(_content);
    }

    function retract() contacted public {
        codex.length--;
    }

    function revise(uint i, bytes32 _content) contacted public {
        codex[i] = _content;
    }
}