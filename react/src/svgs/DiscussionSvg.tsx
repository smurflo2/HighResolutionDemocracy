import React from "react";

const DiscussionSvg: React.FC = () => {
    return (
        <svg
            version="1.0"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: 16, width: 16 }}
        >
            <g fill="#fff" stroke="#000" strokeLinejoin="bevel" strokeMiterlimit="0">
                <path d="m15.5 9.5h-11v4h2v2h1l2-2h6v-4z" />
                <path d="m11.5 4.5v5h-2v2h-1l-2-2h-6v-5h11z" />
                <path d="m1.5 0.5h14v4h-9l-2 2h-1v-2h-2v-4z" />
            </g>
        </svg>
    );
};

export default DiscussionSvg;
