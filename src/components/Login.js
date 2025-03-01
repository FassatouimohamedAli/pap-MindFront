import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [formError, setFormError] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);  // To track form submission status
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });

        // Clear error message for the field being edited
        setFormError({
            ...formError,
            [e.target.name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Basic validation
        const errors = {};
        if (!credentials.email) {
            errors.email = 'Email est requis';
        } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            errors.email = 'Email est requis';
        }

        if (!credentials.password) {
            errors.password = 'mot de passe est requis';
        }

        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }

        setIsSubmitting(true);

        fetch('http://localhost:8082/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials) // Convert credentials to JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const token = data.token;
                const role = data.Role;
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                if (role == 'COACH') {
                    navigate('/Exercices');
                } 

            })
            .catch(error => {
                console.error('Error:', error);
                setFormError({ ...formError, general: 'La connexion a échoué, veuillez réessayer !' });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="my-4 " style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2 className='d-flex justify-content-center'>Login</h2>
            <form onSubmit={handleSubmit} noValidate>
                {/* General Error */}
                {formError.general && <div className="alert alert-danger">{formError.general}</div>}

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Entrez votre email"
                        className={`form-control ${formError.email ? 'is-invalid' : ''}`}
                        required
                    />
                    {formError.email && <div className="invalid-feedback">{formError.email}</div>}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Entrez votre mot de passe"
                        className={`form-control ${formError.password ? 'is-invalid' : ''}`}
                        required
                    />
                    {formError.password && <div className="invalid-feedback">{formError.password}</div>}
                </div>

                {/* Submit Button */}
                <button

                    type="submit"
                    className="btn btn-primary w-100"

                    disabled={isSubmitting}
                >
                    <FaSignInAlt className="home-button-icon" />
                    {isSubmitting ? 'Connexion en cours...' : 'Connexion'}
                </button>
            </form>
        </div>
    );
};

export default Login;
