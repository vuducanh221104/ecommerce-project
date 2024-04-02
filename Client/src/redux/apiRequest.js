import httpRequest from '~/utils/httpRequest';
import { loginFailed, loginStart, loginSuccess } from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await httpRequest.post('api/user/loginUser', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const logoutUser = async () => {
    try {
        // to delete coookies inside headers
        await httpRequest.post('api/user/logoutUser');
    } catch (err) {
        console.log(err);
    }
};
