import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";

import voteContractAbi from "contractInfo/VoteContractAbi.json";
import { contractAddress } from "contractInfo/voteContractInfo";

import useMetamask from "hooks/useMetamask";

const useVoteContract = (methodName: string) => {
    const { signer } = useMetamask();

    const contract = new Contract(contractAddress, voteContractAbi, signer);
    const { state, send } = useContractFunction(contract, methodName, {});
    return { state, send };
};

export default useVoteContract;
