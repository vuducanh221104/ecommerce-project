import axios from 'axios';
axios.defaults.withCredentials = true;
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const res = await httpRequest.get(path, options);
    return res;
};

export const post = async (path, options = {}) => {
    const res = await httpRequest.post(path, options);
    return res;
};

export const patch = async (path, options = {}) => {
    const res = await httpRequest.patch(path, options);
    return res;
};

export const deleted = async (path, options = {}) => {
    const res = await httpRequest.delete(path, options);
    return res;
};

export default httpRequest;
