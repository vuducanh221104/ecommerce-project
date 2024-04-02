import { store } from '~/redux/store';
import axios from 'axios';
import { loginSuccess, logOutSuccess } from '~/redux/authSlice';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '~/redux/apiRequest';

//  Thêm vào để tự động check token
const refreshToken = async (navigate) => {
    try {
        const res = await axios.post(process.env.REACT_APP_BASE_URL + 'api/user/refresh', {
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        console.log(error);
        if (error.response.status === 403) {
            logoutUser();
            store.dispatch(logOutSuccess());
            navigate('/login');
        }
        return null;
    }
};

const checkAccessToken = async (user, navigate) => {
    if (user && typeof user.accessToken === 'string') {
        let date = new Date();
        const decodedToken = jwtDecode(user?.accessToken);
        if (decodedToken.exp < date.getTime() / 1000) {
            try {
                const data = await refreshToken(navigate);
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                store.dispatch(loginSuccess(refreshUser));
                return data.accessToken;
            } catch (error) {
                console.log(error);
                return null;
            }
        } else {
            return user.accessToken;
        }
    }
    return null;
};
export const axiosRequest = async (navigate) => {
    const user = store.getState().auth.login.currentUser;
    const accessToken = await checkAccessToken(user, navigate);

    const newInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            token: `Bearer ${accessToken}`,
        },
    });

    newInstance.interceptors.request.use(
        async (config) => {
            const user = store.getState().auth.login.currentUser;
            // Kiểm tra accessToken và cập nhật nếu cần
            const accessToken = await checkAccessToken(user, navigate);
            if (accessToken) {
                config.headers['token'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    // Xử lý lỗi khi làm mới token không thành công
    newInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response.status === 403) {
                store.dispatch(logOutSuccess());
                logoutUser();
                navigate('/login');
            }
            return Promise.reject(error);
        },
    );

    return newInstance;
};

export default axiosRequest;
