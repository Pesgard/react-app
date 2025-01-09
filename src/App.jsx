import { useState } from 'react';
import Diagnosticar from './components/Diagnosticar';
import DeterminarPesos from './components/DeterminarPesos';
import OptimizarTratamientos from './components/OptimizarTratamientos';

function App() {
    const [diagnostico, setDiagnostico] = useState(null);
    const [pesos, setPesos] = useState(null);
    const [tratamientos, setTratamientos] = useState([]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sistema de Diagnóstico y Tratamiento</h1>
            {!diagnostico && <Diagnosticar setDiagnostico={setDiagnostico} />}
            {diagnostico && diagnostico !== "Saludable" && !pesos && <DeterminarPesos setPesos={setPesos} />}
            {pesos && <OptimizarTratamientos enfermedad={diagnostico} pesos={pesos} setTratamientos={setTratamientos} />}
            {diagnostico === "Saludable" && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Diagnóstico: Saludable</h2>
                    <p>No hay necesidad de tratamientos.</p>
                </div>
            )}
            {tratamientos.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Tratamientos Optimizados:</h2>
                    <ul>
                        {tratamientos.map((tratamiento, index) => (
                            <li key={index} className="mt-2">
                                {tratamiento.nombre} (Efectividad: {tratamiento.effectiveness}, Costo: {tratamiento.cost}, Tiempo: {tratamiento.time})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;