import React from "react";
import DiscussionSvg from "svgs/DiscussionSvg";
import QuadraticVoter from "components/QuadraticVoter";

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

    return (
        <div className="border-white border-solid border-2 rounded-md p-2 flex flex-col items-center gap-2">
            <h3 className="font-bold text-[24px]">{proposal.title}</h3>
            <span>{proposal.description}</span>
            <div id="icons" className="flex justify-end mb-1">
                <span className="flex items-center gap-1">
                    <DiscussionSvg /> 1 Discussion
                </span>
            </div>
            <div className="flex h-6 rounded-md overflow-hidden w-[100%]">
                <div
                    className={`bg-red-500 w-[${percentNay}%] h-[100%]`}
                    style={{ width: `${percentNay}%` }}
                />
                <div
                    className={`bg-green-500 h-[100%]`}
                    style={{ width: `${percentYay}%` }}
                />
            </div>
            <QuadraticVoter />
        </div>
    );
};

export default ProposalSummaryCard;
