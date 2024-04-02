import * as httpRequest from '~/utils/httpRequest';

// [GET]
export const getListOrder = async () => {
    try {
        const res = await httpRequest.get('api/admin/order');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Delete
export const deleteOrder = async (listId) => {
    try {
        const res = await httpRequest.deleted(`api/admin/order/${listId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
