import * as httpRequest from '~/utils/httpRequest';

// Search Product
export const checkToken = async (token) => {
    try {
        const res = await httpRequest.get(`api-user/check-token`, {
            headers: {
                Authorization: token,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
