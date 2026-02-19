const hre = require("hardhat");

async function main() {
    console.log("🚀 Deploying ComplianceLog to Sepolia...\n");

    const [deployer] = await hre.ethers.getSigners();
    console.log("Deployer address:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Deployer balance:", hre.ethers.formatEther(balance), "ETH\n");

    // Deploy
    const ComplianceLog = await hre.ethers.getContractFactory("ComplianceLog");
    const contract = await ComplianceLog.deploy();
    await contract.waitForDeployment();

    const address = await contract.getAddress();
    console.log("✅ ComplianceLog deployed to:", address);
    console.log("\n📝 Add this to your .env:");
    console.log(`COMPLIANCE_CONTRACT_ADDRESS=${address}`);
    console.log("\n🔗 Etherscan: https://sepolia.etherscan.io/address/" + address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
