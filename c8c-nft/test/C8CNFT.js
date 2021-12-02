const { expect } = require("chai");

describe("Mint Function", function () {
  it("The contract as able to mint a function", async function () {
    const metadata = "https://opensea-creatures-api.herokuapp.com/api/creature/2"

    const C8CContract = await ethers.getContractFactory("C8CNFT");

    const nft = await C8CContract.deploy();

    const transaction = await nft.mintNFT(metadata);
    const tx = await transaction.wait()

    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();

    const tokenURI = await nft.tokenURI(tokenId)
  
    expect(tokenURI).to.be.equal(metadata);
    // console.log('transaction----', transaction);
    console.log('tx-------', tx);
    console.log('event----', event);
    console.log('value-----', value);
    console.log('tokenId----', tokenId);

    // console.log('tokenURI----', tokenURI);
    // console.log('metadata----', metadata);
  });
});

