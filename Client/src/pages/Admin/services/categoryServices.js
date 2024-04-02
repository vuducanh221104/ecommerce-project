import * as httpRequest from '~/utils/httpRequest';

// CATEGORY BOX PRODUCT
export const getCategoryBoxProduct = async (slug) => {
    try {
        const res = await httpRequest.get(`api/admin/category/box-product/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addCategoryBoxProduct = async (values) => {
    try {
        const res = await httpRequest.post(`api/admin/category/box-product`, values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateCategoryBoxProduct = async (slug, values) => {
    try {
        const res = await httpRequest.patch(`api/admin/category/box-product/${slug}`, values);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// CATEGORY IMAGE
export const deleteCategoryBoxProduct = async (slug) => {
    try {
        const res = await httpRequest.deleted(`api/admin/category/box-product/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const editCategoryImage = async (slug, values) => {
    try {
        const res = await httpRequest.patch(`api/admin/category/image/${slug}`, values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const addCategoryImage = async (values) => {
    try {
        const res = await httpRequest.post('api/admin/category/image', values);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteCategoryImage = async (slug) => {
    try {
        const res = await httpRequest.deleted(`api/admin/category/image/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//EDIT
