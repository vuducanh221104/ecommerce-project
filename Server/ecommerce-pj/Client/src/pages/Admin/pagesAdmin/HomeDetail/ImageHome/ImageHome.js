import classNames from 'classnames/bind';
import styles from './ImageHome.module.scss';

import React, { useEffect, useState } from 'react';
import { Button, Space, Input, Form, message } from 'antd';
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
import { postImageHome } from '~/pages/Admin/services/homeServices';
const cx = classNames.bind(styles);

function ImageHome() {
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);
    const formik = useFormikHome();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await home();
                formik.setValues({
                    image_home: response.image_home,
                });
            } catch (err) {
                console.log('Feching error ', err);
            }
        };
        fetchApi();
    }, []);

    const handleFileChange = (e, index) => {
        const target = e.target.files[0];
        const updatedImages = [...formik.values.image_home];
        updatedImages[index] = { image: target, link: updatedImages[index].link };
        formik.setFieldValue('image_home', updatedImages);
    };
    const editImage = (formikValuesData, nameValue) => {
        formikValuesData = { image: '', link: '' };
        formik.setFieldValue(nameValue, formikValuesData);
    };
    // BUTTON ADD & DELETE & EDIT
    const addInput = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, [...formikValuesData, { image: '', link: '' }]);
    };

    const deleteInput = (formikValuesData, nameValue, index) => {
        const updatedImages = [...formikValuesData];
        updatedImages.splice(index, 1);
        formik.setValues({ image_home: updatedImages });
    };

    const handleClick = () => {
        if (formik.isValid) {
            setLoading(true);
            const formData = new FormData();
            // Filter the images array to keep only the File objects
            const filesToUpload = formik.values.image_home.filter((item) => item.image instanceof File);
            for (let i = 0; i < filesToUpload.length; i++) {
                formData.append('img', filesToUpload[i].image);
            }

            // Get the indices of the File objects in the original array
            const fileIndices = formik.values.image_home
                .map((item, index) => (item.image instanceof File ? index : null))
                .filter((index) => index !== null);
            // FOLDER CLOUDINARY
            uploadImageColor(formData)
                .then((response) => {
                    console.log('successful :', response);
                    return response.data;
                })
                .then((data) => {
                    fileIndices.map((itemIndex, index) => {
                        return (formik.values.image_home[itemIndex] = {
                            image: data[index].path,
                            link: formik.values.image_home[itemIndex].link,
                        });
                    });
                    // CALL API
                })
                .then(() => {
                    postImageHome(formik.values.image_home)
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
            <WrapperContainer title={'Edit Image Home'}>
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
                    <Form.Item label="Images Home">
                        {formik.values.image_home.map((item, index) => (
                            <>
                                <Form.Item
                                    label={`${index}`}
                                    className={cx('label-edit')}
                                    style={{ position: 'relative', marginTop: '40px' }}
                                >
                                    <div style={{ marginTop: '20px' }}>
                                        <ImageCustom
                                            file={item.image}
                                            handleEdit={() =>
                                                editImage(formik.values.image_home[index], `image_home[${index}]`)
                                            }
                                            handleFileChange={(e) => handleFileChange(e, index)}
                                            width="850px"
                                            height="320px"
                                        />
                                        <MessageFormikError
                                            formikErrorValue={formik.errors.image_home?.[index]?.image}
                                        />
                                        <Space>
                                            <DeleteOutlined
                                                onClick={() =>
                                                    deleteInput(formik.values.image_home, 'image_home', index)
                                                }
                                                style={{
                                                    color: '#ff4d4f',
                                                    cursor: 'pointer',
                                                    fontSize: '1.8rem',
                                                    marginLeft: '20px',
                                                }}
                                                className={cx('button-delete')}
                                            />
                                        </Space>
                                    </div>
                                </Form.Item>
                                <Form.Item label="link">
                                    <Input
                                        defaultValue={item.link}
                                        id={`image_home[${index}].link`}
                                        name={`image_home[${index}].link`}
                                        value={item.link}
                                        onChange={formik.handleChange}
                                    />
                                    <MessageFormikError formikErrorValue={formik.errors.image_home?.[index]?.link} />
                                </Form.Item>
                            </>
                        ))}
                        <Button type="link" onClick={() => addInput(formik.values.image_home, 'image_home')}>
                            Add
                        </Button>
                    </Form.Item>
                </Form>
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
            </WrapperContainer>
        </>
    );
}

export default ImageHome;
