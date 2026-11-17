import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { esquema } from '../schemas/BookSchema';

export function BookForm() {
    const { register, handleSubmit, formState: { errors } }=useForm({resolver:zodResolver(esquema)});
    const onSubmit = datos => { console.log("Datos válidos", datos) };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Título</label>
                <input {...register("titulo")} />
                <p>{errors.titulo.message}</p>
            </div>

            <div>
                <label>Autor</label>
                <input {...register("autor")} />
                <p>{errors.autor.message}</p>
            </div>

            <div>
                <label>ISBN</label>
                <input {...register("isbn")} />
                <p>{errors.isbn.message}</p>
            </div>

            <div>
                <label>Puntuación</label>
                <input {...register("puntuacion")} />
                <p>{errors.puntuacion.message}</p>
            </div>


            <div>
                <label>Reseña</label>
                <input {...register("reseña")} />
                <p>{errors.reseña.message}</p>
            </div>

        </form>
    );
}