# Willow Emberdock (Built for Base)

Willow Emberdock is a browser-based Base diagnostic surface focused on fast verification rather than abstraction. It connects a Coinbase Wallet, validates Base chain identity, and exposes public onchain state in a transparent, read-only manner.

## What this project is about

This repository exists to support lightweight Base validation flows:
- Confirm Base RPC reachability  
- Verify chainId responses (8453 / 84532)  
- Inspect balances and transaction counts  
- Review recent block activity  
- Cross-check data using Basescan  

It is intentionally minimal and safe to run.

## Repository layout

- app/willow-emberdock.ts  
  Browser entry script that performs wallet connection and read-only RPC queries.

- config/base.networks.json  
  Static Base network definitions including RPC endpoints and explorers.

- scripts/sample-inputs.json  
  Example addresses for repeatable read-only checks.

- contracts/  
  Solidity contracts deployed to Base Sepolia for testnet validation:
  - errors.sol — improves safety and reduces gas costs
  - ERC20.sol — tracks balances and total supply  

- package.json  
  Dependency manifest referencing Base and Coinbase repositories.

- README.md  
  Primary technical documentation.

## Network scope

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  

## Tooling references

This project intentionally pulls from official ecosystems:
- Coinbase Wallet SDK for EIP-1193 wallet connectivity  
- OnchainKit references for Base-aligned primitives  
- viem for typed, efficient read-only RPC access  
- Multiple Base and Coinbase GitHub repositories as dependencies
  
## Testnet Deployment (Base Sepolia)

As part of pre-production validation, one or more contracts may be deployed to the Base Sepolia test network to confirm correct behavior and tooling compatibility.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract errors.sol address:  
0x7b2c2B8490b05A64D92B42676AdE71190e5aFC85 

Deployment and verification:
- https://sepolia.basescan.org/address/0x7b2c2B8490b05A64D92B42676AdE71190e5aFC85 
- https://sepolia.basescan.org/0x7b2c2B8490b05A64D92B42676AdE71190e5aFC85/0#code  

Contract ERC20.sol address:  
0xfdc56D5CfD61da5d3d2d4Fd09315fA0E3DDF0dbD

Deployment and verification:
- https://sepolia.basescan.org/address/0xfdc56D5CfD61da5d3d2d4Fd09315fA0E3DDF0dbD
- https://sepolia.basescan.org/0xfdc56D5CfD61da5d3d2d4Fd09315fA0E3DDF0dbD/0#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.

## License

MIT License

Copyright (c) 2025 YOUR_NAME

## Author

GitHub: https://github.com/paste-04copilot 

Email: paste.04copilot@icloud.com  

X: https://x.com/helen_fq72 
