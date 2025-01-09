import React, { useState } from 'react';
import axios from 'axios';

const OptimizarTratamientos = ({ enfermedad, pesos, setTratamientos }) => {
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/optimizar_tratamientos', { enfermedad, pesos });
            setTratamientos(response.data.tratamientos);
            setError(null);
        } catch (error) {
            setError('Error al optimizar tratamientos.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Optimizar Tratamientos</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Optimizar</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default OptimizarTratamientos;