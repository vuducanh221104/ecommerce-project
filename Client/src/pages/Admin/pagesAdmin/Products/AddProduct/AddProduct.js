import classNames from 'classnames/bind';
import styles from './AddProduct.module.scss';

import React, { useEffect, useState } from 'react';
import { Button, Space, Form, Input, Tooltip, Radio, message, Select } from 'antd';
import { DeleteOutlined, TableOutlined } from '@ant-design/icons';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import WrapperContainer from '~/pages/Admin/components/WrapperContainer';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import ModalLoading from '~/pages/Admin/components/ModalLoading';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import { useFormikProductBoth } from '~/FormikConfig/FormikProduct';
import { useMessage } from '~/pages/Admin/components/Message';
import { uploadImageColor } from '~/pages/Admin/services/uploadServieces';
import { addProduct, addProductDetail } from '~/pages/Admin/services/productServices';

const cx = classNames.bind(styles);

function AddProduct() {
    const Navigate = useNavigate();
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);

    // FORMIK
    const formik = useFormikProductBoth();

    // HANDLE SUBMIT
    const uploadImage = async (url, formData) => {
        try {
            const response = await axios.post(url, formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    const handleClick = async () => {
        setLoading(true);
        if (formik.isValid) {
            try {
                // First axios request - Upload the main image
                const formDataImageMain = new FormData();
                formDataImageMain.append('img', formik.values.image);

                const mainImageResponse = await uploadImageColor(formDataImageMain);
                formik.values.image = mainImageResponse.data[0].path;

                const valuesProduct = {
                    image: formik.values.image,
                    name: formik.values.name,
                    price: formik.values.price,
                    price_discount: formik.values.price_discount,
                    price_prepay: formik.values.prepay,
                    percent_discount: formik.values.percent_discount,
                    brand: formik.values.brand,
                    type: formik.values.type,
                    stored: formik.values.stored,
                    category: {
                        category_slug: formik.values.category.category_slug,
                        category_item_slug: formik.values.category.category_item_slug,
                        category_item_child_slug: formik.values.category.category_item_child_slug,
                    },
                };
                await addProduct(valuesProduct);

                // Third axios request - Upload multiple images
                const formDataImages = new FormData();
                formik.values.images.forEach((image, index) => {
                    formDataImages.append('img', image);
                });

                const imageUploadResponse = await uploadImageColor(formDataImages);
                formik.values.images = imageUploadResponse.data.map((image) => image.path);

                // Fourth axios request - Upload color images
                const formDataImageColor = new FormData();
                formik.values.color.forEach((item, index) => {
                    formDataImageColor.append('img', item.image);
                });

                const colorImageUploadResponse = await uploadImageColor(formDataImageColor);
                colorImageUploadResponse.data.forEach((image, index) => {
                    formik.values.color[index].image = image.path;
                });

                // API PRODUCT DETAILS
                const valuesProductDetail = {
                    name: formik.values.name,
                    images: formik.values.images,
                    price: formik.values.price,
                    price_prepay: formik.values.prepay,
                    color: formik.values.color,
                    subcategory_slug: formik.values.subcategory_slug,
                    storage: formik.values.storage,
                    description: formik.values.description,
                    introduce: formik.values.introduce,
                    infomation: formik.values.infomation,
                    amount: 1,
                };
                await addProductDetail(valuesProductDetail);
                messageSuccess();
                formik.resetForm();
            } catch (error) {
                console.error(error);
                messageError();
            } finally {
                setLoading(false);
            }
        } else {
            messageMissingInput();
            setLoading(false);
        }
    };

    // HANDLE FILE CHANGE
    const handleFileChange = (e, nameValues) => {
        const target = e.target.files[0];
        formik.setFieldValue(nameValues, target);
        URL.revokeObjectURL(e.target.files[0]);
    };
    const handleChangeFileDetail = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
        formik.setFieldValue('images', [...formik.values.images, ...fileArray]);
        URL.revokeObjectURL(e.target.files);
    };
    // BUTTON ADD & DELETE
    const addInput = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, [...formikValuesData, '']);
    };
    const deleteInput = (formikValuesData, nameValue, index) => {
        const updateData = formikValuesData.filter((item, i) => i !== index);
        formik.setFieldValue(nameValue, updateData);
    };
    const deleteImage = (index) => {
        const updatedImages = formik.values.images.filter((item, i) => i !== index);
        formik.setFieldValue('images', updatedImages);
    };
    const editImage = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, (formikValuesData = ''));
    };

    // MARDOWN
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }) {
        formik.setFieldValue('description', text);
    }
    function handleEditorChangeIntroduce({ html, text }) {
        formik.setFieldValue('introduce', text);
    }

    // Function to add a new HTML structure to the information field
    const addNewInfo = () => {
        const existingInfo = formik.values.infomation;
        const newInfo = `
          <tr>
             <th>Cot</th>
             <td>
                 <p>Data</p>
             </td>
         </tr>
             `;
        formik.setFieldValue('infomation', existingInfo + newInfo);
    };
    const addNewInfoBr = () => {
        const existingInfo = formik.values.infomation;
        const newInfo = `
          <tr>
             <th>Cot</th>
             <td>
                 Data
                 <br>Data
                 <br>Data
             </td>
         </tr>
             `;
        formik.setFieldValue('infomation', existingInfo + newInfo);
    };

    return (
        <>
            {contextHolder}
            {loading && <ModalLoading />}
            <WrapperContainer title={'Add New Product'}>
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
                        marginTop: '20px',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item label="Image" className={cx('label-edit')}>
                        <Form.Item className={cx('label-edit')} style={{ marginTop: '20px' }}>
                            <ImageCustom
                                file={formik.values.image}
                                handleEdit={() => editImage(formik.values.image, 'image')}
                                handleFileChange={(e) => handleFileChange(e, 'image')}
                                width="200px"
                                height="200px"
                            />

                            {formik.errors.image && <p className={cx('error-message')}>{formik.errors.image}</p>}
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Name" className={cx('label-edit')}>
                        <Input name="name" id="name" value={formik.values.name} onChange={formik.handleChange} />
                        {formik.errors.name && <p className={cx('error-message')}>{formik.errors.name}</p>}
                    </Form.Item>
                    <Form.Item label="Price" className={cx('label-edit')}>
                        <Input name="price" id="price" value={formik.values.price} onChange={formik.handleChange} />
                        {formik.errors.price && <p className={cx('error-message')}>{formik.errors.price}</p>}
                    </Form.Item>
                    <Form.Item label="Price Discount" className={cx('label-edit')}>
                        <Input
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
                            name="price_prepay"
                            id="price_prepay"
                            value={formik.values.price_prepay}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.price_prepay && (
                            <p className={cx('error-message')}>{formik.errors.price_prepay}</p>
                        )}
                    </Form.Item>
                    <Form.Item label="Percent Discount:" className={cx('label-edit')}>
                        <Input
                            name="percent_discount"
                            id="percent_discount"
                            value={formik.values.percent_discount}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.price_discount && (
                            <p className={cx('error-message')}>{formik.errors.price_discount}</p>
                        )}
                    </Form.Item>
                    <Form.Item label="Brand" className={cx('label-edit')}>
                        <Input name="brand" id="brand" value={formik.values.brand} onChange={formik.handleChange} />
                        {formik.errors && formik.errors.brand && (
                            <p className={cx('error-message')}>{formik.errors.brand}</p>
                        )}
                    </Form.Item>
                    <Form.Item label="Type :" className={cx('label-edit')}>
                        <Input name="type" id="type" value={formik.values.type} onChange={formik.handleChange} />
                        {formik.errors.type && <p className={cx('error-message')}>{formik.errors.type}</p>}
                    </Form.Item>
                    <Form.Item label="Category :" className={cx('label-edit')}>
                        <div style={{ marginTop: '50px' }}>
                            <Form.Item label="Category Slug" className={cx('label-edit')} style={{}}>
                                <Input
                                    name="category.category_slug"
                                    id="category.category_slug"
                                    value={formik.values.category.category_slug}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.category && formik.errors.category.category_slug && (
                                    <p className={cx('error-message')}>{formik.errors.category.category_slug}</p>
                                )}
                            </Form.Item>
                            <Form.Item label="Category Item Slug" className={cx('label-edit')} style={{}}>
                                <Input
                                    name="category.category_item_slug"
                                    id="category.category_item_slug"
                                    value={formik.values.category.category_item_slug}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.category && formik.errors.category.category_item_slug && (
                                    <p className={cx('error-message')}>{formik.errors.category.category_item_slug}</p>
                                )}
                            </Form.Item>
                            <Form.Item label="Category Item Child Slug" className={cx('label-edit')} style={{}}>
                                <Input
                                    name="category.category_item_child_slug"
                                    id="category.category_item_child_slug"
                                    value={formik.values.category.category_item_child_slug}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.category && formik.errors.category.category_item_child_slug && (
                                    <p className={cx('error-message')}>
                                        {formik.errors.category.category_item_child_slug}
                                    </p>
                                )}
                            </Form.Item>
                        </div>
                    </Form.Item>
                    <Form.Item label="Description" className={cx('label-edit')}>
                        <div style={{ maxWidth: '100%' }}>
                            <MdEditor
                                style={{ height: '250px', wordWrap: 'break-word' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={handleEditorChange}
                                name="description"
                                value={formik.values.description}
                                className={cx('markdown')}
                            />
                        </div>
                        {formik.errors.description && (
                            <p className={cx('error-message')}>{formik.errors.description}</p>
                        )}
                    </Form.Item>
                    <Form.Item label="Introduce" className={cx('label-edit')}>
                        <div style={{ maxWidth: '100%' }}>
                            <MdEditor
                                style={{ height: '250px', wordWrap: 'break-word' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={handleEditorChangeIntroduce}
                                name="introduce"
                                value={formik.values.introduce}
                                className={cx('markdown')}
                            />
                        </div>
                        {formik.errors.introduce && <p className={cx('error-message')}>{formik.errors.introduce}</p>}
                    </Form.Item>
                    <Form.Item label="Infomation" className={cx('label-edit')}>
                        <div>
                            <div className={cx('navigation')}>
                                <TableOutlined onClick={addNewInfo} style={{ marginLeft: '10px' }} />
                                <h3
                                    style={{
                                        margin: '0',
                                        padding: '7px 8px',
                                        cursor: 'pointer',
                                        marginLeft: '10px',
                                    }}
                                    onClick={addNewInfoBr}
                                >
                                    br
                                </h3>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <TextArea
                                    name="infomation"
                                    value={formik.values.infomation}
                                    onChange={formik.handleChange}
                                    style={{ height: '270px', width: '640px', padding: '10px 20px' }}
                                />
                                <div className={cx('product-descripion-specifications')}>
                                    <div
                                        className={cx('specifications-content')}
                                        dangerouslySetInnerHTML={{
                                            __html: `<table>${formik.values.infomation}</table>`,
                                        }}
                                    />
                                </div>
                            </div>
                            {formik.errors.infomation && (
                                <p className={cx('error-message')}>{formik.errors.infomation}</p>
                            )}
                        </div>
                    </Form.Item>
                    <Form.Item label="Images" className={cx('label-custom')}>
                        <div style={{ marginTop: '20px' }}>
                            <Form.Item className={cx('label-edit')} style={{ margin: '20px 0' }}>
                                <div style={{ marginTop: '20px' }}>
                                    <Form.Item className={cx('label-edit')} style={{ margin: '20px 0' }}>
                                        <div className={cx('wrapper-images-preview')}>
                                            {(formik.values.images || []).map((item, index) => (
                                                <ImageCustom
                                                    file={item}
                                                    handleDelete={() => deleteImage(index)}
                                                    index={index}
                                                    key={index}
                                                />
                                            ))}
                                            <div className={cx('upload-wrapper')}>
                                                <span className={cx('upload-content')}>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={handleChangeFileDetail}
                                                    />
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: '25px',
                                                            left: '25px',
                                                        }}
                                                    >
                                                        <PlusOutlined />
                                                        <div style={{ marginTop: '8px' }}>Upload</div>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </Form.Item>
                                </div>
                            </Form.Item>
                        </div>
                        {formik.errors.images && <p className={cx('error-message')}>{formik.errors.images}</p>}
                    </Form.Item>
                    <Form.Item label="Color" className={cx('label-custom')}>
                        <div>
                            <div style={{ marginTop: '55px' }}>
                                {(formik.values.color || []).map((item, index) => (
                                    <Form.Item label={`${index + 1}`} style={{ position: 'relative' }} key={index}>
                                        <div className={cx('custom-wrap-input')}>
                                            <Form.Item label={`Image`}>
                                                <div className={cx('image-color-available')}>
                                                    <ImageCustom
                                                        file={item.image}
                                                        index={index}
                                                        handleEdit={() =>
                                                            editImage(formik.values.color, 'color', index)
                                                        }
                                                        handleFileChange={(e) =>
                                                            handleFileChange(e, `color[${index}].image`)
                                                        }
                                                        width="100px"
                                                        height="100px"
                                                    />
                                                </div>
                                                {formik.errors.color?.[index]?.image && (
                                                    <p className={cx('error-message')}>
                                                        {formik.errors.color?.[index]?.image}
                                                    </p>
                                                )}
                                            </Form.Item>
                                            <Form.Item label={`Name`} className={cx('label-edit')}>
                                                <Input
                                                    name={`color[${index}].name`}
                                                    id={`color[${index}].name`}
                                                    value={item.name}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.errors.color?.[index]?.name && (
                                                    <p className={cx('error-message')}>
                                                        {formik.errors.color?.[index]?.name}
                                                    </p>
                                                )}
                                            </Form.Item>

                                            <Form.Item label={`Price`} className={cx('label-edit')}>
                                                <Input
                                                    name={`color[${index}].price`}
                                                    id={`color[${index}].price`}
                                                    value={item.price}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.errors.color?.[index]?.price && (
                                                    <p className={cx('error-message')}>
                                                        {formik.errors.color?.[index]?.price}
                                                    </p>
                                                )}
                                            </Form.Item>

                                            <Form.Item label={`Stored`} className={cx('label-edit')}>
                                                <Input
                                                    name={`color[${index}].stored`}
                                                    id={`color[${index}].stored`}
                                                    value={item.stored}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.errors.color?.[index]?.stored && (
                                                    <p className={cx('error-message')}>
                                                        {formik.errors.color?.[index]?.stored}
                                                    </p>
                                                )}
                                            </Form.Item>
                                            <Space>
                                                <DeleteOutlined
                                                    onClick={() => deleteInput(formik.values.color, 'color', index)}
                                                    className={cx('button-delete')}
                                                />
                                            </Space>
                                        </div>
                                    </Form.Item>
                                ))}
                                <Button
                                    type="link"
                                    onClick={() => addInput(formik.values.color, 'color')}
                                    style={{ marginLeft: '20px' }}
                                >
                                    Add...
                                </Button>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label="Storage" className={cx('label-custom')}>
                        {(formik.values.storage || []).map((item, index) => (
                            <div style={{ marginLeft: '25px' }} key={index}>
                                <Form.Item label={`${index + 1}`} className={cx('label-edit')}>
                                    <div style={{ display: 'flex', marginLeft: '10px', marginTop: '30px' }}>
                                        <span style={{ marginRight: '10px', lineHeight: '40px' }}>Name:</span>
                                        <Input
                                            name={`storage[${index}].name`}
                                            id={`storage[${index}].name`}
                                            value={item.name}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors?.storage?.[index]?.name && (
                                            <p className={cx('error-message')}>
                                                {formik.errors?.storage?.[index]?.name}
                                            </p>
                                        )}
                                        <span
                                            style={{
                                                marginLeft: '10px',
                                                marginRight: '10px',
                                                lineHeight: '40px',
                                            }}
                                        >
                                            Price:
                                        </span>
                                        <Input
                                            name={`storage[${index}].price`}
                                            id={`storage[${index}].price`}
                                            value={item.price}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors?.storage?.[index]?.price && (
                                            <p className={cx('error-message')}>
                                                {formik.errors?.storage?.[index]?.price}
                                            </p>
                                        )}
                                        <span style={{ marginLeft: '10px', marginRight: '10px', lineHeight: '40px' }}>
                                            Link:
                                        </span>
                                        <Input
                                            name={`storage[${index}].link`}
                                            id={`storage[${index}].link`}
                                            value={item.link}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors?.storage?.[index]?.link && (
                                            <p className={cx('error-message')}>
                                                {formik.errors?.storage?.[index]?.link}
                                            </p>
                                        )}
                                        <Space>
                                            <DeleteOutlined
                                                onClick={() => deleteInput(formik.values.storage, 'storage', index)}
                                                className={cx('button-delete')}
                                            />
                                        </Space>
                                    </div>
                                </Form.Item>
                            </div>
                        ))}
                        <Button
                            type="link"
                            onClick={() => addInput(formik.values.storage, 'storage')}
                            style={{ marginLeft: '40px', marginTop: '-10px' }}
                        >
                            Add...
                        </Button>
                    </Form.Item>
                    <div className={'wrapper-custom'}>
                        <Form.Item label="Category Product Relative " className={cx('label-edit')}>
                            <Input
                                name="subcategory_slug"
                                defaultValue={formik.values.subcategory_slug}
                                value={formik.values.subcategory_slug}
                                onChange={formik.handleChange}
                                style={{ marginTop: '0px' }}
                            />
                            {formik.errors.subcategory_slug && (
                                <p className={cx('error-message')}>{formik.errors.subcategory_slug}</p>
                            )}
                        </Form.Item>
                    </div>
                    <Form.Item label="Stored" className={cx('label-edit')}>
                        <Input name="stored" id="stored" value={formik.values.stored} onChange={formik.handleChange} />
                        {formik.errors.stored && <p className={cx('error-message')}>{formik.errors.stored}</p>}
                    </Form.Item>
                </Form>

                {/* BUTTON */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" onClick={handleClick}>
                        {' '}
                        Submit
                    </Button>
                </div>
            </WrapperContainer>
        </>
    );
}

export default AddProduct;
