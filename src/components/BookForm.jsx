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
                <input id="titulo" aria-invalid={!!errors.titulo} aria-describedby={errors.titulo ? "titulo-error" : undefined} {...register("titulo")} />
                {errors.titulo && <p id="titulo-error" className="error" role="alert">{errors.titulo.message}</p>}
            </div>

            <div className="campo">
                <label htmlFor="autor">Autor</label>
                <input id="autor" aria-invalid={!!errors.autor} aria-describedby={errors.autor ? "autor-error" : undefined} {...register("autor")} />
                {errors.autor && <p id="autor-error" className="error" role="alert">{errors.autor.message}</p>}
            </div>

            <div className="campo">
                <label htmlFor="isbn">ISBN</label>
                <input id="isbn" aria-invalid={!!errors.isbn} aria-describedby={errors.isbn ? "isbn-error" : undefined} {...register("isbn")} />
                {errors.isbn && <p id="isbn-error" className="error" role="alert">{errors.isbn.message}</p>}
            </div>

            <div className="campo">
                <label htmlFor="puntuacion">Puntuación (1-5)</label>
                <input id="puntuacion" type="number" aria-invalid={!!errors.puntuacion} aria-describedby={errors.puntuacion ? "puntuacion-error" : undefined} {...register("puntuacion")} />
                {errors.puntuacion && <p id="puntuacion-error" className="error" role="alert">{errors.puntuacion.message}</p>}
            </div>

            <div className="campo">
                <label htmlFor="reseña">Reseña</label>
                <textarea id="reseña" rows={4} aria-invalid={!!errors.reseña} aria-describedby={errors.reseña ? "reseña-error" : undefined} {...register("reseña")} />
                {errors.reseña && <p id="reseña-error" className="error" role="alert">{errors.reseña.message}</p>}
            </div>

            <button type="submit" disabled={mutacion.isPending}>
                {mutacion.isPending ? "Guardando..." : "Guardar libro"}
            </button>

            {mutacion.isError && <Status tipo="error">No se pudo guardar: {mutacion.error.message}</Status>}
            {mutacion.isSuccess && <Status tipo="exito">Libro guardado correctamente.</Status>}
        </form>
    );
}
