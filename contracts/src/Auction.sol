// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "openzeppelin-contracts/token/ERC721/IERC721.sol";
import "openzeppelin-contracts/utils/Strings.sol";

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract Auction {
    event Start(uint256 endAt);
    event BidEvent(address indexed sender, string encryptedAmount);
    event End(address winner, uint256 amount);

    address public EPNS_COMM_ADDRESS =
        0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;

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
        uint256 _feeToPlay
    ) {
        nft = IERC721(_nft);
        nftId = _nftId;

        seller = payable(msg.sender);
        feeToPlay = _feeToPlay;
    }

    function start(uint256 _duration) external {
        require(!started, "started");
        require(msg.sender == seller, "not seller");

        nft.transferFrom(msg.sender, address(this), nftId);
        started = true;
        endAt = block.timestamp + _duration;

        emit Start(endAt);
    }

    function bid(string memory _encryptedAmount, string memory _symmetricKey)
        external
        payable
    {
        require(started, "not started");
        require(block.timestamp < endAt, "ended");
        require(msg.value > feeToPlay, "value < highest");

        // create bid
        Bid memory userBid;
        userBid.encryptedAmount = _encryptedAmount;
        userBid.encryptedSymmetricKey = _symmetricKey;
        bidders.push(msg.sender);
        bids[msg.sender] = userBid;

        emit BidEvent(msg.sender, _encryptedAmount);
    }

    function declareWinner(address payable _highestBidder, uint256 _highestBid)
        public
        onlySeller
    {
        highestBidder = _highestBidder;
        highestBid = _highestBid;

        IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
            0x4b1b619d4FF6AfE77307299b9970d9056B06C37A, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            address(this), // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                    abi.encodePacked(
                        "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                        "+", // segregator
                        "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                        "+", // segregator
                        "Winner Alert for Auction ",
                        Strings.toString(nftId), // this is notificaiton title
                        "+", // segregator
                        "Hooray! ", // notification body
                        addressToString(msg.sender), // notification body
                        " declared the winner! Congratulations ", // notification body
                        addressToString(highestBidder), // notification body
                        ". You won the auction!" // notification body
                    )
                )
            )
        );
    }

    // Helper function to convert address to string
    function addressToString(address _address)
        internal
        pure
        returns (string memory)
    {
        bytes32 _bytes = bytes32(uint256(uint160(_address)));
        bytes memory HEX = "0123456789abcdef";
        bytes memory _string = new bytes(42);
        _string[0] = "0";
        _string[1] = "x";
        for (uint256 i = 0; i < 20; i++) {
            _string[2 + i * 2] = HEX[uint8(_bytes[i + 12] >> 4)];
            _string[3 + i * 2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
        }
        return string(_string);
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

    modifier onlySeller() {
        require(msg.sender == seller, "Not seller");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }
}
