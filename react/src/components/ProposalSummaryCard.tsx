import React from "react";
import DiscussionSvg from "svgs/DiscussionSvg";

export type Proposal = {
    title: string;
    description: string;
    yayVotes: number;
    nayVotes: number;
};

type ProposalSummaryCardProps = {
    proposal: Proposal;
};

const ProposalSummaryCard: React.FC<ProposalSummaryCardProps> = ({
    proposal,
}) => {
    // TODO beware divide by 0
    const totalVotes = proposal.yayVotes + proposal.nayVotes;
    const percentYay = (proposal.yayVotes / totalVotes) * 100;
    const percentNay = (proposal.nayVotes / totalVotes) * 100;

    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
    console.log("percentYay:", percentYay);
    console.log("percentNay:", percentNay);

    return (
        <div className="border-white border-solid border-2 rounded-md p-2">
            <h3 className="font-bold text-[24px]">{proposal.title}</h3>
            <span>{proposal.description}</span>
            <div id="icons" className="flex justify-end mb-1">
                <span className="flex items-center gap-1">
                    1 <DiscussionSvg />
                </span>
            </div>
            <div className="flex h-6 rounded-md overflow-hidden">
                <div
                    className={`bg-red-600 w-[${percentNay}%] h-[100%]`}
                    style={{ width: `${percentNay}%` }}
                />
                <div
                    className={`bg-green-600 h-[100%]`}
                    style={{ width: `${percentYay}%` }}
                />
            </div>
        </div>
    );
};

export default ProposalSummaryCard;
