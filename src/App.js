import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header'; // Assurez-vous que cette ligne est ajoutée
import ExerciceList from './components/exercices';
import ModifierExercice from './components/ModifierExercice'
import AddExercice from './components/AjouterExercice';
function App() {
  return (
    <Router>
      <Header /> {/* Affiche le composant Header */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Exercices" element={<ExerciceList />} />
        <Route path="/modifierExercices/:id" element={<ModifierExercice />} />
        <Route path="/AjouterExercies" element={<AddExercice />} />
      </Routes>
    </Router>
  );
}

export default App;
