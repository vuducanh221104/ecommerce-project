import * as httpRequest from '~/utils/httpRequest';

// News
export const news = async (visibleCount) => {
    try {
        const res = await httpRequest.get(`api/news?limit=${visibleCount}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// News Details
export const newsDetail = async (slug) => {
    try {
        const res = await httpRequest.get(`api/news/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//  News Comment
export const newsComment = async (slug) => {
    try {
        const res = await httpRequest.get(`api/news/comment/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Post Comment
export const newsCommentPost = async (slug, fullname, valuesComment) => {
    try {
        const res = await httpRequest.post(`api/news/comment`, {
            slug: slug,
            fullname: fullname,
            comment_content: valuesComment,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Latest News
export const newsLatest = async () => {
    try {
        const res = await httpRequest.get(`api/news/latest`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// News Footer Limit
export const newsLimit = async () => {
    try {
        const res = await httpRequest.get(`api/news/limit`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
