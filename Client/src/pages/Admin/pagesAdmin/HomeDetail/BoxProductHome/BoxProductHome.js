import classNames from 'classnames/bind';
import styles from './BoxProductHome.module.scss';

import React, { useEffect, useState } from 'react';
import { Button, Space, Input, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import ModalLoading from '~/pages/Admin/components/ModalLoading';
import WrapperContainer from '~/pages/Admin/components/WrapperContainer';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import { useMessage } from '~/pages/Admin/components/Message';
import { useFormikHome } from '~/FormikConfig/FormikHome';
import MessageFormikError from '~/components/MessageFormikError';
import { home } from '~/services/homeServices';
import { uploadImageColor } from '~/pages/Admin/services/uploadServieces';
import { postBoxProductHome } from '~/pages/Admin/services/homeServices';
const cx = classNames.bind(styles);

function BoxProductHome() {
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);

    const formik = useFormikHome();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await home();
            formik.setValues({
                container: response.container,
            });
        };
        fetchApi();
    }, []);

    // Change File
    const handleFileChange = (e, index) => {
        const target = e.target.files[0];
        const updatedImages = [...formik.values.container];
        updatedImages[index].thumbnail = { image: target, link: updatedImages[index].thumbnail.link };
        formik.setFieldValue('container', updatedImages);
    };
    const handleFileChangeBoxProduct = (e, index, indexBoxProduct) => {
        const target = e.target.files[0];
        const updatedImages = [...formik.values.container];
        updatedImages[index].productBoxTheme[indexBoxProduct] = {
            imageBox: target,
            titleBox: updatedImages[index].productBoxTheme[indexBoxProduct].titleBox,
            slugBox: updatedImages[index].productBoxTheme[indexBoxProduct].slugBox,
        };
        formik.setFieldValue('container', updatedImages);
    };

    // BUTTON ADD & DELETE & EDIT
    const deleteInput = (formikValuesData, index) => {
        const updatedImages = [...formikValuesData];
        updatedImages.splice(index, 1);
        formik.setValues({ container: updatedImages });
    };
    const addInput = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, [
            ...formikValuesData,
            {
                thumbnail: { image: '', link: '' },

                productBoxTheme: [
                    {
                        imageBox: '',
                        titleBox: '',
                        slugBox: '',
                    },
                ],
                linkButton: '',
                link: '',
                backgroundColor: '',
            },
        ]);
    };
    const editInput = (formikValuesData, nameValue, index) => {
        const updatedImages = [...formikValuesData];
        updatedImages[index].thumbnail = { image: '', link: '' };
        formik.setFieldValue(nameValue, updatedImages);
    };

    // BOX PRODUCT BUTTON ADD & DELETE & EDIT
    const deleteInputBoxProduct = (formikValuesData, index, indexBoxProduct) => {
        const updatedImages = [...formikValuesData];
        updatedImages[index].productBoxTheme.splice(indexBoxProduct, 1);
        formik.setValues({ container: updatedImages });
    };
    const addInputBoxProduct = (formikValuesData, nameValue, index) => {
        const updateData = [...formikValuesData];
        updateData[index].productBoxTheme = [
            ...formikValuesData[index].productBoxTheme,
            {
                imageBox: '',
                titleBox: '',
                slugBox: '',
            },
        ];
        formik.setFieldValue(nameValue, [...updateData]);
    };
    const editInputBoxProduct = (formikValuesData, nameValue, index, indexBoxProduct) => {
        const updatedImages = [...formikValuesData];

        updatedImages[index].productBoxTheme[indexBoxProduct] = { imageBox: '', titleBox: '', slugBox: '' };
        formik.setFieldValue(nameValue, updatedImages);
    };

    const handleSubmit = async () => {
        if (formik.isValid) {
            setLoading(true);
            try {
                const formData = new FormData();
                const originalIndices = [];
                formik.values.container.forEach((item, index) => {
                    if (item.thumbnail.image instanceof File) {
                        formData.append('img', item.thumbnail.image);
                        originalIndices.push(index);
                    }
                });

                const dataImageThumb = await uploadImageColor(formData);
                originalIndices.forEach((originalIndices, index) => {
                    formik.values.container[originalIndices].thumbnail.image = dataImageThumb.data[index].path;
                });

                const formDataBox = new FormData();
                const originalIndicesBoxContainer = [];
                const originalIndicesBoxImage = [];

                formik.values.container.forEach((item, index) => {
                    item.productBoxTheme.forEach((itemBox, indexBox) => {
                        if (itemBox.imageBox instanceof File) {
                            formDataBox.append('img', itemBox.imageBox);
                            originalIndicesBoxContainer.push(index);
                            originalIndicesBoxImage.push(indexBox);
                        }
                    });
                });

                const dataImageBox = await uploadImageColor(formDataBox);
                originalIndicesBoxContainer.forEach((indexContainer, i) => {
                    const indexImage = originalIndicesBoxImage[i];
                    formik.values.container[indexContainer].productBoxTheme[indexImage].imageBox =
                        dataImageBox.data[i].path;
                });

                await postBoxProductHome(formik.values.container);
                setLoading(false);
                messageSuccess();
            } catch (err) {
                console.log('Error :', err);
                setLoading(false);
                messageError();
            }
        } else {
            messageMissingInput();
        }
    };
    return (
        <>
            {contextHolder}
            {loading && <ModalLoading />}
            <WrapperContainer title={'Edit Box Product'}>
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
                    <Form.Item label="Home Product Box">
                        {formik.values.container.map((item, index) => (
                            <Form.Item
                                label={`${index + 1}`}
                                className={cx('label-edit')}
                                style={{ position: 'relative', marginTop: '40px' }}
                                key={index}
                            >
                                <div style={{ marginTop: '50px' }}>
                                    <Form.Item label="Image" className={cx('label-edit')}>
                                        <div style={{ marginTop: '20px' }}>
                                            <ImageCustom
                                                file={item?.thumbnail?.image}
                                                handleEdit={() =>
                                                    editInput(formik.values.container, 'container', index)
                                                }
                                                handleFileChange={(e) => handleFileChange(e, index)}
                                                width="800px"
                                                height="320px"
                                            />
                                            <MessageFormikError
                                                formikErrorValue={formik.errors.container?.[index]?.thumbnail?.image}
                                            />
                                        </div>
                                        <div style={{ marginTop: '20px' }}>
                                            <Form.Item label="Link" className={cx('label-edit')}>
                                                <Input
                                                    name={`container[${index}].thumbnail.link`}
                                                    value={item.thumbnail.link}
                                                    onChange={formik.handleChange}
                                                />
                                                <MessageFormikError
                                                    formikErrorValue={formik.errors.container?.[index]?.thumbnail?.link}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Form.Item>

                                    <Form.Item label="Box Product" className={cx('label-edit')}>
                                        {item.productBoxTheme.map((dataBoxProduct, indexBoxProduct) => (
                                            <Form.Item
                                                label={`${indexBoxProduct + 1}`}
                                                className={cx('label-edit')}
                                                style={{ marginTop: '40px' }}
                                                key={indexBoxProduct}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        marginLeft: '20px',
                                                        flexWrap: 'wrap',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            margin: '20px 20px 0 20px',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <ImageCustom
                                                            file={dataBoxProduct.imageBox}
                                                            handleEdit={() =>
                                                                editInputBoxProduct(
                                                                    formik.values.container,
                                                                    'container',
                                                                    index,
                                                                    indexBoxProduct,
                                                                )
                                                            }
                                                            handleFileChange={(e) =>
                                                                handleFileChangeBoxProduct(e, index, indexBoxProduct)
                                                            }
                                                            width="150px"
                                                            height="150px"
                                                        />
                                                        <MessageFormikError
                                                            formikErrorValue={
                                                                formik.errors.container?.[index]?.productBoxTheme?.[
                                                                    indexBoxProduct
                                                                ]?.imageBox
                                                            }
                                                        />
                                                    </div>
                                                    <div className={cx('input-title-and-link')}>
                                                        <Form.Item
                                                            label="Title"
                                                            className={cx('label-edit')}
                                                            style={{ margin: '20px 20px 0 20px' }}
                                                        >
                                                            <Input
                                                                name={`container[${index}].productBoxTheme[${indexBoxProduct}].titleBox`}
                                                                value={
                                                                    formik.values.container[index].productBoxTheme[
                                                                        indexBoxProduct
                                                                    ].titleBox
                                                                }
                                                                onChange={formik.handleChange}
                                                            />
                                                            <MessageFormikError
                                                                formikErrorValue={
                                                                    formik.errors.container?.[index]?.productBoxTheme?.[
                                                                        indexBoxProduct
                                                                    ]?.titleBox
                                                                }
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Link"
                                                            className={cx('label-edit')}
                                                            style={{ margin: '20px 20px 0 20px' }}
                                                        >
                                                            <Input
                                                                name={`container[${index}].productBoxTheme[${indexBoxProduct}].slugBox`}
                                                                value={dataBoxProduct.slugBox}
                                                                onChange={formik.handleChange}
                                                            />
                                                            <MessageFormikError
                                                                formikErrorValue={
                                                                    formik.errors.container?.[index]?.productBoxTheme?.[
                                                                        indexBoxProduct
                                                                    ]?.slugBox
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <Space>
                                                    <DeleteOutlined
                                                        onClick={() =>
                                                            deleteInputBoxProduct(
                                                                formik.values.container,
                                                                index,
                                                                indexBoxProduct,
                                                            )
                                                        }
                                                        style={{
                                                            color: '#ff4d4f',
                                                            cursor: 'pointer',
                                                            fontSize: '1.8rem',
                                                            marginLeft: '20px',
                                                        }}
                                                        className={cx('button-delete-box-product')}
                                                    />
                                                </Space>
                                            </Form.Item>
                                        ))}

                                        <Button
                                            type="link"
                                            onClick={() =>
                                                addInputBoxProduct(formik.values.container, 'container', index)
                                            }
                                        >
                                            Add
                                        </Button>
                                    </Form.Item>
                                    <Form.Item label="Link Button" className={cx('label-edit')}>
                                        <Input
                                            name={`container[${index}].linkButton`}
                                            value={item.linkButton}
                                            onChange={formik.handleChange}
                                        />
                                        <MessageFormikError
                                            formikErrorValue={formik.errors.container?.[index]?.linkButton}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Link Data Box" className={cx('label-edit')}>
                                        <Input
                                            name={`container[${index}].link`}
                                            value={item.link}
                                            onChange={formik.handleChange}
                                        />
                                        <MessageFormikError formikErrorValue={formik.errors.container?.[index]?.link} />
                                    </Form.Item>
                                    <Form.Item label="Background Color" className={cx('label-edit')}>
                                        <Input
                                            name={`container[${index}].backgroundColor`}
                                            value={item.backgroundColor}
                                            onChange={formik.handleChange}
                                        />
                                        <MessageFormikError
                                            formikErrorValue={formik.errors.container?.[index]?.backgroundColor}
                                        />
                                    </Form.Item>
                                </div>
                                <Space>
                                    <DeleteOutlined
                                        onClick={() => deleteInput(formik.values.container, index)}
                                        style={{
                                            color: '#ff4d4f',
                                            cursor: 'pointer',
                                            fontSize: '1.8rem',
                                            marginLeft: '20px',
                                        }}
                                        className={cx('button-delete')}
                                    />
                                </Space>
                            </Form.Item>
                        ))}
                        <Button
                            danger
                            onClick={() => addInput(formik.values.container, 'container')}
                            style={{ marginLeft: '20px' }}
                        >
                            Add
                        </Button>
                    </Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="primary"
                            onClick={() => {
                                handleSubmit();
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

export default BoxProductHome;
