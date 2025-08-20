import { debug } from "./utilities"

const orderPrefix = import.meta.env.VITE_ORDER_PREFIX || 'ORD-UNICO-';

export const newOrderId = () => {
    const orderId = orderPrefix + (Date.now() * 1e6);
    if (debug) console.log('new orderId', orderId)
    return orderId
}
