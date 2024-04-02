import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';

import { jwtDecode } from 'jwt-decode';

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:4000/api-user/refresh', {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Hàm axiosInstance với user, dispatch, stateSuccess làm tham số
export const axiosInstance = (stateSuccess) => {
    // Lấy user và dispatch từ Redux
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(loginSuccess(refreshUser));
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => Promise.reject(err),
    );
    return newInstance;
};

// Khởi tạo biến toàn cục axiosJWT
let axiosJWT = null;

export default axiosJWT;
