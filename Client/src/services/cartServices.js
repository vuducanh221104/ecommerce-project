import * as httpRequest from '~/utils/httpRequest';

export const paymentSuccess = async (values) => {
    try {
        await httpRequest.post('api/payment/save', {
            dataToSave:values,
        });
    } catch (error) {
        console.log(error);
    }
};

export const paymentVNpay = async (dataToSend) => {
    try {
        const res = await httpRequest.post('api/payment/create-payment-vnpay', {
            dataToSend,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const paymentMomo = async (dataToSendMomo) => {
    try {
        const res = await httpRequest.post('api/payment/create-payment-momo', {
            dataToSendMomo,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const paymentZalopay = async (dataToSendZalopay) => {
    try {
        const res = await httpRequest.post('api/payment/create-payment-zalopay', {
            dataToSendZalopay,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
