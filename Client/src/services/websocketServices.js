import * as httpRequest from '~/utils/httpRequest';

// Categroy Find to slug
export const chatHistory = async (roomName) => {
    try {
        const res = await httpRequest.get(`chat-history/${roomName}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
