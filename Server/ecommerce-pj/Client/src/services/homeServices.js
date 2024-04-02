import * as httpRequest from '~/utils/httpRequest';

// Categroy Find to slug(both ADMIN and USER)
export const home = async () => {
    try {
        const res = await httpRequest.get(`/api/home`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
