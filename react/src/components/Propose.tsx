import React from "react";

const Propose: React.FC = () => {
    const handlePropose = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("TODO ethers and whatnot");
    };

    return (
        <section className="flex flex-col items-center">
            <h1>Propose Something!</h1>
            <form onSubmit={handlePropose} className="flex flex-col gap-3 w-96">
                <input type="text" placeholder="Title" />
                <textarea placeholder="Description" />

                <button type="submit" className="mx-auto">
                    Propose
                </button>
            </form>
        </section>
    );
};

export default Propose;
