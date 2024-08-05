import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import VotedAlbumsPage from './pages/VotedAlbumsPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound'; 
import Header from './components/Header';
import { AuthProvider } from './AuthContext'; 
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import './App.css';

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;



