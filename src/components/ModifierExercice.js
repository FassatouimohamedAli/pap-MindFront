import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ModifyExercice = () => {
    const { id } = useParams();
    const [exercice, setExercice] = useState({
        nom: '',
        description: '',
        duree: '',
        frequence_recommandee: '',
        exerciceHumeur: '',  // Valeur par défaut pour humeur
        type: ''  // Valeur par défaut pour type
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExercice = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8082/Coach/exercices/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setExercice(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchExercice();
    }, [id, navigate]);

    const handleChange = (e) => {
        setExercice({ ...exercice, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8082/Coach/exercices/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exercice),
            });

            if (response.ok) {
                navigate('/exercices');
            } else {
                setError('Échec de la mise à jour de l\'exercice.');
            }
        } catch (error) {
            setError('Une erreur est survenue lors de la mise à jour de l\'exercice.');
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center text-success">Modifier l'Exercice</h2>
            <div className="card shadow-lg border-success">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="nom">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom"
                                name="nom"
                                value={exercice.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={exercice.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="type">Type</label>
                            <select
                                className="form-control"
                                id="type"
                                name="type"
                                value={exercice.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="exercice">Exercice</option>
                                <option value="conseil">Conseil</option>
                            </select>
                        </div>

                        {/* Afficher "Fréquence Recommandée" uniquement si le type est "Exercice" */}
                        {exercice.type === 'exercice' && (
                            <div className="mb-3">
                                <label className="form-label" htmlFor="frequence_recommandee">Fréquence Recommandée</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="frequence_recommandee"
                                    name="frequence_recommandee"
                                    value={exercice.frequence_recommandee}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label" htmlFor="exerciceHumeur">Humeur de l'Exercice</label>
                            <select
                                className="form-control"
                                id="exerciceHumeur"
                                name="exerciceHumeur"
                                value={exercice.exerciceHumeur}
                                onChange={handleChange}
                                required
                            >
                                <option value="content">Content</option>
                                <option value="fatigue">Fatigué</option>
                                <option value="motivé">Motivé</option>
                                <option value="stressé">Stressé</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="duree">Durée</label>
                            <input
                                type="number"
                                className="form-control"
                                id="duree"
                                name="duree"
                                value={exercice.duree}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success">Mettre à jour</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModifyExercice;
