// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Counter.sol";
import "../src/Auction.sol";
import "../src/NFT.sol";

contract AuctionTest is Test {
    NFT private nft;
    Auction private auction;

    function setUp() public {
        nft = new NFT("NFT_tutorial", "TUT");
        uint nftID = nft.mintTo(address(1));
        auction = new Auction(address(nft), nftID, feeToPlay)
    }
}
