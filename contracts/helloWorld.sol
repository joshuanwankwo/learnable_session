// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract HelloWorld{
    constructor(){
        console.log("This is our first smart contract");
    }

    string message = "Hello World";
    uint256 totalHello;

    function getMessage() public view returns(string memory) {
        return message;
    }

    function sayHello() public {
        totalHello += 1; 
        console.log(msg.sender, "said hello");
    }

    function getTotal() public view returns(uint256){
        console.log("Number of total hello is: ", totalHello);
        return totalHello;
    }
}