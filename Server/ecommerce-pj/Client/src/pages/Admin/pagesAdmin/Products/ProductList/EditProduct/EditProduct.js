import classNames from 'classnames/bind';
import styles from './EditProduct.module.scss';

import React, { useEffect, useState, useRef } from 'react';

import { Form, Input, Modal } from 'antd';

import axios from 'axios';
import EditDetailProduct from '../EditDetailProduct';
import ImageCustom from '~/pages/Admin/components/ImageCustom';

import { useFormikProduct } from '~/FormikConfig/FormikProduct';
import { uploadImageColor } from '~/pages/Admin/services/uploadServieces';
import { patchProduct } from '~/pages/Admin/services/productServices';
const cx = classNames.bind(styles);
function EditProduct({ editProductId, recordId, setEditProductId, record }) {
    const saveDetailProductRef = useRef();

    // Callback in component editDetailProduct
    const [detailValid, setDetailValid] = useState(false);
    const [loading, setLoading] = useState(false);

    // FORMIK
    const formik = useFormikProduct();
    // SET FORMIK
    useEffect(() => {
        formik.setValues({
            image: record.image,
            name: record.name,
            price: record.originalPrice,
            price_discount: record.price,
            price_prepay: record.price_prepay,
            percent_discount: record.percent_discount,
            brand: record.brand,
            type: record.type,
            stored: record.stored,
            category: record.category,
        });
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        // If Product and Product Details both is true -> pass
        if (formik.isValid && detailValid) {
            const formData = new FormData();
            formData.append('img', formik.values.image);
            if (formik.values.image instanceof File) {
                const dataImage = await uploadImageColor(formData);
                formik.values.image = dataImage.data[0].path;
            }
            try {
                const values = {
                    image: formik.values.image,
                    name: formik.values.name,
                    price: formik.values.price,
                    price_discount: formik.values.price_discount,
                    price_prepay: formik.values.price_prepay,
                    percent_discount: formik.values.percent_discount,
                    type: formik.values.type,
                    brand: formik.values.brand,
                    stored: formik.values.stored,
                    isBuyMany: formik.values.isBuyMany,
                    category: formik.values.category,
                };
                patchProduct(editProductId, values);
            } catch (error) {
                console.error('Error updating product details:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const handleFileChange = (e, nameValues) => {
        const target = e.target.files[0];
        formik.setFieldValue(nameValues, target);
    };
    const editImage = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, (formikValuesData = ''));
    };

    return (
        <>
            <Modal
                title="EDIT"
                visible={editProductId === recordId}
                onOk={() => {
                    if (saveDetailProductRef.current) {
                        saveDetailProductRef.current();
                        handleSubmit();
                    }
                }}
                onCancel={() => setEditProductId(null)}
                width={1100}
                style={{ marginTop: '-50px' }}
            >
                <p>
                    Id :<span style={{ fontWeight: '700', fontSize: '1.5rem' }}> {record.actionEdit}</span>
                </p>
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
                        marginLeft: '10px',
                        fontWeight: '600',
                        padding: '0 20px',
                        maxHeight: '650px',
                        overflowY: 'scroll',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item label="Image" className={cx('label-edit')}>
                        <Form.Item className={cx('label-edit')}>
                            <>
                                <div className={cx('show-input-image')}>
                                    <ImageCustom
                                        file={formik.values.image}
                                        handleEdit={() => editImage(formik.values.image, 'image')}
                                        handleFileChange={(e) => handleFileChange(e, 'image')}
                                        width="200px"
                                        height="200px"
                                    />
                                </div>
                                {formik.errors.image && <p className={cx('error-message')}>{formik.errors.image}</p>}
                            </>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Name" className={cx('label-edit')}>
                        <Input
                            name="name"
                            id="name"
                            defaultValue={record.name}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.name && <p className={cx('error-message')}>{formik.errors.name}</p>}
                    </Form.Item>
                    <Form.Item label="Price" className={cx('label-edit')}>
                        <Input
                            defaultValue={record.originalPrice}
                            name="price"
                            id="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.price && <p className={cx('error-message')}>{formik.errors.price}</p>}
                    </Form.Item>
                    <Form.Item label="Price Discount" className={cx('label-edit')}>
                        <Input
                            defaultValue={record.price}
                            name="price_discount"
                            id="price_discount"
                            value={formik.values.price_discount}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.price_discount && (
                            <p className={cx('error-message')}>{formik.errors.price_discount}</p>
                        )}
                    </Form.Item>
                    <Form.Item label="Price Prepay" className={cx('label-edit')}>
                        <Input
                            defaultValue={record.price_prepay}
                            name="price_prepay"
                            id="price_prepay"
                            value={formik.values.price_prepay}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.price_prepay && (
                            <p className={cx('error-message')}>{formik.errors.price_prepay}</p>
                        )}
                    </Form.Item>
                    <Form.Item label="Percent Discount" className={cx('label-edit')}>
                        <Input
                            defaultValue={record.percent_discount}
                            name="percent_discount"
                            id="percent_discount"
                            value={formik.values.percent_discount}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.percent_discount && (
                            <p className={cx('error-message')}>{formik.errors.percent_discount}</p>
                        )}
                    </Form.Item>
                    <Form.Item label="Brand" className={cx('label-edit')} style={{}}>
                        <Input
                            name="brand"
                            id="brand"
                            defaultValue={record.brand}
                            value={formik.values.brand}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.brand && <p className={cx('error-message')}>{formik.errors.brand}</p>}
                    </Form.Item>
                    <Form.Item label="Type" className={cx('label-edit')}>
                        <Input
                            defaultValue={record.type}
                            name="type"
                            id="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.type && <p className={cx('error-message')}>{formik.errors.type}</p>}
                    </Form.Item>
                    <Form.Item label="Category" className={cx('label-edit')}>
                        <div style={{ marginTop: '40px' }}>
                            <Form.Item label="Category Slug" name="product" className={cx('label-edit')}>
                                <Input
                                    name="category.category_slug"
                                    id="category.category_slug"
                                    defaultValue={record.category.category_slug}
                                    value={formik.values.category.category_slug}
                                    onChange={(e) => formik.setFieldValue('category.category_slug', e.target.value)}
                                />
                                {formik.errors?.category?.category_slug && (
                                    <p className={cx('error-message')}>{formik.errors.category.category_slug}</p>
                                )}
                            </Form.Item>
                            <Form.Item label="Category Item Slug" className={cx('label-edit')}>
                                <Input
                                    name="category.category_item_slug"
                                    id="category.category_item_slug"
                                    defaultValue={record.category.category_item_slug}
                                    value={formik.values.category.category_item_slug}
                                    onChange={(e) =>
                                        formik.setFieldValue('category.category_item_slug', e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Category Item Child Slug" className={cx('label-edit')}>
                                <Input
                                    name="category.category_item_child_slug"
                                    id="category.category_item_child_slug"
                                    defaultValue={record.category.category_item_child_slug}
                                    value={formik.values.category.category_item_child_slug}
                                    onChange={(e) =>
                                        formik.setFieldValue('category.category_item_child_slug', e.target.value)
                                    }
                                />
                            </Form.Item>
                        </div>
                    </Form.Item>
                    {/* EDIT DETAILS */}
                    <EditDetailProduct
                        recordSlug={record.slug}
                        forwardedRef={saveDetailProductRef}
                        productValid={formik.isValid}
                        setDetailValid={setDetailValid}
                        name={formik.values.name}
                        price_discount={formik.values.price_discount}
                        price={formik.values.price}
                        price_prepay={formik.values.price_prepay}
                    />
                    <Form.Item label="Stored" name="stored" className={cx('label-edit')}>
                        <Input
                            defaultValue={record.stored}
                            name="stored"
                            id="stored"
                            value={formik.values.stored}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.stored && <p className={cx('error-message')}>{formik.errors.stored}</p>}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default EditProduct;
