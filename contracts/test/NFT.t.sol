// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/NFT.sol";

contract NFTTest is Test {
    NFT private nft;

    function setUp() public {
        // Deploy NFT contract
        nft = new NFT("NFT_tutorial", "TUT");
    }

    function testMintPricePaidFail() public {
        nft.mintTo(address(1));
    }

    function testMintPricePaid() public {
        nft.mintTo{value: 0.08 ether}(address(1));
    }
}
