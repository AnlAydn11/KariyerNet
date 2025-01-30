import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/Contexts/AuthContext"; 

export default function JobsInnerDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    async function fetchJobDetail() {
      try {
        const response = await axios.get(`https://kariyernet-6.onrender.com/jobs/${id}`); 
        setJob(response.data); 
        setLoading(false); 
      } catch (err) {
        console.error("İş ilanı detayları alınırken hata oluştu:", err);
        setError("İş ilanı bulunamadı."); 
        setLoading(false); 
      }
    }
    fetchJobDetail();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      navigate("/login"); 
      return;
    }

    try {
      const response = await axios.post(
        "https://kariyernet-6.onrender.com/apply",
        { jobId: id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(response.data.message); 
    } catch (error) {
      console.error("Başvuru sırasında hata oluştu:", error);
      alert(error.response.data.message || "Başvuru sırasında hata oluştu.");
    }
  };

  if (loading) return <div>Yükleniyor...</div>; 
  if (error) return <div>{error}</div>; 

  return (
    <div className="container mt-4">
      <h1>İş İlanı Detayları</h1>
      <div className="card">
        <div className="card-body">
          <h2>{job.title}</h2>
          <p><strong>Konum:</strong> {job.location}</p>
          <p><strong>Açıklama:</strong> {job.description}</p>
          <p><strong>Çalışma Tercihi:</strong> {job.workPreference || "Belirtilmemiş"}</p>
          <p><strong>Ülke:</strong> {job.country || "Belirtilmemiş"}</p>
          <p><strong>İlçe:</strong> {job.town || "Belirtilmemiş"}</p>
          <button className="btn btn-primary" onClick={handleApply}>
            Başvur
          </button>
        </div>
      </div>
    </div>
  );
}
