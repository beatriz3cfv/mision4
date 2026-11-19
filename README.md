# Biblioteca de reseñas

App para añadir y listar reseñas de libros. Formulario con **React Hook Form + Zod** y datos del servidor con **TanStack Query v5**.

La URL de la API se puede cambiar con `VITE_API_URL` (por defecto `http://localhost:3000`).

## Decisiones
1. **Esquema**: `esquemaBase` valida el formulario, y ampliado con `id` valida la respuesta de la API.
2. **Validaciones**: texto con `.trim()`, regex de ISBN y `.refine()` asociado al título.
3. **Accesibilidad**: `aria-invalid`, `aria-describedby` apuntando al mensaje de error y `role="alert"`.

## Autopsia
Errores que se detectan en las correcciones o que veo.
- El POST fallaba porque iba a `/api` en vez de `/libros`. Tampoco devolvía ninguna función, pero porque no se llamaba a `respuesta.json`.
- La correción me dijo que no compilaría en Linux, debido a que los imports no estaban en la convención necesaria.
- Cambié "false" por false.

## Uso de IA
Usé la IA para darme un flujo de trabajo y saber en qué orden hacer el proyecto. Tras la primera revisión en la arena estuve buscando mejores prácticas para programar, por ejemplo usar false como booleano en vez de string (que es truthy).

Al principio la IA me dio el mismo esquema tanto para validar el formulario como la respuesta de la API, añadiéndole un id, pero luego pensé que sería mejor idea tener dos separados (versiones distintas). Uno es el esquema con los campos base, otro usa `refine()` para no tener el mismo nombre de título y autor.

## Bonus
`db.json` incluye un libro con id = `3` inválido (todos los campos incorrectos). Al cargar la app, ese registro no aparte en la lista y se avisa por consola del error y el id del libro.
