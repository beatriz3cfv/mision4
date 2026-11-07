// Funciones mock con localStorage y safeParse
import { apiTradesResponseSchema } from '../schemas/apiResponseSchema';

// Cargar datos iniciales de localStorage
const STORAGE_KEY = 'trading_journal_trades';

const getStoredTrades = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [
        {
        id: '1',
        ticker: 'SPY',
        type: 'BUY',
        entryPrice: 500,
        quantity: 10,
        stopLoss: 490,
        takeProfit: 520,
        createdAt: new Date().toISOString()
        }
    ];
};

// 1. Obtener resultado. Como GET
export async function fetchTrades(shouldCorruptData = false) {
    // Simular retardo
    await new Promise((resolve) => setTimeout(resolve, 600));

    let rawData = getStoredTrades();

    // BONUS: Simular que el servidor devuelve datos corruptos si se activa el flag
    if (shouldCorruptData) {
        rawData = [{ ...rawData[0], entryPrice: "TEXTO_CORRUPTO_NO_NUMERO" }];
    }

    // BONUS: Validar la respuesta con Zod safeParse
    const result = apiTradesResponseSchema.safeParse(rawData);

    if (!result.success) {
        console.error('Error Zod safeParse:', result.error.format());
        throw new Error('Dato corrupto detectado en la respuesta del servidor.');
    }

    return result.data;
}

// 2. Crear operación. Como POST
export async function createTrade(newTradeData) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const currentTrades = getStoredTrades();
    const tradeToSave = {
        ...newTradeData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
    };

    const updatedTrades = [tradeToSave, ...currentTrades];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrades));

    return tradeToSave;
}
