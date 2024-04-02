import classNames from 'classnames/bind';
import styles from './ImageCustomer.module.scss';

import React, { useEffect, useState } from 'react';
import { Button, Space, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import axios from 'axios';

import ModalLoading from '~/pages/Admin/components/ModalLoading';
import WrapperContainer from '~/pages/Admin/components/WrapperContainer';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import { useMessage } from '~/pages/Admin/components/Message';
import { useFormikHome } from '~/FormikConfig/FormikHome';
import MessageFormikError from '~/components/MessageFormikError';
import { home } from '~/services/homeServices';
import { uploadImageColor } from '~/pages/Admin/services/uploadServieces';
import { postImageCustomer } from '~/pages/Admin/services/homeServices';
const cx = classNames.bind(styles);

function ImageCustomer() {
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);

    const formik = useFormikHome();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await home();
            formik.setValues({
                image_customer: response.image_customer,
            });
        };
        fetchApi();
    }, []);

    // HANDLE CHANGE FILE
    const handleFileChange = (e, index) => {
        const target = e.target.files[0];
        const updatedImages = [...formik.values.image_customer];
        updatedImages[index] = target;
        formik.setFieldValue('image_customer', updatedImages);
    };
    const editImage = (formikValuesData, nameValue) => {
        formikValuesData = '';
        formik.setFieldValue(nameValue, formikValuesData);
    };

    // BUTTON ADD & DELETE & EDIT
    const addInput = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, [...formikValuesData, '']);
    };

    const deleteInput = (formikValuesData, nameValue, index) => {
        const updatedImages = [...formikValuesData];
        updatedImages.splice(index, 1);
        formik.setValues({ image_customer: updatedImages });
    };

    // HANDLE CLICK
    const handleClick = () => {
        if (formik.isValid) {
            setLoading(true);
            const formData = new FormData();
            // Filter the images array to keep only the File objects
            const filesToUpload = formik.values.image_customer.filter((item) => item instanceof File);
            for (let i = 0; i < filesToUpload.length; i++) {
                formData.append('img', filesToUpload[i]);
            }

            // Get the indices of the File objects in the original array
            const fileIndices = formik.values.image_customer
                .map((item, index) => (item instanceof File ? index : null))
                .filter((index) => index !== null);
            // FOLDER CLOUDINARY
            uploadImageColor(formData)
                .then((response) => {
                    return response.data;
                })
                .then((data) => {
                    fileIndices.map((itemIndex, index) => {
                        return (formik.values.image_customer[itemIndex] = data[index].path);
                    });
                })
                .then(() => {
                    // CALL API
                    postImageCustomer(formik.values.image_customer)
                        .then((res) => {
                            setLoading(false);
                            messageSuccess();
                        })
                        .catch((error) => {
                            console.log('Upload failed:', error);
                            messageError();
                        });
                })
                .catch((error) => {
                    console.log('Upload failed:', error);
                    messageError();
                });
        } else {
            messageMissingInput();
        }
    };

    return (
        <>
            {contextHolder}
            {loading && <ModalLoading />}
            <WrapperContainer title={'Edit Home Image  Customer '}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 3,
                        style: {
                            lineHeight: '40px',
                        },
                    }}
                    wrapperCol={{
                        span: 21,
                    }}
                    style={{
                        maxWidth: '100%',
                        fontWeight: '600',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item label="Images Customer">
                        <div className={cx('container-images')} style={{ marginTop: '30px' }}>
                            {formik.values.image_customer.map((item, index) => (
                                <>
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '200px',
                                            maxHeight: '200px',
                                            margin: '30px 40px',
                                        }}
                                    >
                                        <div style={{ marginTop: '20px' }}>
                                            <ImageCustom
                                                file={item}
                                                handleEdit={() =>
                                                    editImage(
                                                        formik.values.image_customer[index],
                                                        `image_customer[${index}]`,
                                                    )
                                                }
                                                handleFileChange={(e) => handleFileChange(e, index)}
                                                width="250px"
                                                height="250px"
                                            />
                                            <MessageFormikError
                                                formikErrorValue={formik.errors.image_home?.[index]?.image}
                                            />
                                            <Space>
                                                <DeleteOutlined
                                                    onClick={() =>
                                                        deleteInput(
                                                            formik.values.image_customer,
                                                            'image_customer',
                                                            index,
                                                        )
                                                    }
                                                    style={{
                                                        color: '#ff4d4f',
                                                        cursor: 'pointer',
                                                        fontSize: '1.8rem',
                                                        marginLeft: '40px',
                                                        marginTop: '20px',
                                                    }}
                                                    className={cx('button-delete')}
                                                />
                                            </Space>
                                        </div>
                                    </div>
                                </>
                            ))}
                            <Button
                                danger
                                onClick={() => addInput(formik.values.image_customer, 'image_customer')}
                                style={{ marginTop: '150px', marginLeft: '135px' }}
                            >
                                Add
                            </Button>
                        </div>
                    </Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="primary"
                            onClick={() => {
                                handleClick();
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </WrapperContainer>
        </>
    );
}

export default ImageCustomer;
