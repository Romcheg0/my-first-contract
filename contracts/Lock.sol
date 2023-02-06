// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyFirstContract is ERC20 {

    constructor(uint256 initialSupply) ERC20 ("MyFirstContract", "MFC") {
        _mint(address(this), initialSupply);
    }
    
    function makeTransfers(address payable[] memory addresses, uint256[] memory amounts) public {
        if(addresses.length == amounts.length){
            for(uint i = 0; i < addresses.length; i++){
                if(balanceOf(msg.sender) >= amounts[i]){
                    transfer(addresses[i], amounts[i]);
                }
            }
        }
    }

    function getBalance() public returns(uint256){
        return address(this).balance;
    }
}
