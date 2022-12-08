import React from "react";

type ArrowSvgProps = {
    direction: "up" | "down";
    size?: string;
    onClick?: () => void;
};

const ArrowSvg: React.FC<ArrowSvgProps> = ({
    direction,
    size = "20px",
    onClick,
}) => {
    let svg;
    if (direction === "up") {
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                id="svg3474"
                viewBox="0 0 360.61 431.32"
                style={{ height: size, width: size }}
            >
                <g id="g3484">
                    <path
                        id="path3486"
                        style={{ fill: "#000000" }}
                        d="m0.213 180.2l180.2-180.2 180.2 180.2v118.85l-137.07-137.06v269.33h-87.22v-268.38l-136.32 136.32 0.213-119.06z"
                    />
                </g>
            </svg>
        );
    } else {
        // down
        svg = (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                id="svg3682"
                viewBox="0 0 360.61 431.32"
                style={{ height: size, width: size }}
            >
                <g id="g3692">
                    <path
                        id="path3694"
                        style={{ fill: "#000000" }}
                        d="m360.4 251.12l-180.2 180.2-180.2-180.2v-118.85l137.07 137.06v-269.33l87.22 0.000099182v268.38l136.32-136.32-0.21 119.06z"
                    />
                </g>
            </svg>
        );
    }

    if (onClick) {
        return <button onClick={onClick}>{svg}</button>;
    }

    return svg;
};

export default ArrowSvg;
