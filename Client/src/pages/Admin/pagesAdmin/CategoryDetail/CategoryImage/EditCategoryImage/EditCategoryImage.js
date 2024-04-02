import classNames from 'classnames/bind';
import styles from './EditCategoryImage.module.scss';

import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';

import ModalLoading from '~/pages/Admin/components/ModalLoading';
import WrapperContainer from '~/pages/Admin/components/WrapperContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useFormikCategoryImage } from '~/FormikConfig/FormikCategory/FormikCategoryImage';
import MessageFormikError from '~/components/MessageFormikError';
import { useMessage } from '~/pages/Admin/components/Message';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import { categoryImage } from '~/services/categoryServices';
import { uploadImageColor } from '~/pages/Admin/services/uploadServieces';
import { deleteCategoryImage, editCategoryImage } from '~/pages/Admin/services/categoryServices';
const cx = classNames.bind(styles);

function EditCategoryImage() {
    const Navigate = useNavigate();
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { pathname } = useLocation();
    const segments = pathname.split('/');
    const slugParam = segments[segments.length - 1];

    const formik = useFormikCategoryImage();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await categoryImage(slugParam);
            formik.setValues(response);
        };
        fetchApi();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        const fetchApi = async () => {
            try {
                deleteCategoryImage(slugParam);
                setLoading(false);
                Navigate(-1);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
                setIsModalOpen(false);
            }
        };
        fetchApi();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
            const fileImageIndex = [];
            formik.values.images_theme.forEach((item, index) => {
                if (item.image instanceof File) {
                    formData.append('img', item.image);
                    fileImageIndex.push(index);
                }
            });
            uploadImageColor(formData)
                .then((res) => {
                    return res.data;
                })
                .then((resData) => {
                    fileImageIndex.forEach((itemIndex, index) => {
                        formik.values.images_theme[itemIndex].image = resData[index].path;
                    });
                })
                .then(() => {
                    editCategoryImage(slugParam, formik.values)
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
            <WrapperContainer title={'Edit Category Image'}>
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
                    <Button type="primary" danger onClick={showModal}>
                        Delete
                    </Button>
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
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <h2>You still want to detele ?</h2>
                </Modal>
            </WrapperContainer>
        </>
    );
}

export default EditCategoryImage;
