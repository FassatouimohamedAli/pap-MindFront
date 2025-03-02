import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaTrash } from 'react-icons/fa';

const ExerciceList = () => {
    const [exercices, setExercices] = useState([]);
    const [filteredExercices, setFilteredExercices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercices = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:8082/Coach/exercices', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        navigate('/forbidden');
                    } else {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                }

                const data = await response.json();
                setExercices(data);
                setFilteredExercices(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchExercices();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet exercice ?')) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8082/Coach/exercices/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setExercices(exercices.filter(ex => ex.id !== id));
                setFilteredExercices(filteredExercices.filter(ex => ex.id !== id));
            } else {
                setError('Échec de la suppression de l\'exercice.');
            }
        } catch (error) {
            setError('Une erreur est survenue lors de la suppression de l\'exercice.');
        }
    };

    const handleEdit = (id) => navigate(`/modifierExercices/${id}`);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredExercices(exercices.filter(ex => ex.nom.toLowerCase().includes(query)));
    };

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center text-primary fw-bold">Exercices Mind Fit</h2>
            <div className="mb-4 d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control w-50 shadow-sm rounded-pill px-3"
                    placeholder="🔍 Rechercher un exercice..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover shadow-sm rounded">
                    <thead className="bg-primary text-white text-center">
                        <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Durée</th>
                            <th>Type</th>
                            <th>Fréquence</th>
                            <th>Humeur</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredExercices.length > 0 ? (
                            filteredExercices.map((ex) => (
                                <tr key={ex.id} className="align-middle">
                                    <td className="fw-bold">{ex.nom}</td>
                                    <td>{ex.description}</td>
                                    <td>{ex.duree}</td>
                                    <td>{ex.type}</td>
                                    <td>{ex.frequence_recommandee}</td>
                                    <td>{ex.exerciceHumeur}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(ex.id)}>
                                                <FaPen />
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(ex.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-muted text-center py-3">Aucun exercice trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExerciceList;
