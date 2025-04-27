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
                setError('Failed to add the exercise.');
            }
        } catch (error) {
            setError('An error occurred while adding the exercise.');
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center text-primary fw-bold">Add an Exercise</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="card shadow-sm">
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="nom">Name</Form.Label>
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
                            <Form.Label htmlFor="duree">Duration</Form.Label>
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
                            <Form.Label htmlFor="humeur">Exercise Mood</Form.Label>
                            <Form.Control
                                as="select"
                                id="exerciceHumeur"
                                name="exerciceHumeur"
                                value={exercice.exerciceHumeur}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a mood</option>

                                <option value="Happy">Happy</option>
                                <option value="Tired">Tired</option>
                                <option value="Relaxed">Relaxed</option>
                                <option value="Angry">Angry</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="url">Video</Form.Label>
                            <Form.Control
                                type="text"
                                id="url"
                                name="url"
                                value={exercice.url}
                                onChange={handleChange}
                              
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="type">Exercise Type</Form.Label>
                            <Form.Control
                                as="select"
                                id="type"
                                name="type"
                                value={exercice.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a type</option>
                                <option value="Conseil">Advice</option>
                                <option value="Exercice">Exercise</option>
                            </Form.Control>
                        </Form.Group>

                        {/* "Recommended Frequency" field hidden if type is "Recommended" */}
                        {exercice.type !== 'Exercice' && (
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="frequence_recommandee">Recommended Frequency</Form.Label>
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

                        <Button type="submit" variant="primary" className="w-100 mt-3">Add Exercise</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddExercice;
