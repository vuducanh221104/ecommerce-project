import * as httpRequest from '~/utils/httpRequest';

// Categroy Find to slug
export const category = async (slug, orderParam, actualOrder) => {
    try {
        const res = await httpRequest.get(`api/category/${slug}${orderParam ? `/?order=${actualOrder}` : ''}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Categroy Image
export const categoryImage = async (slug) => {
    try {
        const res = await httpRequest.get(`api/category/image/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Category Box
export const categoryBox = async (slug) => {
    try {
        const res = await httpRequest.get(`api/category/box/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
