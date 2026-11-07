// Esquema Zod de la respuesta de red. BONUS
import { z } from 'zod';

export const apiTradeSchema = z.object({
    id: z.string(),
    ticker: z.string(),
    type: z.enum(['BUY', 'SELL']),
    entryPrice: z.number(),
    quantity: z.number(),
    stopLoss: z.number(),
    takeProfit: z.number(),
    createdAt: z.string(),
});

export const apiTradesResponseSchema = z.array(apiTradeSchema);
