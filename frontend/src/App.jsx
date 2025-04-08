import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/HomePage';
import CreatePage from './pages/CreatePage';

function App() {
    return (
            <BrowserRouter>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/createpage" element={<CreatePage />} />
                            <Route path="*" element={<div>Page not found</div>} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
    );
}

export default App;
