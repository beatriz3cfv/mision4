// Listado que consume TanStack Query con estados de carga/error/éxito (15 + 10 pts)

export default function TradeList({ corruptMode }) {
  return (
    <div className="card">
      <h2>Listado de Operaciones</h2>
      <p>Aquí se cargarán los datos con TanStack Query. (Modo corrupto: {corruptMode ? 'Activado' : 'Desactivado'})</p>
    </div>
  );
}