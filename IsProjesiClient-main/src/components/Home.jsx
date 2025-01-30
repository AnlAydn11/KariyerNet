import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function Home() {
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [filteredJobTitles, setFilteredJobTitles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const citiesResponse = await axios.get("http://localhost:5050/cities");
        setCities(citiesResponse.data);

        const jobsResponse = await axios.get("http://localhost:5050/jobs");
        const uniqueTitles = [
          ...new Set(jobsResponse.data.map((job) => job.title)),
        ];
        setJobTitles(uniqueTitles);
      } catch (error) {
        console.error("Veriler alınırken bir hata oluştu:", error);
      }
    }
    fetchData();
  }, []);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value) {
      const filtered = cities.filter((c) =>
        c.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    if (value) {
      const filtered = jobTitles.filter((t) =>
        t.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobTitles(filtered);
    } else {
      setFilteredJobTitles([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/jobDetail", { state: { city, title } });
  };

  return (

    <div className="container-fluid mt-4" id="ana_container">

      <h1 style={{ color: "white" }}>KARİYER FIRSATLARINI KEŞFET</h1>
      <h3 style={{ color: "white" }}>65.200 iş ilanı on binlerce şirket</h3>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="row g-3 position-relative">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Şehir"
              value={city}
              onChange={handleCityChange}
            />
            {filteredCities.length > 0 && (
              <ul className="list-group position-absolute w-100">
                {filteredCities.map((c, index) => (
                  <li
                    key={index}
                    className="list-group-item"
                    onClick={() => {
                      setCity(c);
                      setFilteredCities([]);
                    }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Pozisyon"
              value={title}
              onChange={handleTitleChange}
            />
            {filteredJobTitles.length > 0 && (
              <ul className="list-group position-absolute w-100">
                {filteredJobTitles.map((t, index) => (
                  <li
                    key={index}
                    className="list-group-item"
                    onClick={() => {
                      setTitle(t);
                      setFilteredJobTitles([]);
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              İş İlanı Ara
            </button>
          </div>
        </div>
      </form>



    </div>




  );
}
