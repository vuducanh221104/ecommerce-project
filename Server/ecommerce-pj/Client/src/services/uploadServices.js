import * as httpRequest from '~/utils/httpRequest';

export const uploadAvatar = async (values) => {
    try {
        const res = await httpRequest.post('api/user/upload', values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
