import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import VotedAlbumsPage from './pages/VotedAlbumsPage';
import LoginPage from './pages/LoginPage';
/* import SignupPage from './pages/SignupPage'; */
import NotFound from './pages/NotFound'; 
import Header from './components/Header';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import './App.css';

const App = () => {
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/voted-albums" element={<VotedAlbumsPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/signup" element={<SignupPage />} /> */}
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;


