// import metamaskStore from "stores/MetamaskStore";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";

export const networks = {
    mainnet: "0x1", // 1

    // Test nets
    goerli: "0x5", // 5
    ropsten: "0x3", // 3
    rinkeby: "0x4", // 4
    kovan: "0x2a", // 42
    mumbai: "0x13881", // 80001

    // Layers 2
    arbitrum: "0xa4b1", // 42161
    optimism: "0xa", // 10

    // Side chains
    polygon: "0x89", // 137
    gnosisChain: "0x64", // 100

    // Alt layer 1
    binanceSmartChain: "0x38", // 56
    avalanche: "0xa86a", // 43114
    cronos: "0x19", // 25
    fantom: "0xfa", // 250
};

const useMetamask = () => {
    // const provider = metamaskStore.use.provider();

    const { status, connect, account, chainId, ethereum, switchChain } =
        useMetaMask();

    const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();

    if (status === "initializing")
        console.log("Synchronisation with MetaMask ongoing...");
    if (status === "unavailable") console.log("MetaMask not available :(");
    if (status === "notConnected") console.log("Connect to MetaMask");
    if (status === "connecting") console.log("Connecting...");

    if (status === "connected") {
        // console.log(`Connected account ${account} on chain ID ${chainId}`);

        // goerli only pls
        if (chainId !== networks.goerli) {
            console.warn("🔥 This App is under dev. Please switch to goerli. 🔥");
        }
    }

    return {
        signer,
        status,
        connect,
        isGoerli: chainId === networks.goerli,
        switchChain,
        account,
    };
};

export default useMetamask;
