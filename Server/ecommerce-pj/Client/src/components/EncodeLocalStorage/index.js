import CryptoJS from 'crypto-js';

export function setLocalStorage(key, data, secretKey) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    localStorage.setItem(key, encryptedData);
}

export function getLocalStorage(key, secretKey) {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}
