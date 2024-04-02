import * as httpRequest from '~/utils/httpRequest';

// Image Customer Home
export const postImageCustomer = async (valuesImageCustomer) => {
    try {
        const res = await httpRequest.patch('api/admin/home', {
            image_customer: valuesImageCustomer,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Image Home
export const postImageHome = async (valuesImageHome) => {
    try {
        const res = await httpRequest.patch('api/admin/home', {
            image_home: valuesImageHome,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// BoxProduct Home
export const postBoxProductHome = async (valuesContainer) => {
    try {
        const res = await httpRequest.patch('api/admin/home', {
            container: valuesContainer,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
