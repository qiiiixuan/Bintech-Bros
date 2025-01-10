document.addEventListener('DOMContentLoaded', function () {
  const holdingsData = [
    { token: 'CarbonToken A', quantity: 200, value: 1500, percentage: 50 },
    { token: 'CarbonToken B', quantity: 300, value: 1000, percentage: 33.3 },
    { token: 'CarbonToken C', quantity: 50, value: 500, percentage: 16.7 },
  ];

  // Populate holdings table
  const holdingsTable = document.getElementById('holdings-data');
  holdingsData.forEach(({ token, quantity, value, percentage }) => {
    const row = `<tr>
      <td>${token}</td>
      <td>${quantity}</td>
      <td>$${value.toFixed(2)}</td>
      <td>${percentage.toFixed(2)}%</td>
    </tr>`;
    holdingsTable.insertAdjacentHTML('beforeend', row);
  });

  // Copy wallet address to clipboard
  function copyToClipboard() {
    const walletAddress = document.getElementById('wallet-address').textContent;
    navigator.clipboard.writeText(walletAddress).then(() => {
      alert('Wallet address copied to clipboard!');
    });
  }

  // Populate Transactions Table
  const transactionsData = [
    { date: '2025-01-01', type: 'Buy', amount: 50, status: 'Completed' },
    { date: '2025-01-05', type: 'Sell', amount: 30, status: 'Pending' },
    { date: '2025-01-10', type: 'Buy', amount: 70, status: 'Completed' },
  ];

  const transactionsTable = document.getElementById('transactions-table').querySelector('tbody');
  transactionsData.forEach(({ date, type, amount, status }) => {
    const row = `<tr>
      <td>${date}</td>
      <td>${type}</td>
      <td>${amount} CTN</td>
      <td>${status}</td>
    </tr>`;
    transactionsTable.insertAdjacentHTML('beforeend', row);
  });

  // Portfolio chart
  const ctx = document.getElementById('portfolio-chart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: holdingsData.map(h => h.token),
      datasets: [{
        data: holdingsData.map(h => h.percentage),
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
      }],
    },
  });

  // Mint Tokens API Call
  async function mintTokens(walletSeed, amount) {
    try {
      const response = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletSeed, amount }),
      });
      const data = await response.json();
      if (data.status === "success") {
        alert(`Minting successful: ${data.result.tx_json.hash}`);
      } else {
        alert(`Error minting tokens: ${data.error}`);
      }
    } catch (error) {
      console.error("Minting error:", error);
      alert("An error occurred while minting tokens.");
    }
  }

  // Submit Claim API Call
  async function submitClaim(amount, proof) {
    try {
      const response = await fetch("/api/submitClaim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, proof }),
      });
      const data = await response.json();
      if (data.status === "success") {
        alert(`Claim submitted: ${data.transactionHash}`);
      } else {
        alert(`Error submitting claim: ${data.error}`);
      }
    } catch (error) {
      console.error("Claim submission error:", error);
      alert("An error occurred while submitting the claim.");
    }
  }

  // Handle the form submission to mint tokens
  document.getElementById('buy-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    const walletSeed = document.getElementById('wallet-seed').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!walletSeed || amount <= 0) {
      alert('Invalid wallet seed or amount.');
      return;
    }
    mintTokens(walletSeed, amount);
  });

  // Handle the form submission to submit claims
  document.getElementById('submit-claim-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    const amount = parseFloat(document.getElementById('claim-amount').value);
    const proof = document.getElementById('proof-url').value;

    if (!amount || !proof) {
      alert('Invalid claim amount or proof URL.');
      return;
    }
    submitClaim(amount, proof);
  });
});
  