import streamlit as st
import xrpl

# Sidebar navigation
st.sidebar.title("Carbon Token Dashboard")
st.sidebar.write("Wallet: [User Wallet Address]")

# Display user balance
st.title("Dashboard")
balance = 100  # Example balance
st.metric(label="Token Balance", value=f"{balance} CTN")

# Recent Transactions
st.subheader("Recent Transactions")
transactions = {"Date": ["2025-01-04"], "Action": ["Buy"], "Amount": [10]}
st.table(transactions)
