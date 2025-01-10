document.addEventListener('DOMContentLoaded', function () {
    // Example data, replace with API fetch in a real app
    const walletData = { address: "abc123xyz", balance: 100 };
    const transactions = [
      { date: "2025-01-01", type: "Buy", amount: 10, status: "Completed" },
      { date: "2025-01-02", type: "Sell", amount: 5, status: "Pending" },
    ];
  
    // Insert wallet data into HTML
    document.getElementById("wallet-address").textContent = walletData.address;
    document.getElementById("wallet-balance").textContent = walletData.balance;
  
    // Populate the transactions table
    const tableBody = document.querySelector("#transactions-table tbody");
    transactions.forEach(txn => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${txn.date}</td>
        <td>${txn.type}</td>
        <td>${txn.amount} CTN</td>
        <td>${txn.status}</td>
      `;
      tableBody.appendChild(row);
    });
  
    // Portfolio Insights (Chart.js)
    const ctx = document.getElementById('portfolio-chart').getContext('2d');
    const chartData = {
      labels: transactions.map(txn => txn.date),
      datasets: [{
        label: 'Portfolio Value',
        data: transactions.map(txn => txn.amount),
        borderColor: 'blue',
        fill: false,
      }]
    };
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Date' } },
          y: { title: { display: true, text: 'Amount (XRP)' } }
        }
      }
    });

    // Simulate buying a token (can later be replaced with backend API)
function buyToken(tokenName, tokenPrice) {
    alert(`You have bought ${tokenName} for ${tokenPrice} CTN!`);
}

// Handle the form submission to buy tokens
document.getElementById('buy-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting

    const tokenName = document.getElementById('token-name').value;
    const amount = document.getElementById('amount').value;

    if (amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Simulate buying tokens
    const totalPrice = amount * (tokenName === 'Token A' ? 10 : tokenName === 'Token B' ? 15 : 20);
    alert(`You have bought ${amount} of ${tokenName} for a total of ${totalPrice} CTN!`);
});
  });
  