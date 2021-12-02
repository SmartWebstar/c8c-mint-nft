import { useEffect, useState } from "react";
// import App from "./App.js";
// import Ipfs from "./ipfs.js";
import { create } from 'ipfs-http-client'
import { connectWeb3Wallet } from './hooks/useWeb3'
import {
	connectWallet,
	getCurrentWalletConnected,
	mintNFT_,
} from "./util/interact.js";
import Select from 'react-select'
const ipfsClient = create('https://ipfs.infura.io:5001/api/v0')
const mintNum = 3;

const numberMint = [
	{value: 1, label: 1},
	{value: 2, label: 2},
	{value: 3, label: 3},
	{value: 4, label: 4},
	{value: 5, label: 5},
];

const Minter = () => {
	const [walletAddress, setWallet] = useState("");
	const [status, setStatus] = useState("");
	const [fileUrl, updateFileUrl] = useState(``)
	const [imageUrl, setImageUrl] = useState("");
	const [mintNum, setMintNum] = useState("");
	const [numberBatch, setNumberBatch] = useState(1);

	const baseURL = "http://localhost:8080/update-todo";
	
	useEffect(async () => {
		const { address, status } = await getCurrentWalletConnected();

		setWallet(address);
		setStatus(status);

		addWalletListener();
	}, []);

	function addWalletListener() {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", (accounts) => {
				if (accounts.length > 0) {
					setWallet(accounts[0]);
					setStatus("");
				} else {
					setWallet("");
					setStatus("🦊 Connect to Metamask using the top right button.");
				}
			});
		} else {
			setStatus(
				<p>
					{" "}
					🦊{" "}
					<a target="_blank" href={`https://metamask.io/download.html`}>
						You must install Metamask, a virtual Ethereum wallet, in your
						browser.
					</a>
				</p>
			);
		}
	}

	const connectWalletPressed = async () => {
		const walletResponse = await connectWeb3Wallet();
		setStatus(walletResponse._state.accounts.length);
		setWallet(walletResponse.selectedAddress);
	};

	const onMintPressed = async () => {
		
		console.log('sender:',fileUrl);
		if(fileUrl === ""){
			alert("Please click 'Generate NFT' first.");
		} else{
			// const mintNum;
			const { success, status } = await mintNFT_(mintNum, fileUrl);
			setStatus(status);
			if (success) {
				setMintNum("");
			}
		}
	};

	async function onChange(e) {
		
		const file = e.target.files[0]
		try {
		  const added = await ipfsClient.add(file);
		  const url = `https://ipfs.io/ipfs/${added.cid.toString()}`
		  setImageUrl(url)
		  console.log('image url----', url);

		  const fileDetails = [
			{
				content: JSON.stringify({
					"name": "metaData.name1",
					"description": "metaData.description1",
					"image": url,
					"attributes": [
						{
							"trait_type": "trait",
							"value": "1"
						}
					]
				})
			},
		]
	
		const options = {
			wrapWithDirectory: true,
		}

		const ipfsHashInfo = await ipfsClient.add(fileDetails, options);
		const ipfsCIDHASH = ipfsHashInfo.cid.toString()
		const ipfsUrl = `https://ipfs.io/ipfs/${ipfsCIDHASH}`
		console.log('ipfs hash-----', ipfsUrl);
		console.log('ipfs hash-----', ipfsCIDHASH);

		updateFileUrl(ipfsUrl)
		} catch (error) {
		  console.log('Error uploading file: ', error)
		}  
		
	}
	
	return (
		<div className="Minter">
			<button id="walletButton" onClick={connectWalletPressed}>
				{walletAddress.length > 0 ? (
					"Connected: " +
					String(walletAddress).substring(0, 6) +
					"..." +
					String(walletAddress).substring(38)
				) : (
					<span>Connect Wallet</span>
				)}
			</button>

			<br></br>
			<h1 id="title">NFT Minter</h1>

			<Select 
              options={numberMint} 
              value={numberMint[0]}
              onChange={item => setNumberBatch(item.value)} 
            />

			{/* <p>
				Please click "Generate NFT" then press "Mint."
			</p> */}

			{/* <h2>Upload Image to IPFS</h2> */}
			<input type="file"	onChange={onChange}	id="file" multiple />
			<label htmlFor="file" className="generateNFT">Generate NFT</label>

		
			<button id="mintButton" className="mt-4" onClick={onMintPressed}>
			  Stop Generator
			</button>

			{/* <p id="status" style={{ color: "red" }}>
				{status}
			</p> */}
			
			<br></br><br></br>

			
			{
				fileUrl && (
				<img src={imageUrl} width="600px" />
				) 
			}
			{/* {
				fileUrl && (
					<video src={imageUrl} width="600px" />
					)
			} */}
		</div>
	);
};

export default Minter;
