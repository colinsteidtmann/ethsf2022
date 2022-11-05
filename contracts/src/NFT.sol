// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "openzeppelin-contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-contracts/utils/Counters.sol";
import "openzeppelin-contracts/utils/Strings.sol";
import "openzeppelin-contracts/utils/Base64.sol";
import "openzeppelin-contracts/security/ReentrancyGuard.sol";

contract NFT is ERC721URIStorage, ReentrancyGuard {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("ETH SF", "ETHSF") {}

    mapping(uint256 => nft) private tokenIdToNft;

    struct nft {
        string name;
        string imageUrl;
        string description;
        uint256 tokenID;
    }

    function getTokenURI(
        string memory name,
        string memory imageUrl,
        string memory description,
        uint256 tokenID
    ) private pure returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "',
            name,
            '",',
            '"image": "',
            imageUrl,
            '",',
            '"description": "',
            description,
            '"',
            '"tokenID:": "',
            tokenID,
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function mintNft(
        string memory name,
        string memory imageUrl,
        string memory description
    ) public nonReentrant {
        _tokenIds.increment();
        uint256 newNftTokenId = _tokenIds.current();
        _safeMint(msg.sender, newNftTokenId);
        _setTokenURI(
            newNftTokenId,
            getTokenURI(name, imageUrl, description, newNftTokenId)
        );
        tokenIdToNft[newNftTokenId] = nft(
            name,
            imageUrl,
            description,
            newNftTokenId
        );
    }

    function fetchNfts() public view returns (nft[] memory) {
        nft[] memory nfts = new nft[](_tokenIds.current());
        for (uint256 idx = 1; idx < _tokenIds.current() + 1; idx++) {
            nft memory currNft = tokenIdToNft[idx];
            nfts[idx - 1] = currNft;
        }

        return nfts;
    }
}
