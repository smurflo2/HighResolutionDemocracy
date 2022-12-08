import { BrowserRouter, Routes, Route } from "react-router-dom";
import "styles/app.scss";

import Home from "components/Home";
import Propose from "components/Propose";

import { MetaMaskProvider } from "metamask-react";

function App() {
    return (
        <BrowserRouter>
            <MetaMaskProvider>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/propose" element={<Propose />} />
                    </Routes>
                </main>
            </MetaMaskProvider>
        </BrowserRouter>
    );
}

export default App;
