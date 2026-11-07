// Componente principal que une el formulario y el listado
import { useState } from 'react';
import TradeForm from './components/TradeForm';
import TradeList from './components/TradeList';
import './App.css';

function App() {
  // Estado para activar el modo de datos corruptos (demostración del BONUS)
  const [corruptMode, setCorruptMode] = useState(false);

  return (
    <div className="container">
      <header>
        <h1>Diario de Operaciones de Trading</h1>
        
        { /* Botón para demostrar el Bonus de Zod safeParse */ }
        <button 
          onClick={() => setCorruptMode(!corruptMode)} 
          style={{ width: 'auto', background: corruptMode ? '#dc2626' : '#475569', marginTop: '1rem' }}
        >
          {corruptMode ? 'Datos Corruptos: ACTIVO' : 'Prueba de datos corruptos (BONUS)'}
        </button>
      </header>

      <div className="dashboard-grid">
        <section>
          <TradeForm />
        </section>
        <section>
          <TradeList corruptMode={corruptMode} />
        </section>
      </div>
    </div>
  );
}

export default App;