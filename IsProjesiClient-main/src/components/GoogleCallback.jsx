import React, { useEffect } from "react";
import { useAuth } from "../components/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  useEffect(() => {
   
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

    
      async function fetchUserData() {
        try {
          const response = await fetch("https://kariyernet-6.onrender.com/profile", {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          if (response.ok) {
            const userData = await response.json();
            login(userData.user); 
            navigate("/"); 
          } else {
            console.error("Kullanıcı bilgileri alınamadı");
            navigate("/login"); 
          }
        } catch (error) {
          console.error("Google giriş işlemi sırasında hata:", error);
          navigate("/login");
        }
      }

      fetchUserData();
    } else {
      console.error("Token alınamadı");
      navigate("/login"); 
    }
  }, [login, navigate]);

  return <div>Yükleniyor...</div>;
}
