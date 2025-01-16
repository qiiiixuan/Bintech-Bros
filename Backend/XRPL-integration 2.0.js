const xrpl = require("xrpl");
const Web3 = require("web3");

// Connect to XRPL
const xrplClient = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

// Connect to EVM Sidechain
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

// ABI and contract address
const contractAbi = [[
   {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
   },
   {
    "inputs": [],
    "name": "admin",
    "outputs": [
     {
      "internalType": "address",
      "name": "",
      "type": "address"
     }
    ],
    "stateMutability": "view",
    "type": "function"
   },
   {
    "inputs": [
     {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
     }
    ],
    "name": "claims",
    "outputs": [
     {
      "internalType": "address",
      "name": "user",
      "type": "address"
     },
     {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
     },
     {
      "internalType": "string",
      "name": "proof",
      "type": "string"
     },
     {
      "internalType": "bool",
      "name": "validated",
      "type": "bool"
     }
    ],
    "stateMutability": "view",
    "type": "function"
   },
   {
    "inputs": [],
    "name": "nextClaimId",
    "outputs": [
     {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
     }
    ],
    "stateMutability": "view",
    "type": "function"
   },
   {
    "inputs": [
     {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
     },
     {
      "internalType": "string",
      "name": "proof",
      "type": "string"
     }
    ],
    "name": "submitClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
   },
   {
    "inputs": [
     {
      "internalType": "uint256",
      "name": "claimId",
      "type": "uint256"
     }
    ],
    "name": "validateClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
   }
  ] ];
const contractAddress = "0xb66382c4632F6009FF1fd6AA0dF7Cc6a4453e826";
const contract = new web3.eth.Contract(contractAbi, contractAddress);

async function submitCarbonClaim(amount, proof) {
    try {
        const accounts = await web3.eth.getAccounts();
        const gas = await contract.methods.submitClaim(amount, proof).estimateGas({ from: accounts[0] });
        const receipt = await contract.methods.submitClaim(amount, proof).send({
            from: accounts[0],
            gas,
        });
        console.log("Claim submitted:", receipt.transactionHash);
    } catch (error) {
        console.error("Error in submitCarbonClaim:", error);
    }
}

async function mintCarbonToken(walletSeed, amount) {
    try {
        await xrplClient.connect();
        const wallet = xrpl.Wallet.fromSeed(walletSeed);
        const tx = {
            TransactionType: "Payment",
            Account: wallet.address,
            Amount: xrpl.xrpToDrops(amount),
            Destination: "rPvsHxgPhQzq8nZyEJ7WGhydjf5Mfu3KUz", // Replace with a valid address
        };
        const prepared = await xrplClient.autofill(tx);
        const signed = wallet.sign(prepared);
        const result = await xrplClient.submitAndWait(signed.tx_blob);

        console.log("Token minted:", result);
    } catch (error) {
        console.error("Error in mintCarbonToken:", error);
    } finally {
        await xrplClient.disconnect();
    }
}

// Example Usage
(async () => {
    try {
        await mintCarbonToken("sEdTmwc4FWFywzumaLRS14w6LQa48Nm", 10);
        await submitCarbonClaim(10, "https://example.com/proof-of-offset");
    } catch (error) {
        console.error("Error in main process:", error);
    }
})();
