import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from "./components/Login";
import Register from "./components/Register";
import GoogleCallback from './components/GoogleCallback';
import JobDetail from './components/JobsDetail';
import JobsInnerDetail from './components/JobsInnerDetail';
import Profile from './components/Profile';
import { useAuth } from './components/Contexts/AuthContext';
import { Navigate } from 'react-router-dom';


export default function App() {
  const ProtectedRoute = ({ element: Component }) => {
    const { user } = useAuth();
    return user ? <Component /> : <Navigate to="/login" />;
  };
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
        <Route path="/jobDetail/:id" element={<JobsInnerDetail />} />
        <Route path="/jobDetail" element={<JobDetail />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />

      </Routes>
    </Router>
  );
}
