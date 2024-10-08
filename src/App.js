import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import VotedAlbumsPage from './pages/VotedAlbumsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFound from './pages/NotFound'; 
import Header from './components/Header';
import { AuthProvider } from './AuthContext'; 
import PrivateRoute from './components/PrivateRoute'; 
import AdminRoute from './components/AdminRoute'; 
import RadminRoute from './components/RadminRoute'; 
import AdminPage from './pages/AdminPage'; 
import RolesPage from './pages/RolesPage'; 
import './App.css';
import ChangePasswordPage from './pages/ChangePasswordPage';

const App = () => {
  return (
    <AuthProvider> 
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<PrivateRoute element={<UserPage />} />} />
            <Route path="/voted-albums" element={<PrivateRoute element={<VotedAlbumsPage />} />} />
            <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
            <Route path="/roles" element={<RadminRoute element={<RolesPage />} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/passw" element={<ChangePasswordPage />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
