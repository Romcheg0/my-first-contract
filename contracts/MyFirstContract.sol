// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyFirstContract is ERC20 {
    constructor(uint256 initialSupply) ERC20 ("MyFirstContract", "MFC") {
        _mint(msg.sender, initialSupply);
    }
    
    function makeTransfers(address payable[] memory addresses, uint256[] memory amounts) public {
        require(addresses.length == amounts.length, 'Different lengths of arrays!');
        require (addresses.length != 0, 'Empty array!');
        for(uint i = 0; i < addresses.length; i++){
            _transfer(msg.sender, addresses[i], amounts[i]);
        }
    }
}
