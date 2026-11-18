import { z } from 'zod'

// Campos base (también los reutiliza api.js)
export const esquemaBase = z.object({
    titulo: z.string().min(2, "El título tiene que tener mínimo 2 caracteres"),
    autor: z.string().min(2, "El autor tiene que tener mínimo 2 caracteres"),
    isbn: z.string().regex(/^(?:\d{9}X|\d{10}|\d{13})$/, 'ISBN inválido (debe ser de 10 o 13 dígitos)'),
    puntuacion: z.coerce.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas'),
    reseña: z.string().min(15, 'La reseña debe ser de al menos 15 caracteres').max(300, 'Máximo 300 caracteres'),
});

// Esquema que se enseña al usuario
export const esquemaLibro = esquemaBase.refine(
    datos => datos.titulo.trim().toLowerCase() !== datos.autor.trim().toLowerCase(),
    {
        message: "El título del libro no puede ser igual al nombre del autor.",
        path: ["titulo"], // Asociar el error al campo de título
    }
);
