import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export function setCookies(key, data, secretKey, expiresInSeconds) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    Cookies.set(key, encryptedData, { expires: expiresInSeconds / (60 * 60 * 24) });
}

export function getCookies(key, secretKey) {
    const encryptedData = Cookies.get(key);
    if (!encryptedData) return null;

    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}
