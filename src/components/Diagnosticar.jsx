import React, { useState } from 'react';
import axios from 'axios';

const Diagnosticar = ({ setDiagnostico }) => {
    const [sintomas, setSintomas] = useState(Array(6).fill(0));
    const [error, setError] = useState(null);

    const handleChange = (index) => (event) => {
        const value = parseInt(event.target.value);
        const newSintomas = [...sintomas];
        newSintomas[index] = value;
        setSintomas(newSintomas);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/diagnosticar', { sintomas });
            setDiagnostico(response.data.diagnostico);
            setError(null);
        } catch (error) {
            setError('Error al diagnosticar.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Diagnosticar Enfermedad</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                {['¿Tienes fiebre?', '¿Tienes tos?', '¿Tienes dolor de cabeza?', '¿Tienes dolor muscular?', '¿Tienes congestión nasal?', '¿Te sientes cansado?'].map((pregunta, index) => (
                    <div key={index} className="mb-2">
                        <label className="block">{pregunta}</label>
                        <select value={sintomas[index]} onChange={handleChange(index)} className="border p-2">
                            <option value={0}>No</option>
                            <option value={1}>Sí</option>
                        </select>
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Diagnosticar</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Diagnosticar;