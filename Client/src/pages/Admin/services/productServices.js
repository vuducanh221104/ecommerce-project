import * as httpRequest from '~/utils/httpRequest';

// AddProduct
export const addProduct = async (values) => {
    try {
        const res = await httpRequest.post('api/admin/product', {
            ...values,
        });
        console.log(values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addProductDetail = async (values) => {
    try {
        const res = await httpRequest.post('api/admin/product/detail', {
            ...values,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// ListProduct
export const getListProduct = async () => {
    try {
        const res = await httpRequest.get('api/product');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await httpRequest.deleted(`api/admin/product/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProductDetail = async (slug) => {
    try {
        const res = await httpRequest.deleted(`api/admin/product/detail/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// EditDetailProduct

export const getProductSlug = async (slug) => {
    try {
        const res = await httpRequest.get(`api/product/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const patchProduct = async (id, values) => {
    try {
        const res = await httpRequest.patch(`api/admin/product/${id}`, {
            ...values,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const patchProductDetail = async (id, values) => {
    try {
        const res = await httpRequest.patch(`api/admin/product/detail/${id}`, {
            ...values,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
