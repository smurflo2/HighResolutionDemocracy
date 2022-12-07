import React, { useState } from "react";
import { Link } from "react-router-dom";

const Propose: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handlePropose = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆");
        console.log("title:", title);
        console.log("description:", description);
        console.log("TODO ethers and whatnot");

        // probably reroute to proposal page?
        setTitle("");
        setDescription("");
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

                <button type="submit" className="mx-auto">
                    Propose
                </button>
            </form>

            <Link to="/">
                <button className="absolute top-1 left-1">Home</button>
            </Link>
        </section>
    );
};

export default Propose;
