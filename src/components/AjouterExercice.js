import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExercice = () => {
    const [exercice, setExercice] = useState({
        nom: '',
        description: '',
        duree: '',
        frequence_recommandee: '',
        exerciceHumeur: '',
        type: '', // Nouveau champ pour le type d'exercice
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setExercice({ ...exercice, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8082/Coach/exercices', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(exercice),
            });

            if (response.ok) {
                navigate('/exercices');
            } else {
                setError('Échec de l\'ajout de l\'exercice.');
            }
        } catch (error) {
            setError('Une erreur est survenue lors de l\'ajout de l\'exercice.');
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center text-success">Ajouter un Exercice</h2>
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
                        <div className="mb-3">
                            <label className="form-label" htmlFor="humeur">Humeur de l'Exercice</label>
                            <select
                                className="form-control"
                                id="exerciceHumeur"
                                name="exerciceHumeur"
                                value={exercice.exerciceHumeur}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner une humeur</option>
                                <option value="Content">Content</option>
                                <option value="Fatigué">Fatigué</option>
                                <option value="Motivé">Motivé</option>
                                <option value="Relaxé">Relaxé</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="type">Type d'Exercice</label>
                            <select
                                className="form-control"
                                id="type"
                                name="type"
                                value={exercice.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner un type</option>
                                <option value="Conseillé">Conseillé</option>
                                <option value="Exercice">Exercice</option>
                            </select>
                        </div>
                        {/* Champ "Fréquence Recommandée" masqué si le type est "Conseillé" */}
                        {exercice.type !== 'Conseillé' && (
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

                        <button type="submit" className="btn btn-success">Ajouter l'Exercice</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddExercice;
