// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCreditValidator {
    // Struct to store claims
    struct Claim {
        address user;
        uint256 amount; // Amount of carbon offset in tons
        string proof;   // Link to proof of offset (e.g., certificate)
        bool validated;
    }

    // Mapping to store claims by ID
    mapping(uint256 => Claim) public claims;
    uint256 public nextClaimId;

    // Function to submit a claim
    function submitClaim(uint256 amount, string memory proof) public {
        claims[nextClaimId] = Claim(msg.sender, amount, proof, false);
        nextClaimId++;
    }

    // Function to validate a claim (only admin can call)
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    function validateClaim(uint256 claimId) public {
        require(msg.sender == admin, "Only admin can validate claims");
        claims[claimId].validated = true;
    }
}