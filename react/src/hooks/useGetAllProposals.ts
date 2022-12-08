import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import useMetamask from "hooks/useMetamask";

import voteContractAbi from "contractInfo/VoteContractAbi.json";
import { contractAddress } from "contractInfo/voteContractInfo";

const voteContractInterface = new ethers.utils.Interface(voteContractAbi);

const useGetAllProposals = () => {
    const [data, setData] = useState([]);
    const { signer } = useMetamask();

    const contract = new Contract(contractAddress, voteContractInterface, signer);

    const getData = async () => {
        const data = await contract.getAllProposals();
        setData(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return { data, refreshData: getData };
};

export default useGetAllProposals;
