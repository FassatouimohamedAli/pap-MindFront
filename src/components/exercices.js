import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

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
        const isConfirmed = window.confirm('Etes-vous sûr de vouloir supprimer cet Exercice ?');

        if (!isConfirmed) {
            return;
        }

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
                setExercices(exercices.filter(exercice => exercice.id !== id));
                setFilteredExercices(filteredExercices.filter(exercice => exercice.id !== id));
            } else {
                setError('Échec de la suppression de l\'exercice.');
            }
        } catch (error) {
            setError('Une erreur est survenue lors de la suppression de l\'exercice.');
        }
    };

    const handleEdit = (id) => {
        navigate(`/modifierExercices/${id}`);
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = exercices.filter((exercice) =>
            exercice.nom.toLowerCase().includes(query)
        );
        setFilteredExercices(filtered);
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center text-success">Exercices Mind Fit </h2>

            {/* Champ de recherche */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher par nom..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="card shadow-lg border-success">
                <div className="card-body">
                    <table className="table table-hover table-striped">
                        <thead className="table-success">
                            <tr>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Durée</th>
                                <th>Type</th>
                                <th>Fréquence Recommandée</th>
                                <th>Humeur de l'Exercice</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExercices.map((exercice) => (
                                <tr key={exercice.id}>
                                    <td>{exercice.nom}</td>
                                    <td>{exercice.description}</td>
                                    <td>{exercice.duree}</td>
                                    <td>{exercice.type}</td>
                                    <td>{exercice.frequence_recommandee}</td>
                                    <td>{exercice.exerciceHumeur}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-between">
                                            <button
                                                className="btn btn-outline-success btn-sm"
                                                onClick={() => handleEdit(exercice.id)}
                                            >
                                                <FaPen /> Modifier
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDelete(exercice.id)}
                                            >
                                                <FaTrash /> Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExerciceList;
