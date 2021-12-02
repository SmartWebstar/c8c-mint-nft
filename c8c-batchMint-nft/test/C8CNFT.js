const { expect } = require("chai");

describe("Mint Function", function () {
  it("The contract as able to mint a function", async function () {
    const metadata = ['https://opensea-creatures-api.herokuapp.com/api/creature/1',
                      'https://opensea-creatures-api.herokuapp.com/api/creature/2',
                      'https://opensea-creatures-api.herokuapp.com/api/creature/3',
                      'https://opensea-creatures-api.herokuapp.com/api/creature/4',
                      'https://opensea-creatures-api.herokuapp.com/api/creature/5'
                    ]

    const C8CContract = await ethers.getContractFactory("C8CNFT");

    const nft = await C8CContract.deploy();
    await nft.deployed();
    
    const transaction = await nft.mintNFT(5, metadata);
    const tx = await transaction.wait()
    // for ( i = 0; i <= 5; i++ ) {
    //       const event = tx.events[i];
    //       const value = event[].artgs[2];
          const event1 = tx.events[0];
          const event2 = tx.events[1];
          const event3 = tx.events[2];
          const event4 = tx.events[3];
          const event5 = tx.events[4];

          const value1 = event1.args[2];
          const value2 = event2.args[2];
          const value3 = event3.args[2];
          const value4 = event4.args[2];
          const value5 = event5.args[2];

          const tokenId1 = value1.toNumber();
          const tokenId2 = value2.toNumber();
          const tokenId3 = value3.toNumber();
          const tokenId4 = value4.toNumber();
          const tokenId5 = value5.toNumber();

          const tokenURI1 = await nft.tokenURI(tokenId1);
          const tokenURI2 = await nft.tokenURI(tokenId2);
          const tokenURI3 = await nft.tokenURI(tokenId3);
          const tokenURI4 = await nft.tokenURI(tokenId4);
          const tokenURI5 = await nft.tokenURI(tokenId5);
        
          expect(tokenURI1).to.be.equal(metadata[0]);
          expect(tokenURI2).to.be.equal(metadata[1]);
          expect(tokenURI3).to.be.equal(metadata[2]);
          expect(tokenURI4).to.be.equal(metadata[3]);
          expect(tokenURI5).to.be.equal(metadata[4]);
        
          // console.log('transaction----', transaction);
          // console.log('tx-------', tx);
          console.log('tokenURI1----', tokenURI1);
          console.log('tokenURI2----', tokenURI2);
          console.log('tokenURI3----', tokenURI3);
          console.log('tokenURI4----', tokenURI4);
          console.log('tokenURI5----', tokenURI5);

          console.log('value-----', value1);
          console.log('tokenId----', tokenId1);
          console.log('tokenId----', tokenId2);
          console.log('tokenId----', tokenId3);
          console.log('tokenId----', tokenId4);
          console.log('tokenId----', tokenId5);

          console.log('tokenURI----', tokenURI1);
          console.log('tokenURI----', tokenURI2);
          console.log('tokenURI----', tokenURI3);
          console.log('tokenURI----', tokenURI4);
          console.log('tokenURI----', tokenURI5);
          // console.log('metadata----', metadata);
    // }

  });
});

