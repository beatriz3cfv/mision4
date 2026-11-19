import { z } from 'zod';
import { esquemaBase } from '../schemas/BookSchema';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Esquema con el que se valida en la db (formulario + id)
const esquemaServidor = esquemaBase.extend({
    id: z.union([z.string(), z.number()]),
})

// GET
export async function obtenerLibros() {
    const respuesta = await fetch (`${API_URL}/libros`);
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const librosValidos = [];

    // BONUS
    for (const libro of datos) {
        const resultado = esquemaServidor.safeParse(libro);
        
        if (resultado.success) {
            librosValidos.push(resultado.data);
        } else {
            console.warn(`[BONUS] El servidor devolvió un libro inválido (ID: ${libro.id}):`, resultado.error.format());
        }
    }

    return librosValidos;
}

// POST
export async function crearLibro(nuevo) {
    const respuesta = await fetch(`${API_URL}/libros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
    });

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    return respuesta.json();
}
