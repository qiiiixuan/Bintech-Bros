npm install xrpl web3

const xrpl = require("xrpl");
const Web3 = require("web3");

// Connect to XRPL
const xrplClient = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

// Connect to EVM Sidechain
const web3 = new Web3("testnet.bnbchain.org/faucet-smart"); // your EVM RPC URL

// ABI of the deployed smart contract
const contractAbi = [
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

  //ABI of deployed CarbonCreditValidator contract
];
const contractAddress = "0xb66382c4632F6009FF1fd6AA0dF7Cc6a4453e826"; // contract address

const contract = new web3.eth.Contract(contractAbi, contractAddress);

async function submitCarbonClaim(amount, proof) {
  const accounts = await web3.eth.getAccounts();
  const receipt = await contract.methods.submitClaim(amount, proof).send({
    from: accounts[0],
    gas: 3000000,
  });

  console.log("Claim submitted:", receipt.transactionHash);
}

async function mintCarbonToken(walletSeed, amount) {
  await xrplClient.connect();
  const wallet = xrpl.Wallet.fromSeed(walletSeed);
const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Amount: xrpl.xrpToDrops(amount),
    Destination: "0x98a9e7dB479256e1716dEa33aA8820023B21D490", //  user's wallet
  };

  const prepared = await xrplClient.autofill(tx);
  const signed = wallet.sign(prepared);
  const result = await xrplClient.submitAndWait(signed.tx_blob);

  console.log("Token minted:", result);
  await xrplClient.disconnect();
}

// Example Usage
(async () => {
  await mintCarbonToken("s████████████████", 10); // Mint 10 tokens
  await submitCarbonClaim(10, "https://example.com/proof-of-offset");
})();
