import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState(""); 
  const [city, setCity] = useState(""); 

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5050/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password, country, city }),
      });

      if (response.ok) {
        alert("Kayıt başarılı!");
      } else {
        alert("Kayıt sırasında bir hata oluştu!");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  }

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <h2>Kayıt Ol</h2>
      <div className="mb-3">
        <label>Ad:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ad"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Soyad:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Soyad"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
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
      <div className="mb-3">
        <label>Şifre (Tekrar):</label>
        <input
          type="password"
          className="form-control"
          placeholder="Şifre (Tekrar)"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Ülke:</label>
        <select
          className="form-control"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Ülke Seçiniz</option>
          <option value="Türkiye">Türkiye</option>
          <option value="ABD">ABD</option>
          <option value="Almanya">Almanya</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Şehir:</label>
        <select
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Şehir Seçiniz</option>
          <option value="İstanbul">İstanbul</option>
          <option value="Ankara">Ankara</option>
          <option value="İzmir">İzmir</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Kayıt Ol
      </button>
    </form>
  );
}
