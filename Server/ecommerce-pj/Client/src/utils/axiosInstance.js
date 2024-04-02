import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '~/redux/apiRequest';
import { loginSuccess, logOutSuccess } from '~/redux/authSlice';
import { store } from '~/redux/store';
// Những API cần check thì sẽ thêm cái này vào

const refreshToken = async (navigate) => {
    try {
        const res = await axios.post(process.env.REACT_APP_BASE_URL + 'api/user/refresh', {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
        store.dispatch(logOutSuccess());
        logoutUser();
        navigate('/login');
    }
};

export const axiosInstance = (user, navigate) => {
    const newInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
    });
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken(navigate);
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                store.dispatch(loginSuccess(refreshUser));
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => Promise.reject(err),
    );
    return newInstance;
};
