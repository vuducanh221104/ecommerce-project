import * as httpRequest from '~/utils/httpRequest';

// PRINT PRODUCT (in ra cac product )
export const uploadImageColor = async (dataImageColor) => {
    try {
        const res = await httpRequest.post('api/admin/upload/uploadCloud', dataImageColor);
        return res;
    } catch (error) {
        console.log(error);
    }
};
