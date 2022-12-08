import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useCall } from "@usedapp/core";
import useMetamask from "hooks/useMetamask";

import voteContractAbi from "contractInfo/VoteContractAbi.json";
import { contractAddress } from "contractInfo/voteContractInfo";

const voteContractInterface = new ethers.utils.Interface(voteContractAbi);

const useVoteContractCall = (methodName: string) => {
    /* const [data]: any =
                                  useContractCall({
                                      abi: voteContractInterface,
                                      address: contractAddress,
                                      method: methodName,
                                      args: [],
                                  }) ?? []; */
    const { signer } = useMetamask();

    const contract = new Contract(contractAddress, voteContractInterface, signer);
    const { value: data, error } = useCall({
        contract,
        method: methodName,
        args: [],
    }) ?? { value: undefined, error: undefined };

    if (error) {
        console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
        console.log("error:", error);
    }

    /* const getData = async () => {
            const data = await contract.getAllProposals();
            console.log("🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧");
            console.log("data:", data);
        };
    
        getData(); */

    // return {};
    return { data };
};

export default useVoteContractCall;
