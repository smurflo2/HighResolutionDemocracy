import React from "react";
import "styles/home.scss";
import { Link } from "react-router-dom";
import ProposalSummaryCard, { Proposal } from "components/ProposalSummaryCard";

const Home: React.FC = () => {
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

    return (
        <section>
            <h1>Home</h1>
            <div>
                <Link to="/propose">
                    <button className="btn-1">Propose</button>
                </Link>
            </div>

            <section className="flex flex-col gap-4 mt-6">
                <h2 className="text-[28px] font-bold underline">Active Proposals</h2>
                {staticProposals.map((proposal, index) => (
                    <ProposalSummaryCard key={index} proposal={proposal} />
                ))}
            </section>
        </section>
    );
};

export default Home;
