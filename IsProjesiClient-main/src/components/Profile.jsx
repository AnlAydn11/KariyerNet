import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5050/profileDetail/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError("Başvurular alınırken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h1>Profil Sayfası</h1>
      <h2>Yaptığınız Başvurular</h2>
      {applications.length === 0 ? (
        <p>Henüz bir başvuru yapmadınız.</p>
      ) : (
        <ul className="list-group">
          {applications.map((application) => (
            <li key={application._id} className="list-group-item">
              <h5>{application.jobId?.title || "Başlık mevcut değil"}</h5>
              <p>{application.jobId?.location || "Konum mevcut değil"}</p>
              <p>{application.jobId?.description || "Açıklama mevcut değil"}</p>
              <p><strong>Başvuru Tarihi:</strong> {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : "Tarih mevcut değil"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
