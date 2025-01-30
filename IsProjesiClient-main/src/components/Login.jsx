import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Contexts/AuthContext"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/login", {
        email,
        password,
      });
  
      const { token, user } = response.data;
  
      if (token && user) {
        localStorage.setItem("token", token); 
        login(user); 
        console.log("Giriş başarılı:", user);
        navigate("/"); 
      } else {
        alert("Kullanıcı bilgisi eksik. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Giriş sırasında bir hata oluştu:", error);
      alert("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  }

  function handleGoogleLogin() {
    window.location.href = "http://localhost:5050/auth/google"; 
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Giriş Yap</h2>
      <div className="mb-3">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Şifre:</label>
        <input
          type="password"
          className="form-control"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Giriş Yap
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/register")} 
        >
          Kayıt Ol
        </button>
      </div>
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleGoogleLogin} 
        >
          Google ile Giriş Yap
        </button>
      </div>
    </form>
  );
}
