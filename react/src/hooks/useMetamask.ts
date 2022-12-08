// import metamaskStore from "stores/MetamaskStore";
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

    if (status === "initializing")
        console.log("Synchronisation with MetaMask ongoing...");
    if (status === "unavailable") console.log("MetaMask not available :(");
    if (status === "notConnected") console.log("Connect to MetaMask");
    if (status === "connecting") console.log("Connecting...");

    if (status === "connected") {
        console.log(`Connected account ${account} on chain ID ${chainId}`);
        console.log("ethereum:", ethereum);

        const ERC20TransferABI = [
            {
                constant: false,
                inputs: [
                    {
                        name: "_to",
                        type: "address",
                    },
                    {
                        name: "_value",
                        type: "uint256",
                    },
                ],
                name: "transfer",
                outputs: [
                    {
                        name: "",
                        type: "bool",
                    },
                ],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [
                    {
                        name: "_owner",
                        type: "address",
                    },
                ],
                name: "balanceOf",
                outputs: [
                    {
                        name: "balance",
                        type: "uint256",
                    },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
        ];

        const myAddress = "0x3a714cACE7EFA0AB73501E74225062beAce8869B";
        // const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
        const USDC_ADDRESS = "0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557";
        // const daiToken = new ethereum.Contract(ERC20TransferABI, DAI_ADDRESS)
        const usdcToken = new ethereum.Contract(ERC20TransferABI, USDC_ADDRESS);

        usdcToken.methods.balanceOf(myAddress).then((x: any) => {
            console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
            console.log("x:", x);
        });

        // goerli only pls
        if (chainId !== networks.goerli) {
            console.warn("🔥 This App is under dev. Please switch to goerli. 🔥");
        }
    }

    return {
        status,
        connect,
        isGoerli: chainId === networks.goerli,
        switchChain,
    };
};

export default useMetamask;
