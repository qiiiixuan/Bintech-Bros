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

  // Example Transactions Data
const transactionsData = [
  { date: '2025-01-01', type: 'Buy', amount: 50, status: 'Completed' },
  { date: '2025-01-05', type: 'Sell', amount: 30, status: 'Pending' },
  { date: '2025-01-10', type: 'Buy', amount: 70, status: 'Completed' },
];

// Populate Transactions Table
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
  
  // Example for portfolio chart (using Chart.js)
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
  