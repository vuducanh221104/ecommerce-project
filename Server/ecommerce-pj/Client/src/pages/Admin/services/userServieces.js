import * as httpRequest from '~/utils/httpRequest';
//
export const getListUser = async () => {
    try {
        const res = await httpRequest.get('api/admin/user');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (listId) => {
    try {
        const res = await httpRequest.deleted(`api/admin/user/${listId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addUser = async (values) => {
    try {
        const res = await httpRequest.post(`api/admin/user`, values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const editUser = async (id, values) => {
    try {
        const res = await httpRequest.patch(`api/admin/user/${id}`, values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
