import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/NavBar';
import GamePage from './pages/GamePage';
import PlayPage from './pages/PlayPage';

const AppRoutes = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:gameId" element={<GamePage />} />
                <Route path="/game/:gameId/:roomId" element={<PlayPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
