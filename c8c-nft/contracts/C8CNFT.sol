// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract C8CNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //constructor for an ERC721 is a name and symbol
    constructor() ERC721("C8CNFT", "C8C") {
    }

    /**
    @notice when you call the mintNFT function 
    * you can pass in a URI to associate it with the NFT that you mint.
    * So if you have a URI on IPFS that links to a picture you can include it in the contract
    
    * a token url is a ipfs url
    *after we mint the token we are going to return the id of the token
    */
    function mintNFT(string memory tokenURI) public returns (uint) {
        require(msg.sender != address(0), "mint to the zero address");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

       // mint token for the person that called the function
        _mint(msg.sender, newItemId);

        //set the token uri of the token id of the uri passed
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}