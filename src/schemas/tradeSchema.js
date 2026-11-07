// Esquema Zod del formulario con refinamientos lógicos
import { z } from 'zod';

export const tradeSchema = z.object({
    ticker: z
        .string()
        .min(1, 'El ticker es obligatorio')
        .max(10, 'Máximo 10 caracteres')
        .transform((val) => val.toUpperCase().trim()),
    
    type: z.enum(['BUY', 'SELL'], {
        errorMap: () => ({ message: 'Selecciona BUY o SELL' }),
  }),

    entryPrice: z.coerce
        .number({ invalid_type_error: 'Debe ser un número' })
        .positive('Debe ser mayor a 0'),

    quantity: z.coerce
        .number({ invalid_type_error: 'Debe ser un número' })
        .positive('Debe ser mayor a 0'),

    stopLoss: z.coerce.number().positive('Debe ser mayor a 0'),
    takeProfit: z.coerce.number().positive('Debe ser mayor a 0'),
})
.refine((data) => {
    if (data.type === 'BUY') return data.stopLoss < data.entryPrice;
        return data.stopLoss > data.entryPrice;
}, {
    message: 'Para BUY, el Stop Loss debe ser menor al precio de entrada',
    path: ['stopLoss'],
})
.refine((data) => {
    if (data.type === 'BUY') return data.takeProfit > data.entryPrice;
        return data.takeProfit < data.entryPrice;
}, {
    message: 'Para BUY, el Take Profit debe ser mayor al precio de entrada',
    path: ['takeProfit'],
});
