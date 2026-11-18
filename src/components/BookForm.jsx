import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { esquemaLibro } from '../schemas/BookSchema';
import { crearLibro } from '../api/api'
import { Status } from './Status';

export function BookForm() {
    const queryCliente = useQueryClient();
    const { register, reset, handleSubmit, formState: { errors } } = useForm({resolver:zodResolver(esquemaLibro)});
    
    const mutacion = useMutation({ mutationFn: crearLibro, onSuccess: () => {
        reset(); // Limpia después
        queryCliente.invalidateQueries({ queryKey: ["libros"] }); // Invalidamos libros
        },
    });
    const onSubmit = datos => { mutacion.mutate(datos) };  // POST a la API

return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2>Añadir libro</h2>

            <div className="campo">
                <label htmlFor="titulo">Título</label>
                <input id="titulo" aria-invalid={!!errors.titulo} {...register("titulo")} />
                {errors.titulo && <p className="error" role="alert">{errors.titulo.message}</p>}
            </div>

            <div className="campo">
                <label htmlFor="autor">Autor</label>
                <input id="autor" aria-invalid={!!errors.autor} {...register("autor")} />
                {errors.autor && <p className="error" role="alert">{errors.autor.message}</p>}
            </div>

            <div className="campo">
                <label htmlFor="isbn">ISBN</label>
                <input id="isbn" aria-invalid={!!errors.isbn} {...register("isbn")} />
                {errors.isbn && <p className="error" role="alert">{errors.isbn.message}</p>}
            </div>

            <div className="campo">
                <label htmlFor="puntuacion">Puntuación (1-5)</label>
                <input id="puntuacion" type="number" aria-invalid={!!errors.puntuacion} {...register("puntuacion")} />
                {errors.puntuacion && <p className="error" role="alert">{errors.puntuacion.message}</p>}
            </div>

            <div className="campo">
                <label htmlFor="reseña">Reseña</label>
                <textarea id="reseña" rows={4} aria-invalid={!!errors.reseña} {...register("reseña")} />
                {errors.reseña && <p className="error" role="alert">{errors.reseña.message}</p>}
            </div>

            <button type="submit" disabled={mutacion.isPending}>
                {mutacion.isPending ? "Guardando..." : "Guardar libro"}
            </button>

            {mutacion.isError && <Status tipo="error">No se pudo guardar: {mutacion.error.message}</Status>}
            {mutacion.isSuccess && <Status tipo="exito">Libro guardado correctamente.</Status>}
        </form>
    );
}
