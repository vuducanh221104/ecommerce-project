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
        const res = await httpRequest.post(`api/admin/user`, 
           {
            avatar: values.avatar ? values.avatar : null,
            fullname:values.fullname,
            username:values.username,
            email: values.email,
            role:values.role,
            isVerified:true
           }
        );
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
