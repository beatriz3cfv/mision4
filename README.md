src/
├── api/
│   └── tradesApi.js         # Funciones mock (fetchTrades y createTrade) con localStorage y safeParse
├── components/
│   ├── TradeForm.jsx        # Formulario con React Hook Form, Zod y errores accesibles (20 + 15 pts)
│   ├── TradeList.jsx        # Listado que consume TanStack Query con estados de carga/error/éxito (15 + 10 pts)
│   └── BonusTrigger.jsx     # Botón interactivo opcional para demostrar el BONUS (safeParse con datos corruptos)
├── hooks/
│   ├── useTrades.js         # Custom Hook con useQuery para listar operaciones
│   └── useCreateTrade.js    # Custom Hook con useMutation e invalidación automática de caché
├── schemas/
│   ├── tradeSchema.js       # Esquema Zod del formulario con refinamientos lógicos
│   └── apiResponseSchema.js # Esquema Zod de la respuesta de red para el BONUS[cite: 1]
├── App.jsx                  # Componente principal que une el formulario y el listado
├── App.css                  # Estilos limpios y personalizados (sin Tailwind)
├── main.jsx                 # Punto de entrada con la configuración del QueryClientProvider
└── index.css                # Reseteo de estilos globales


src/schemas/tradeSchema.js: Contiene las reglas de validación con Zod y los .refine() para comprobar lógicas complejas (como el Stop Loss o Take Profit en función de si es una compra o venta)[cite: 1].

src/schemas/apiResponseSchema.js: Define el esquema que valida la API y hace posible el punto Bonus utilizando safeParse[cite: 1].

src/api/tradesApi.js: Simula las peticiones HTTP con promesas, lee y escribe en el localStorage, y valida la respuesta antes de devolverla[cite: 1].

src/hooks/: Separa la lógica de obtención de datos (useQuery) y envío (useMutation) para mantener los componentes visuales limpios[cite: 1].

src/components/:

TradeForm.jsx gestiona los inputs no controlados de React Hook Form conectados mediante zodResolver[cite: 1].

TradeList.jsx maneja visualmente los estados de carga (isPending), error (isError) y éxito de los datos[cite: 1].