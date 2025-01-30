import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function JobDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialFilters = location.state || { city: "", title: "" }; 
  const [filters, setFilters] = useState(initialFilters);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);

  
  useEffect(() => {
    async function fetchFilterData() {
      try {
        const response = await axios.get("https://kariyernet-6.onrender.com/filters");
        setCountries(response.data.countries);
        setCities(response.data.cities);
        setTowns(response.data.towns);
      } catch (error) {
        console.error("Filtre seçenekleri alınırken hata oluştu:", error);
      }
    }
    fetchFilterData();
  }, []);

  
  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://kariyernet-6.onrender.com/jobs", {
        params: filters,
      });
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("İlanlar alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchJobs(); 
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleJobDetail = (id) => {
    navigate(`/jobDetail/${id}`); 
  };

  return (
    <div className="container mt-4">
      <div className="row">
        
        <div className="col-md-4">
          <h2>Filtreleme</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchJobs();
            }}
          >
            <div className="mb-3">
              <label>Ülke</label>
              <select
                className="form-control"
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
              >
                <option value="">Seçiniz</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Şehir</label>
              <select
                className="form-control"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
              >
                <option value="">Seçiniz</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>İlçe</label>
              <select
                className="form-control"
                name="town"
                value={filters.town}
                onChange={handleFilterChange}
              >
                <option value="">Seçiniz</option>
                {towns.map((town, index) => (
                  <option key={index} value={town}>
                    {town}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Filtre Uygula
            </button>
          </form>
        </div>

      
        <div className="col-md-8">
          <h1>Filtrelenmiş İş İlanları</h1>
          <ul className="list-group">
            {filteredJobs.map((job) => (
              <li key={job.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{job.title}</h5>
                  <p>{job.location}</p>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleJobDetail(job._id)} 
                >
                  Detayları Gör
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
