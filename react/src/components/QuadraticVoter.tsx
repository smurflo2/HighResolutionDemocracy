import React, { useState } from "react";
import { ethers } from "ethers";
import Arrow from "svgs/ArrowSvg";

import useVoteContract from "hooks/useVoteContract";

type QuadraticVoterProps = {
    proposalID: ethers.BigNumber;
};

const QuadraticVoter: React.FC<QuadraticVoterProps> = ({ proposalID }) => {
    const [votes, setVotes] = useState(0);
    const cost = votes * votes;

    const { send: submitVote } = useVoteContract("vote");
    // TODO if we had the proposal state STOREd somewhere shared then the arrows could update in real time

    const handleArrowClick = (isUp: boolean) => {
        if (isUp) setVotes(votes + 1);
        else setVotes(votes - 1);
    };

    const handleSubmit = () => {
        const idNumber = parseInt(ethers.utils.formatUnits(proposalID, 0));
        submitVote(idNumber, Math.abs(votes), votes > 0);
    };

    const arrowSize = "24px";
    return (
        <div className="flex flex-col items-center">
            {/* TODO make the arrows flinch on click */}
            <div className="flex gap-2 items-center bg-slate-300 rounded-lg py-2 px-4">
                <Arrow
                    direction="down"
                    size={arrowSize}
                    onClick={() => handleArrowClick(false)}
                />
                <span className="text-black text-[22px]">{votes}</span>
                <Arrow
                    direction="up"
                    size={arrowSize}
                    onClick={() => handleArrowClick(true)}
                />
            </div>

            {/* TODO animate this */}
            {cost > 0 && (
                <>
                    <div className="bg-slate-200 rounded-b-md text-slate-700 w-[60%]">
                        Cost: {cost}
                    </div>

                    <button className="btn-1 mt-2" onClick={handleSubmit}>
                        Submit
                    </button>
                </>
            )}
        </div>
    );
};

export default QuadraticVoter;
