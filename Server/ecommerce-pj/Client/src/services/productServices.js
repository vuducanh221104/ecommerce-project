import * as httpRequest from '~/utils/httpRequest';

// PRINT PRODUCT (in ra cac product )
export const product = async () => {
    try {
        const res = await httpRequest.get(`api/product`, {});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//PRINT PRODUCT INFOMATION (click vao in ra cac thong tin san pham do)
export const productInfo = async (slug, navigate) => {
    try {
        const res = await httpRequest.get(`api/product/${slug}`, {});
        return res.data;
    } catch (error) {
        navigate('/', { replace: true });
        console.log(error);
    }
};

export const productCommentPreview = async (slug) => {
    try {
        const res = await httpRequest.get(`api/comment/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const productCare = async (subcategorySlug) => {
    try {
        const res = await httpRequest.get(`api/product/related/${subcategorySlug}`);
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

// Category
export const productSwiperComponent = async (dataImageAndBoxLink) => {
    try {
        const res = await httpRequest.get(`api/category/${dataImageAndBoxLink}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
