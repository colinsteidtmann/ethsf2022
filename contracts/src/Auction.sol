// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "openzeppelin-contracts/token/ERC721/IERC721.sol";

contract EnglishAuction {
    event Start();
    event BidEvent(address indexed sender, string encryptedAmount);
    event End(address winner, uint256 amount);

    IERC721 public nft;
    uint256 public nftId;

    address payable public seller;
    address payable public highestBidder;
    uint256 public highestBid;
    uint256 public endAt;
    bool public started;
    bool public ended;
    uint256 immutable feeToPlay;

    struct Bid {
        string encryptedAmount;
        string encryptedSymmetricKey;
    }
    address[] public bidders;
    mapping(address => Bid) public bids;

    constructor(
        address _nft,
        uint256 _nftId,
        uint256 _startingBid,
        uint256 _feeToPlay
    ) {
        nft = IERC721(_nft);
        nftId = _nftId;

        seller = payable(msg.sender);
        feeToPlay = _feeToPlay;
    }

    function start() external {
        require(!started, "started");
        require(msg.sender == seller, "not seller");

        nft.transferFrom(msg.sender, address(this), nftId);
        started = true;
        endAt = block.timestamp + 7 days;

        emit Start();
    }

    function bid(string memory _encryptedAmount, string memory _symmetricKey)
        external
        payable
    {
        require(started, "not started");
        require(block.timestamp < endAt, "ended");
        require(msg.value > feeToPlay, "value < highest");

        // mintGrantBurn
        // create bid
        Bid memory userBid;
        userBid.encryptedAmount = _encryptedAmount;
        userBid.encryptedSymmetricKey = _symmetricKey;
        bidders.push(msg.sender);
        bids[msg.sender] = userBid;
        emit BidEvent(msg.sender, _encryptedAmount);
    }

    function withdraw() external payable {
        require(started, "not started");
        require(block.timestamp >= endAt, "not ended");
        require(!ended, "ended");
        require(msg.value >= highestBid, "please pay the highestBid");
        require(msg.sender == highestBidder, "sender must be highestBidder");

        ended = true;
        if (highestBidder != address(0)) {
            nft.safeTransferFrom(address(this), highestBidder, nftId);
            seller.transfer(highestBid);
        } else {
            nft.safeTransferFrom(address(this), seller, nftId);
        }

        emit End(highestBidder, highestBid);
    }
}
