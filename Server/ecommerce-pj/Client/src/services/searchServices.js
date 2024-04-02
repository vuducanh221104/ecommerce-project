import * as httpRequest from '~/utils/httpRequest';

// Search Product
export const productSearch = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get(`api/product/search`, {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const productSearchClick = async (kParam, loadPage, orderParam, actualOrder) => {
    try {
        const res = await httpRequest.get(
            `/api/product/search-all?k=${kParam}&limit=${loadPage}${orderParam ? `&order=${actualOrder}` : ''}`,
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
