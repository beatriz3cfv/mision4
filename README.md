src/
├── api/
│   └── booksApi.js          # Funciones fetch (getBooks, addBook) + validación Zod con safeParse (Bonus)
├── components/
│   ├── BookForm.jsx         # Formulario con React Hook Form + Zod
│   ├── BookList.jsx         # Listado que consume TanStack Query
│   └── FeedbackStatus.jsx   # Manejo de estados de carga, error y éxito
├── schemas/
│   └── bookSchema.js        # Esquema Zod (única fuente de verdad)
├── App.jsx                  # Contenedor principal con QueryClientProvider
└── main.jsx                 # Punto de entrada