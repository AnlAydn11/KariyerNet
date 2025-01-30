import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/Contexts/AuthContext";

export default function NavBar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    <img src="/Knet_img_KnetLogoHeader.76801b2.svg" alt="Logo" />
                </Link>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="languageDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                TR
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                                <li>
                                    <button className="dropdown-item" onClick={() => alert("TR Seçildi")}>
                                        Türkçe
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={() => alert("EN Seçildi")}>
                                        English
                                    </button>
                                </li>
                            </ul>
                        </li>


                        {user ? (
                            <ul style={{ listStyle: 'none' }}>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="/#"
                                        id="authDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {user.name || "Kullanıcı"}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="authDropdown">
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={logout}
                                            >
                                                Çıkış Yap
                                            </button>
                                        </li>
                                    </ul>

                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        Profil
                                    </Link>
                                </li>
                            </ul>


                        ) : (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="authDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Giriş Yap/Üye Ol
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="authDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/login">
                                            Giriş Yap
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/register">
                                            Üye Ol
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
