import React, { useState } from "react";
import { Link } from "react-router-dom";
import useVoteContract from "hooks/useVoteContract";

const Register: React.FC = () => {
    const [districtId, setDistrictId] = useState(1);

    const { send: submitRegistration } = useVoteContract("registerVoter");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        submitRegistration(districtId)
            .then((res: any) => console.log("res:", res))
            .catch((res: any) => {
                console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
                console.log("res:", res);
            });
    };

    return (
        <section className="flex flex-col items-center">
            <h1>Register</h1>
            <form onSubmit={handleRegister} className="flex flex-col gap-3 w-96">
                <input
                    type="number"
                    placeholder="Voter District Id"
                    value={districtId}
                    onChange={(e) => setDistrictId(parseInt(e.target.value))}
                />

                <button type="submit" className="btn-1 mx-auto">
                    Register
                </button>
            </form>

            <Link to="/">
                <button className="btn-1 absolute top-1 left-1">Home</button>
            </Link>
        </section>
    );
};

export default Register;
