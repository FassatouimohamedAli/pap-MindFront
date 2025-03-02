import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const AddExercice = () => {
    const [exercice, setExercice] = useState({
        nom: '',
        description: '',
        duree: '',
        frequence_recommandee: '',
        exerciceHumeur: '',
        type: '',
        url: ''
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

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center text-primary fw-bold">Ajouter un Exercice</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="card shadow-sm">
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="nom">Nom</Form.Label>
                            <Form.Control
                                type="text"
                                id="nom"
                                name="nom"
                                value={exercice.nom}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="description"
                                name="description"
                                value={exercice.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="duree">Durée</Form.Label>
                            <Form.Control
                                type="number"
                                id="duree"
                                name="duree"
                                value={exercice.duree}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="humeur">Humeur de l'Exercice</Form.Label>
                            <Form.Control
                                as="select"
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
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="url">Vidéo</Form.Label>
                            <Form.Control
                                type="url"
                                id="url"
                                name="url"
                                value={exercice.url}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="type">Type d'Exercice</Form.Label>
                            <Form.Control
                                as="select"
                                id="type"
                                name="type"
                                value={exercice.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner un type</option>
                                <option value="Conseillé">Conseillé</option>
                                <option value="Exercice">Exercice</option>
                            </Form.Control>
                        </Form.Group>

                        {/* Champ "Fréquence Recommandée" masqué si le type est "Conseillé" */}
                        {exercice.type !== 'Conseillé' && (
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="frequence_recommandee">Fréquence Recommandée</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="frequence_recommandee"
                                    name="frequence_recommandee"
                                    value={exercice.frequence_recommandee}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        )}

                        <Button type="submit" variant="primary" className="w-100 mt-3">Ajouter l'Exercice</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddExercice;
