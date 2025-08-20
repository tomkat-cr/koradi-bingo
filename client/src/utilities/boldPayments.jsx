import { generateUUID } from './hashing.jsx'
import { debug } from "./utilities.jsx"

const BOLD_PUBLIC_KEY = import.meta.env.VITE_BOLD_PUBLIC_KEY || ''
const BOLD_BUTTON_TYPE = import.meta.env.VITE_BOLD_BUTTON_TYPE || 'custom' // 'custom' | 'default'
const BOLD_DEFAULT_CURRENCY = import.meta.env.VITE_BOLD_DEFAULT_CURRENCY || 'COP'

const billingAddress = import.meta.env.VITE_BILLING_ADDRESS || '';
const billingCity = import.meta.env.VITE_BILLING_CITY || 'Medellin';
const billingState = import.meta.env.VITE_BILLING_STATE || 'Antioquia';
const billingZipCode = import.meta.env.VITE_BILLING_ZIP_CODE || '';
const billingCountry = import.meta.env.VITE_BILLING_COUNTRY || 'CO';

export const isBoldEnabled = BOLD_PUBLIC_KEY !== ''
export const isBoldButtonTypeCustom = BOLD_BUTTON_TYPE === 'custom'
export const boldDefaultCurrency = BOLD_DEFAULT_CURRENCY

export const initBoldCheckout = () => {
    if (document.querySelector('script[src="https://checkout.bold.co/library/boldPaymentButton.js"]')) {
        console.warn('Bold Checkout script is already loaded.');
        return;
    }

    var js;
    js = document.createElement('script');
    js.onload = () => {
        window.dispatchEvent(new Event('boldCheckoutLoaded'));
    };
    js.onerror = () => {
        window.dispatchEvent(new Event('boldCheckoutLoadFailed'));
    };
    js.src = 'https://checkout.bold.co/library/boldPaymentButton.js';

    document.head.appendChild(js);
};

export async function generateIntegrityHash(orderId, amount, currency) {
    try {
        const serverResponse = await fetch('/api/bold-hash', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId, amount, currency })
        });
        const { hash, error, error_message } = await serverResponse.json();
        if (debug) console.log('generateIntegrityHash | hash', hash, 'error: ', error, 'error_message: ', error_message)
        if (error) throw new Error(error_message);
        return hash;
    } catch (error) {
        throw error;
    }
}

export const createSaleInstance = async ({
    email,
    fullName,
    phone,
    documentType,
    documentNumber,
    currency,
    amount,
    tax,
    description,
    originUrl,
    redirectionUrl,
    orderId,
    extraData1,
    extraData2
}) => {
    const integritySignature = await generateIntegrityHash(orderId, String(amount), currency);
    const dialCode = phone.startsWith('+') ? phone.slice(0,2) : '+57';
    const finalPhone = phone.startsWith('+') ? phone.slice(2) : phone;
    const checkoutData = {
        orderId: orderId,
        currency: currency,
        amount: String(amount),
        apiKey: BOLD_PUBLIC_KEY,
        integritySignature: integritySignature,
        description: description,
        tax: tax,
        originUrl: originUrl,
        redirectionUrl: redirectionUrl,
        renderMode: 'embedded',
        customerData: JSON.stringify({
            email: email,
            fullName: fullName,
            phone: finalPhone,
            dialCode: dialCode,
            documentNumber: documentNumber,
            documentType: documentType
        }),
        billingAddress: JSON.stringify({
            address: billingAddress,
            zipCode: billingZipCode,
            city: billingCity,
            state: billingState,
            country: billingCountry
        }),
    }
    if (extraData1) checkoutData.extraData1 = extraData1;
    if (extraData2) checkoutData.extraData2 = extraData2;
    if (debug) console.log('createSaleInstance | checkoutData', checkoutData)
    const checkout = new BoldCheckout(checkoutData)
    return checkout
}

export const configureCustomBoldButton = ( buttonId, checkout ) => {
    const customButton = document.getElementById(buttonId);
    customButton.addEventListener('click', () => {
        checkout.open();
    })
}

export const getDefaultBoldButton = async ( form, redirectionUrl ) => {
    const integritySignature = await generateIntegrityHash(form.name, form.amount, BOLD_DEFAULT_CURRENCY);
    return (
      <script
        data-bold-button
        data-order-id={"ORD-UNICO-" + generateUUID()}
        data-currency={BOLD_DEFAULT_CURRENCY}
        data-amount={form.amount}
        data-api-key={BOLD_PUBLIC_KEY}
        data-integrity-signature={integritySignature}
        data-redirection-url={redirectionUrl}
        data-customer-data={`{"email": "${form.email}","fullName": "${form.name}","phone": "${form.phone}","documentType": "${form.documentType}","documentNumber": "${form.documentNumber}"}`}
        data-description={SaleDescription}
        data-tax="vat-19"
      ></script>
    )
}
