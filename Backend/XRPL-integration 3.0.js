<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>XRPL & Web3 in Browser</title>
  <script src="https://unpkg.com/xrpl/dist/xrpl.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js"></script>
</head>
<body>
  <h1>XRPL and EVM Sidechain Integration</h1>
  
  <button id="mint-token">Mint Token on XRPL</button>
  <button id="submit-claim">Submit Claim on EVM</button>
  
  <p id="output"></p>
  
  <script>
    // Setup XRPL client
    const xrpl = window.xrpl;
    const xrplClient = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

    // Setup Web3
    const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

    // ABI and contract address
    const contractAbi = [ /* paste your contract ABI here */ ];
    const contractAddress = "0xb66382c4632F6009FF1fd6AA0dF7Cc6a4453e826";
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    // HTML elements
    const output = document.getElementById("output");
    const mintButton = document.getElementById("mint-token");
    const claimButton = document.getElementById("submit-claim");

    // Mint Token on XRPL
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

        output.innerText = "Token minted: " + JSON.stringify(result);
      } catch (error) {
        output.innerText = "Error in mintCarbonToken: " + error.message;
      } finally {
        await xrplClient.disconnect();
      }
    }

    // Submit Claim on EVM
    async function submitCarbonClaim(amount, proof) {
      try {
        // MetaMask wallet required for accounts
        const accounts = await web3.eth.requestAccounts();
        const gas = await contract.methods.submitClaim(amount, proof).estimateGas({ from: accounts[0] });
        const receipt = await contract.methods.submitClaim(amount, proof).send({
          from: accounts[0],
          gas,
        });

        output.innerText = "Claim submitted: " + receipt.transactionHash;
      } catch (error) {
        output.innerText = "Error in submitCarbonClaim: " + error.message;
      }
    }

    // Event Listeners for Buttons
    mintButton.addEventListener("click", () => {
      const walletSeed = prompt("Enter your XRPL Wallet Seed:");
      const amount = prompt("Enter the amount to mint:");
      mintCarbonToken(walletSeed, amount);
    });

    claimButton.addEventListener("click", () => {
      const amount = prompt("Enter claim amount:");
      const proof = prompt("Enter proof URL:");
      submitCarbonClaim(amount, proof);
    });
  </script>
</body>
</html>
