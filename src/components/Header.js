import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary py-2">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">


                        {token ? (
                            <>
                                {userRole === 'COACH' && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Exercices">Exercices</Link>
                                        </li>


                                        <li className="nav-item">
                                            <Link className="nav-link" to="/AjouterExercies">Ajouter Exerices</Link>
                                        </li>

                                    </>
                                )}
                            </>
                        ) : (
                            <li className="nav-item">

                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {token && (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">
                                    Se déconnecter
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
