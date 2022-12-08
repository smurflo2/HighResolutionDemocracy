import React from "react";
import "styles/home.scss";
import { Link } from "react-router-dom";
import ProposalSummaryCard, { Proposal } from "components/ProposalSummaryCard";

import useMetamask, { networks } from "hooks/useMetamask";

const Home: React.FC = () => {
    const { status, connect, isGoerli, switchChain } = useMetamask();

    const staticProposals: Proposal[] = [
        {
            title: "Make unicorns real",
            description:
                "The travelling wizard says he can make unicorns real for 10 gp. Should we do it?",
            yayVotes: 5,
            nayVotes: 3,
        },
        {
            title: "Legalize weed!",
            description:
                "Legalize cannabis nation wide. Expunge all records of minor possesion charges and release non-violent offendors from prison.",
            yayVotes: 88,
            nayVotes: 12,
        },
        {
            title: "Drill for oil in Kevin's backyard",
            description:
                "I'm telling you, it's a GOLD MINE (not literally). We can all split the profits! Sux to be Kevin lol",
            yayVotes: 3,
            nayVotes: 22,
        },
    ];

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
            <section>
                <h1>Home</h1>
                <div>
                    <Link to="/propose">
                        <button className="btn-1">Propose</button>
                    </Link>
                </div>

                {status === "notConnected" && (
                    <button className="btn-1 mt-2" onClick={connect}>
                        Connect to Metamask
                    </button>
                )}

                <section className="flex flex-col gap-4 mt-6">
                    <h2 className="text-[28px] font-bold underline">Active Proposals</h2>
                    {staticProposals.map((proposal, index) => (
                        <ProposalSummaryCard key={index} proposal={proposal} />
                    ))}
                </section>
            </section>
        </>
    );
};

export default Home;
