import classNames from 'classnames/bind';
import styles from './AddCategoryImage.module.scss';

import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';

import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ModalLoading from '~/pages/Admin/components/ModalLoading';
import WrapperContainer from '~/pages/Admin/components/WrapperContainer';
import { useFormikCategoryImage } from '~/FormikConfig/FormikCategory/FormikCategoryImage';
import MessageFormikError from '~/components/MessageFormikError';
import { useMessage } from '~/pages/Admin/components/Message';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import { uploadImageColor } from '~/pages/Admin/services/uploadServieces';
import { addCategoryImage } from '~/pages/Admin/services/categoryServices';

const cx = classNames.bind(styles);

function AddCategoryImage() {
    const Navigate = useNavigate();
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);

    const formik = useFormikCategoryImage();

    const handleFileChange = (e, nameValue) => {
        const target = e.target.files[0];
        formik.setFieldValue(nameValue, target);
    };
    const editImage = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, (formikValuesData = ''));
    };

    const handleClick = () => {
        if (formik.isValid) {
            setLoading(true);
            const formData = new FormData();

            const filesToUpload = formik.values.images_theme.filter((item) => item.image instanceof File);
            for (let i = 0; i < filesToUpload.length; i++) {
                formData.append('img', filesToUpload[i].image);
            }

            uploadImageColor(formData)
                .then((res) => {
                    console.log('successful :', res);
                    return res.data;
                })
                .then((data) => {
                    data.map((item, index) => {
                        formik.values.images_theme[index].image = item.path;
                    });
                })
                // CALL API
                .then(() => {
                    addCategoryImage(formik.values)
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
            <WrapperContainer title={'Create Category Image'}>
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
                    <>
                        <ArrowLeftOutlined
                            style={{ fontSize: '2rem', cursor: 'pointer' }}
                            onClick={() => Navigate(-1)}
                        />
                        <Form.Item label="Slug">
                            <Input
                                id={`slug`}
                                name={`slug`}
                                value={formik.values.slug}
                                onChange={formik.handleChange}
                            />
                            <MessageFormikError formikErrorValue={formik.errors.slug} />
                        </Form.Item>
                        {formik.values.images_theme.map((item, index) => (
                            <Form.Item
                                label={`${index + 1}`}
                                className={cx('label-edit')}
                                style={{ position: 'relative' }}
                                key={index}
                            >
                                <div style={{ marginTop: '30px', marginLeft: '10px' }}>
                                    <Form.Item label="Image">
                                        <ImageCustom
                                            file={item.image}
                                            handleEdit={() =>
                                                editImage(
                                                    formik.values.images_theme[index].image,
                                                    `images_theme[${index}].image`,
                                                )
                                            }
                                            handleFileChange={(e) =>
                                                handleFileChange(e, `images_theme[${index}].image`)
                                            }
                                            width="800px"
                                            height="320px"
                                        />
                                        <MessageFormikError
                                            formikErrorValue={formik.errors.images_theme?.[index]?.image}
                                        />
                                    </Form.Item>
                                </div>
                                <Form.Item label="Link">
                                    <Input
                                        defaultValue={item.link}
                                        id={`images_theme[${index}].link`}
                                        name={`images_theme[${index}].link`}
                                        value={item.link}
                                        onChange={formik.handleChange}
                                    />
                                    <MessageFormikError formikErrorValue={formik.errors.images_theme?.[index]?.link} />
                                </Form.Item>
                            </Form.Item>
                        ))}
                    </>
                </Form>
                {/* BUTTON SAVE */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        type="primary"
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        Save
                    </Button>
                </div>
            </WrapperContainer>
        </>
    );
}

export default AddCategoryImage;
