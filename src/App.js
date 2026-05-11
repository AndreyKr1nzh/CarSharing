import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/modal.css';
import Header from './components/Header';
import RegisterPage from './components/LogRegPage/RegisterPage';
import LoginPage from './components/LogRegPage/LoginPage';
import AdminPanel from './components/AdminPage/AdminPanel';
import ProfilePage from './components/PersonalPage/ProfilePage';
import CatalogPage from './components/CatalogPage/CatalogPage';
import CarPage from './components/CatalogPage/CarPage';
import MapPage from './components/MapPage/MapPage';
import ForgotPasswordPage from './components/LogRegPage/ForgotPasswordPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import HomePage from './components/HomePage/HomePage';


function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const isAdmin = user && Number(user.role_id) === 1;

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <BrowserRouter>
            <Header user={user} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/catalog" element={<CatalogPage user={user} />} />
                <Route path="/cars/:id" element={<CarPage user={user} />} />  {/* ← добавить маршрут */}
                <Route path="/admin" element={
                    isAdmin ? <AdminPanel /> : <Navigate to="/login" />
                } />
                <Route path="/profile" element={
                    user ? <ProfilePage /> : <Navigate to="/login" />
                } />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;