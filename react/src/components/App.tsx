import { BrowserRouter, Routes, Route } from "react-router-dom";
import "styles/app.scss";

import Home from "components/Home";
import Propose from "components/Propose";

function App() {
    return (
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/propose" element={<Propose />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
