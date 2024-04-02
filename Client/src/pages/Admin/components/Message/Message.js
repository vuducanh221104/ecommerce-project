import { message } from 'antd';

export const useMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const messageSuccess = () => {
        messageApi.open({
            type: 'success',
            content: 'Submit Successfully',
        });
    };

    const messageError = () => {
        messageApi.open({
            type: 'error',
            content: 'Submit error',
        });
    };

    const messageMissingInput = () => {
        messageApi.open({
            type: 'error',
            content: 'Please Input Enter Missing Fields',
        });
    };

    const messageCustomSuccess = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const messageCustomError = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const messageCustom = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    };

    return {
        messageSuccess,
        messageError,
        messageMissingInput,
        messageCustomSuccess,
        messageCustomError,
        messageCustom,
        contextHolder,
    };
};
