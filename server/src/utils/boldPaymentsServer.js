// Bold.co utilities

import crypto from 'crypto';
import { debug } from './utilities.js';
import { env } from '../config/env.js';

export const isBoldEnabled = env.BOLD_PRIVATE_KEY !== ''

async function generateHash(cadena) {
    // Función asincrónica para generar el hash SHA-256

    // Codificar la cadena en UTF-8
    const encodedText = new TextEncoder().encode(cadena);
   
    // Generar el hash SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedText);
   
    // Convertir el buffer del hash en un array de bytes
    const hashArray = Array.from(new Uint8Array(hashBuffer));
   
    // Convertir cada byte en una representación hexadecimal y unirlos en una sola cadena
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
   
    return hashHex;
}

export async function generateIntegrityHash(orderId, amount, currency) {
    if (!isBoldEnabled) return '';
    const cadenaConcatenada = `${orderId}${amount}${currency}${env.BOLD_PRIVATE_KEY}`;
    const hashHex = await generateHash(cadenaConcatenada);
    if (debug) console.log('generateIntegrityHash | cadenaConcatenada', cadenaConcatenada)
    if (debug) console.log('generateIntegrityHash | hashHex', hashHex)
    return hashHex;
}
