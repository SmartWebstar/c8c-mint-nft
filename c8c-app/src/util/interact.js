// import Ipfs from "../ipfs";

require("dotenv").config();

const { create } = require('ipfs-http-client')
const contractABI = require("../contract-abi.json");
const contractAddress = "0x60D7BB178C8A63682089f17a06FD3774Eef74D35";
const Web3 = require('web3');
const web3 = new Web3('https://rinkeby.infura.io/v3/e5a59fc70866465ab79a218c72f22eec');

export const connectWallet = async () => {
	console.log('window ehtereum-----', window.ethereum);
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const obj = {
				status: "",
				address: addressArray[0],
			};
			return obj;
		} catch (err) {
			return {
				address: "",
				status: "😥 " + err.message,
			};
		}
	} else {
		return {
			address: "",
			status: (
				<span>
					<p>
						{" "}
						🦊{" "}
						<a target="_blank" href={`https://metamask.io/download.html`}>
							You must install Metamask, a virtual Ethereum wallet, in your
							browser.
						</a>
					</p>
				</span>
			),
		};
	}
};

export const getCurrentWalletConnected = async () => {
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: "eth_accounts",
			});
			if (addressArray.length > 0) {
				return {
					address: addressArray[0],
					status: "",
				};
			} else {
				return {
					address: "",
					status: "🦊 Connect to Metamask using the top right button.",
				};
			}
		} catch (err) {
			return {
				address: "",
				status: "😥 " + err.message,
			};
		}
	} else {
		return {
			address: "",
			status: (
				<span>
					<p>
						{" "}
						🦊{" "}
						<a target="_blank" href={`https://metamask.io/download.html`}>
							You must install Metamask, a virtual Ethereum wallet, in your
							browser.
						</a>
					</p>
				</span>
			),
		};
	}
};

async function loadContract() {
	return new web3.eth.Contract(contractABI, contractAddress);
}

export const mintNFT_ = async (metaData) => {

	window.contract = new web3.eth.Contract(contractABI, contractAddress);

	console.log('receiver:',metaData);
	const transactionParameters = {
	    to: contractAddress, // Required except during contract publications.
	    from: window.ethereum.selectedAddress, // must match user's active address.
	    data: window.contract.methods
	        .mintNFT(metaData)
	        .encodeABI(),
	};
	try {
	    const txHash = await window.ethereum.request({
	        method: "eth_sendTransaction",
	        params: [transactionParameters],
	    });
	    return {
	        success: true,
	        status:
	            "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
	            txHash,
	    };
	} catch (error) {
	    return {
	        success: false,
	        status: "😥 Something went wrong: " + error.message,
	    };
	}
};

export const handleUpdateUri = async (tokenId, uri) => {

	window.contract = new web3.eth.Contract(contractABI, contractAddress);

	const transactionParameters = {
		to: contractAddress, // Required except during contract publications.
		from: window.ethereum.selectedAddress, // must match user's active address.
		data: window.contract.methods
			.updateMetadatauri(tokenId, uri)
			.encodeABI(),
	};

	try {
		const txHash = await window.ethereum.request({
			method: "eth_updateMetadataUriTransaction",
			params: [transactionParameters],
		});
		return {
			success: true,
			status:
				"✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
				txHash,
		};
	} catch (error) {
		return {
			success: false,
			status: "😥 Something went wrong: " + error.message,
		};
	}
};
