import { useQuery } from "@tanstack/react-query";
import { obtenerLibros } from "../api/api";
import { Status } from "./Status";

export function BookList() {
    const { data: libros, isPending, isError, error } = useQuery({
        queryKey: ["libros"],
        queryFn: obtenerLibros, // Cuando guarda libro nuevo, vuelve a ejecutar obtenerLibros sin recargar la página
    });

    if (isPending) {
        return <Status tipo="cargando">Cargando libros...</Status>;
    }

    if (isError) {
        return <Status tipo="error">Error al cargar los libros: {error.message}</Status>;
    }

    return (
        <div>
            <h2>Listado de libros</h2>
            {libros.length === 0 ? (
                <p>No hay libros registrados.</p>
            ) : (
                <ul>
                    {libros.map((libro) => (
                        <li key={libro.id}>
                            <strong>{libro.titulo} de {libro.autor}</strong>
                            <span>ISBN: {libro.isbn}</span> | <span>Puntuación: {libro.puntuacion}</span>
                            <p>{libro.reseña}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
