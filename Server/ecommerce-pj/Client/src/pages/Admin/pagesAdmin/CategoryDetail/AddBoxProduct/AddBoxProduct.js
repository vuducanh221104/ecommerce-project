import classNames from 'classnames/bind';
import styles from './AddBoxProduct.module.scss';

import React, { useState } from 'react';
import { Button, Space, Input, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import ModalLoading from '~/pages/Admin/components/ModalLoading';
import WrapperContainer from '~/pages/Admin/components/WrapperContainer';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMessage } from '~/pages/Admin/components/Message';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import MessageFormikError from '~/components/MessageFormikError';
import { useFormikCategoryBox } from '~/FormikConfig/FormikCategory/FormikCategoryBox';
import { uploadImageColor } from '~/pages/Admin/services/uploadServieces';
import { addCategoryBoxProduct } from '~/pages/Admin/services/categoryServices';

const cx = classNames.bind(styles);

function AddBoxProduct() {
    const navigate = useNavigate();
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();

    const [loading, setLoading] = useState(false);

    const formik = useFormikCategoryBox();

    const handleFileChange = (e, nameValue) => {
        const target = e.target.files[0];
        formik.setFieldValue(nameValue, target);
    };
    const editImage = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, (formikValuesData = ''));
    };

    // BUTTON ADD & DELETE
    const addInput = () => {
        const newBoxProduct = {
            box_product_name: '',
            box_product_image: '',
            box_product_slug: '',
        };

        formik.setFieldValue('box_product', [...formik.values.box_product, newBoxProduct]);
    };

    const deleteInput = (formikValuesData, nameValue, index) => {
        const updateData = formikValuesData.filter((item, i) => i !== index);
        formik.setFieldValue(nameValue, updateData);
    };

    const handleClick = async () => {
        if (formik.isValid) {
            setLoading(true);
            try {
                // HANDLE IMAGE THUMB
                const formDataImageColor2 = new FormData();

                if (formik.values.category_image instanceof File) {
                    formDataImageColor2.append('img', formik.values.category_image);

                    const dataImageThumb = await uploadImageColor(formDataImageColor2);
                    formik.values.category_image = dataImageThumb.data[0].path;
                }

                // HANDLE BOX_PRODUCT
                const formDataImageColor = new FormData();

                formik.values.box_product.forEach((item, index) => {
                    formDataImageColor.append('img', item.box_product_image);
                });
                const dataImage = await uploadImageColor(formDataImageColor);
                formik.values.box_product.forEach((item, index) => {
                    formik.values.box_product[index].box_product_image = dataImage.data[index].path;
                });

                //  SAVE DATA
                await addCategoryBoxProduct(formik.values);
                messageSuccess();
            } catch (error) {
                console.error('Error:', error);
                messageError();
            } finally {
                setLoading(false);
            }
        } else {
            messageMissingInput();
        }
    };

    return (
        <>
            {contextHolder}
            {loading && <ModalLoading />}
            <WrapperContainer title={'Add Image Home'}>
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
                            onClick={() => navigate(-1)}
                        />
                        <Form.Item label="Image">
                            <div style={{ marginTop: '20px' }}>
                                <ImageCustom
                                    file={formik.values.category_image}
                                    handleEdit={() => editImage(formik.values.category_image, 'category_image')}
                                    handleFileChange={(e) => handleFileChange(e, 'category_image')}
                                    width="200px"
                                    height="200px"
                                />
                                <MessageFormikError formikErrorValue={formik.errors.category_image} />
                            </div>
                        </Form.Item>
                        <Form.Item label="Name">
                            <Input
                                name="category_name"
                                value={formik.values.category_name}
                                onChange={formik.handleChange}
                            />
                            <MessageFormikError formikErrorValue={formik.errors.category_name} />
                        </Form.Item>
                        <Form.Item label="Slug">
                            <Input
                                name="category_slug"
                                value={formik.values.category_slug}
                                onChange={formik.handleChange}
                            />
                            <MessageFormikError formikErrorValue={formik.errors.category_slug} />
                        </Form.Item>
                        <Form.Item label="Parent Slug">
                            <Input
                                name="category_parent_slug"
                                value={formik.values.category_parent_slug}
                                onChange={formik.handleChange}
                            />
                            <MessageFormikError formikErrorValue={formik.errors.category_parent_slug} />
                        </Form.Item>
                        {!formik.values.box_product.length <= 0 && (
                            <Form.Item label="Product">
                                <div style={{ marginTop: '40px', marginLeft: '30px' }}>
                                    {formik.values.box_product.map((item, index) => (
                                        <Form.Item
                                            label={index + 1}
                                            style={{ marginTop: '30px' }}
                                            className={cx('index-category')}
                                        >
                                            <Form.Item label="Box Name">
                                                <Input
                                                    name={`box_product[${index}].box_product_name`}
                                                    value={item.box_product_name}
                                                    onChange={formik.handleChange}
                                                />
                                                <MessageFormikError
                                                    formikErrorValue={
                                                        formik.errors.box_product?.[index]?.box_product_name
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item label="Slug">
                                                <Input
                                                    name={`box_product[${index}].box_product_slug`}
                                                    value={item.box_product_slug}
                                                    onChange={formik.handleChange}
                                                />
                                                <MessageFormikError
                                                    formikErrorValue={
                                                        formik.errors.box_product?.[index]?.box_product_slug
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item label="Image" className={cx('box-product-image')}>
                                                <ImageCustom
                                                    file={item.box_product_image}
                                                    handleEdit={() =>
                                                        editImage(
                                                            formik.values.box_product[index].box_product_image,
                                                            `box_product[${index}].box_product_image`,
                                                        )
                                                    }
                                                    handleFileChange={(e) =>
                                                        handleFileChange(e, `box_product[${index}].box_product_image`)
                                                    }
                                                />
                                            </Form.Item>
                                            <Space>
                                                <DeleteOutlined
                                                    onClick={() =>
                                                        deleteInput(formik.values.box_product, 'box_product', index)
                                                    }
                                                    style={{
                                                        color: '#ff4d4f',
                                                        cursor: 'pointer',
                                                        fontSize: '1.8rem',
                                                        marginLeft: '20px',
                                                    }}
                                                    className={cx('btn-detele')}
                                                />
                                            </Space>
                                        </Form.Item>
                                    ))}

                                    <Button
                                        type="link"
                                        onClick={() => addInput('box_product')}
                                        style={{ marginLeft: '20px', marginTop: '-10px' }}
                                    >
                                        Add...
                                    </Button>
                                </div>
                            </Form.Item>
                        )}
                    </>
                </Form>
                {/* BUTTON */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" onClick={handleClick}>
                        Submit
                    </Button>
                </div>
            </WrapperContainer>
        </>
    );
}

export default AddBoxProduct;
