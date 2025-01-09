import React, { useState } from 'react';
import axios from 'axios';

const DeterminarPesos = ({ setPesos }) => {
    const [preferencias, setPreferencias] = useState([0, 0, 0]);
    const [error, setError] = useState(null);

    const handleChange = (index) => (event) => {
        const value = parseInt(event.target.value);
        const newPreferencias = [...preferencias];
        newPreferencias[index] = value;
        setPreferencias(newPreferencias);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/determinar_pesos', { preferencias });
            setPesos(response.data.pesos);
            setError(null);
        } catch (err) {
            setError('Error al determinar los pesos.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Determinar Pesos</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label className="block mb-2">¿Prefieres tratamientos más efectivos?</label>
                    <select onChange={handleChange(0)} className="border p-2">
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">¿Prefieres tratamientos con inyecciones?</label>
                    <select onChange={handleChange(1)} className="border p-2">
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">¿Prefieres tratamientos más cómodos?</label>
                    <select onChange={handleChange(2)} className="border p-2">
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Determinar Pesos</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default DeterminarPesos;