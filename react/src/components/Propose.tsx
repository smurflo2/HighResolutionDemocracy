import React, { useState } from "react";
import { Link } from "react-router-dom";

import useVoteContract from "hooks/useVoteContract";

const Propose: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [districtId, setDistrictId] = useState(1);

    const { send: submitProposal } = useVoteContract("createProposal");

    const handlePropose = (e: React.FormEvent) => {
        e.preventDefault();

        submitProposal(title, description, districtId)
            .then((res: any) => console.log(res))
            .catch((res: any) => console.log(res));

        // probably reroute to proposal page?
        setTitle("");
        setDescription("");
        setDistrictId(1);
    };

    return (
        <section className="flex flex-col items-center">
            <h1>Propose Something!</h1>
            <form onSubmit={handlePropose} className="flex flex-col gap-3 w-96">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Voter District Id"
                    value={districtId}
                    onChange={(e) => setDistrictId(parseInt(e.target.value))}
                />

                <button type="submit" className="btn-1 mx-auto">
                    Propose
                </button>
            </form>

            <Link to="/">
                <button className="btn-1 absolute top-1 left-1">Home</button>
            </Link>
        </section>
    );
};

export default Propose;
