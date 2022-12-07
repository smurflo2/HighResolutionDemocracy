import React from "react";
import { Link } from "react-router-dom";
import "styles/home.scss";

const Home: React.FC = () => {
    return (
        <section>
            <h1 className="underline">Home</h1>
            <div>
                <Link to="/propose">
                    <button>Propose</button>
                </Link>
            </div>
        </section>
    );
};

export default Home;
