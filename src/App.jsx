// Componente principal que une el formulario y el listado
import './App.css';
import { BookForm } from './components/bookForm';
import { BookList } from './components/bookList';

function App() {
  // Estado para activar el modo de datos corruptos (demostración del BONUS)
  return (
    <main className='app'>
      <h1>Biblioteca de reseñas</h1>
      <BookForm />
      <BookList />
    </main>
  );
}

export default App;