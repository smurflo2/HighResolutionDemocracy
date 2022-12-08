import React, { useEffect } from "react";
import { ethers } from "ethers";
import "styles/home.scss";
import { Link } from "react-router-dom";
import ProposalSummaryCard, { Proposal } from "components/ProposalSummaryCard";

import useMetamask, { networks } from "hooks/useMetamask";
import useGetAllProposals from "hooks/useGetAllProposals";
import useGetBalance from "hooks/useGetBalance";

const Home: React.FC = () => {
    const { status, connect, isGoerli, switchChain, account } = useMetamask();
    const { data } = useGetAllProposals();
    const { data: voteTokensBig, refreshData } = useGetBalance(account ?? "");

    useEffect(() => {
        refreshData();
    }, [account]);

    // console.log("🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆");
    // console.log("data:", data);
    // console.log("voteTokens:", voteTokensBig);

    let voteTokens = "...";
    if (voteTokensBig.length !== 0) {
        voteTokens = ethers.utils.formatUnits(voteTokensBig, 0);
    }
    // const data: Proposal[] = [
    //     {
    //         title: "Make unicorns real",
    //         description:
    //             "The travelling wizard says he can make unicorns real for 10 gp. Should we do it?",
    //         yVotes: ethers.BigNumber.from(5),
    //         nVotes: ethers.BigNumber.from(3),
    //     },
    //     {
    //         title: "Legalize weed!",
    //         description:
    //             "Legalize cannabis nation wide. Expunge all records of minor possesion charges and release non-violent offendors from prison.",
    //         yVotes: ethers.BigNumber.from(88),
    //         nVotes: ethers.BigNumber.from(12),
    //     },
    //     {
    //         title: "Drill for oil in Kevin's backyard",
    //         description:
    //             "I'm telling you, it's a GOLD MINE (not literally). We can all split the profits! Sux to be Kevin lol",
    //         yVotes: ethers.BigNumber.from(3),
    //         nVotes: ethers.BigNumber.from(22),
    //     },
    // ];

    if (status === "connected" && !isGoerli) {
        return (
            <section className="flex flex-col justify-center items-center h-[100vh] mt-[-20%]">
                <h1 className="text-[42px]">⚠️ Please switch to goerli test net ⚠️</h1>
                <button className="btn-1" onClick={() => switchChain(networks.goerli)}>
                    Switch to goerli
                </button>
            </section>
        );
    }

    return (
        <>
            <section className="flex flex-col items-center">
                <h1>Home</h1>
                <div className="flex gap-2 justify-center">
                    <Link to="/propose">
                        <button className="btn-1">Propose</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn-1">Register</button>
                    </Link>
                </div>

                {status === "notConnected" && (
                    <button className="btn-1 mt-2" onClick={connect}>
                        Connect to Metamask
                    </button>
                )}

                <section className="flex flex-col gap-4 mt-6">
                    <h2 className="text-[28px] font-bold underline">Active Proposals</h2>
                    {!data && <span>Loading...</span>}
                    {data &&
                        data.map((proposal, index) => {
                            return <ProposalSummaryCard key={index} proposal={proposal} />;
                        })}
                </section>

                <div className="absolute top-0 right-0 p-2 bg-gray-900 rounded-bl-md">
                    Vote Tokens: {voteTokens}
                </div>
            </section>
        </>
    );
};

export default Home;
