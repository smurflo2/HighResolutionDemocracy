import React, { useState } from "react";
import Arrow from "svgs/ArrowSvg";

const QuadraticVoter: React.FC = () => {
    const [votes, setVotes] = useState(0);
    const cost = votes * votes;

    const handleArrowClick = (isUp: boolean) => {
        if (isUp) setVotes(votes + 1);
        else setVotes(votes - 1);
    };

    const handleSubmit = () => {
        console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀");
        console.log("TODO wire this up");
    };

    const arrowSize = "24px";
    return (
        <div className="flex flex-col items-center">
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
