import { useEffect, useState } from "react";
import { create } from 'ipfs-http-client'


const ipfsClient = create('https://ipfs.infura.io:5001/api/v0')
console.log('ipfsClient', ipfsClient);

const Minter = () => {
	
	const [imageUrl, setImageUrl] = useState("");
	const baseURL = "http://localhost:8080/update-todo";


	async function onChange(e) {
		
		const file = e.target.files[0]
		try {
		  const added = await ipfsClient.add(file);
		  const url = `https://ipfs.io/ipfs/${added.cid.toString()}`
		  setImageUrl(url)
		  console.log('image url----', url);

		} catch (error) {
		  console.log('Error uploading file: ', error)
		}  
		
	}
	
	return (
		<div className="Minter">
			<input type="file"	onChange={onChange}	id="file" multiple />
			<label htmlFor="file" className="generateNFT">Generate NFT</label>
				<img src={imageUrl} width="600px" />
			
		</div>
	);
};

export default Minter;


// import { useEffect, useState } from "react";
// import { create } from 'ipfs-http-client'


// // const ipfsClient = create('https://ipfs.infura.io:5001/api/v0')
// // const ipfsClient = create({host:‘ipfs.infura.io’,port:5001,protocol:‘https’});
// const ipfsClient = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https',apiPath: '/api/v0' }) 

// console.log('ipfsClient', ipfsClient);
// const Upload = () => {
	
// 	const [imageUrl, setImageUrl] = useState("");
// 	const baseURL = "http://localhost:8080/update-todo";


// 	async function onChange(e: any) {
		
// 		const file = e.target.files[0]
// 		try {
// 		  const added = await ipfsClient.add(file);
// 		  const url = `https://ipfs.io/ipfs/${added.cid.toString()}`
// 		  setImageUrl(url)
// 		  console.log('image url----', url);

// 		} catch (error) {
// 		  console.log('Error uploading file: ', error)
// 		}  
		
// 	}
	
// 	return (
// 		<div className="Minter">
// 			<input type="file"	onChange={onChange}	id="file" multiple />
// 			<label htmlFor="file" className="generateNFT">Generate NFT</label>
// 				<img src={imageUrl} width="600px" />
			
// 		</div>
// 	);
// };

// export { Upload };
