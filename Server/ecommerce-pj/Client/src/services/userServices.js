import * as httpRequest from '~/utils/httpRequest';

export const getUser = async (id) => {
    try {
        const res = await httpRequest.get(`api/user/${id}`, {});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const patchUser = async (id, values) => {
    try {
        const res = await httpRequest.patch(`api/user/${id}`, values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const changeEmail = async (userId, newEmail) => {
    try {
        const res = await httpRequest.post('api/user/change-email', {
            userId: userId,
            newEmail: newEmail,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const resendEmail = async (newEmail) => {
    try {
        const res = await httpRequest.post('api/user/resend-new-email', {
            newEmail: newEmail,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const changePassword = async (email, oldPassword, newPassword) => {
    try {
        const res = await httpRequest.patch(`api/user/change-password`, {
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const createUser = async (values) => {
    try {
        const res = await httpRequest.post('api/user/registerUser', { ...values });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const resendEmaill = async (email) => {
    try {
        const res = await httpRequest.post('api/user/resend-confirm-email', {
            email: email,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Check User &Email

export const checkUsername = async (eTargetValue) => {
    try {
        const res = await httpRequest.get(`api/user/check-username?username=${eTargetValue}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const checkEmail = async (eTargetValue) => {
    try {
        const res = await httpRequest.get(`api/user/check-email?email=${eTargetValue}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Refresh Token
export const userRefreshToken = async () => {
    try {
        const res = await httpRequest.post('api/user/refresh', {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Forgot Password
export const forgotPassword = async (email) => {
    try {
        const res = await httpRequest.post(`api/user/reset-password`, { email: email });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const confirmEmailForgotPassword = async (email, token, password) => {
    try {
        const res = await httpRequest.post(`api/user/confirm-forgot-pass`, {
            email: email,
            token: token,
            password: password,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
