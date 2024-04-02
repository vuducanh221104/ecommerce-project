import classNames from 'classnames/bind';
import styles from './EditDetailProduct.module.scss';

import React, { useEffect, useState } from 'react';
import { Button, Space, Form, Input } from 'antd';
import { DeleteOutlined, TableOutlined, PlusOutlined } from '@ant-design/icons';

import axios from 'axios';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import TextArea from 'antd/es/input/TextArea';
import ModalLoading from '~/pages/Admin/components/ModalLoading';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import { useFormikProductDetail } from '~/FormikConfig/FormikProduct';
import { useMessage } from '~/pages/Admin/components/Message';
import { getProductSlug, patchProductDetail } from '~/pages/Admin/services/productServices';
import { uploadImageColor } from '~/pages/Admin/services/uploadServieces';

const cx = classNames.bind(styles);

function EditDetailProduct({ recordSlug, forwardedRef, productValid, setDetailValid, name, price, price_prepay }) {
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();
    const [id, setId] = useState([]);
    const [loading, setLoading] = useState(false);

    // FORMIK
    const formik = useFormikProductDetail();

    useEffect(() => {
        const fetchApi = () => {
            getProductSlug(recordSlug)
                .then((res) => {
                    setId(res._id);
                    formik.setValues({
                        name: res.name,
                        images: res.images,
                        price: res.price,
                        color: res.color,
                        storage: res.storage,
                        description: res.description,
                        introduce: res.introduce,
                        infomation: res.infomation,
                        amount: res.amount,
                        subcategorySlug: res.subcategory_slug,
                    });
                })
                .catch((err) => console.log(err));
        };
        fetchApi();
    }, []);

    // MARDOWN
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }) {
        formik.setFieldValue('description', text);
    }
    function handleEditorChangeIntroduce({ html, text }) {
        formik.setFieldValue('introduce', text);
    }

    // BUTTON ADD & DELETE
    const addInput = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, [...formikValuesData, '']);
    };
    const deleteInput = (formikValuesData, nameValue, index) => {
        const updateData = formikValuesData.filter((item, i) => i !== index);
        formik.setFieldValue(nameValue, updateData);
    };

    useEffect(() => {
        setDetailValid(formik.isValid);
    }, [formik.isValid]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (formik.isValid && productValid) {
                // Filter the images array to keep only the File objects
                const filesToUpload = formik.values.images.filter((item) => item instanceof File);

                if (filesToUpload.length > 0) {
                    // There are files to upload, proceed with Cloudinary upload
                    const formData = new FormData();

                    for (let i = 0; i < filesToUpload.length; i++) {
                        formData.append('img', filesToUpload[i]);
                    }

                    const { data: cloudinaryData } = await uploadImageColor(formData);

                    // Map cloudinaryData to formik.values.images
                    const fileIndices = formik.values.images
                        .map((item, index) => (item instanceof File ? index : null))
                        .filter((index) => index !== null);

                    fileIndices.forEach((itemIndex, index) => {
                        formik.values.images[itemIndex] = cloudinaryData[index].path;
                    });
                }

                // Update product details
                const values = {
                    name: name,
                    price: price,
                    price_prepay: price_prepay,
                    images: formik.values.images,
                    color: formik.values.color,
                    subcategory_slug: formik.values.subcategorySlug,
                    storage: formik.values.storage,
                    description: formik.values.description,
                    introduce: formik.values.introduce,
                    infomation: formik.values.infomation,
                    amount: formik.values.amount,
                    stored: formik.values.stored,
                };
                await patchProductDetail(id, values);

                messageSuccess();
            } else {
                messageMissingInput();
            }
        } catch (error) {
            console.error('Error handling product details save:', error);
            messageError();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (forwardedRef) {
            forwardedRef.current = handleSubmit;
        }
    }, [forwardedRef, handleSubmit]);

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
    const handleChangeFileDetail = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
        formik.setFieldValue('images', [...formik.values.images, ...fileArray]);
    };
    const handleFileChange = (e, nameValues) => {
        const target = e.target.files[0];
        formik.setFieldValue(nameValues, target);
    };
    const deleteImage = (index) => {
        const updatedImages = formik.values.images.filter((item, i) => i !== index);
        formik.setFieldValue('images', updatedImages);
    };
    const editImage = (formikValuesData, nameValue, index) => {
        const updatedImages = [...formikValuesData];
        updatedImages[index] = '';
        formik.setFieldValue(nameValue, updatedImages);
    };

    return (
        <>
            {contextHolder}
            {loading && <ModalLoading />}
            <div>
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
                    {formik.errors.description && <p className={cx('error-message')}>{formik.errors.description}</p>}
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
                                defaultValue={formik.values.infomation}
                                value={formik.values.infomation}
                                onChange={formik.handleChange}
                                style={{ height: '270px', width: '689px', padding: '10px 20px' }}
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
                    </div>
                    {formik.errors.infomation && <p className={cx('error-message')}>{formik.errors.infomation}</p>}
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
                                                <div style={{ position: 'absolute', top: '25px', left: '25px' }}>
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
                <Form.Item label={'Color'} className={cx('label-custom')}>
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
                                                    handleEdit={() => editImage(formik.values.color, 'color', index)}
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
                                                defaultValue={item.name}
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
                                                defaultValue={item.price}
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
                                                defaultValue={item.stored}
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
                {/* STORAGE */}
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginLeft: '34px' }}>Storage :</h3>
                    {(formik.values.storage || []).map((item, index) => (
                        <div style={{ marginLeft: '25px' }} key={index}>
                            <Form.Item label={`${index + 1}`} className={cx('label-edit')}>
                                <div style={{ display: 'flex', marginLeft: '10px', marginTop: '30px' }}>
                                    <span style={{ marginRight: '10px', lineHeight: '40px' }}>Name:</span>
                                    <Input
                                        name={`storage[${index}].name`}
                                        id={`storage[${index}].name`}
                                        defaultValue={item.name}
                                        value={item.name}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors?.storage?.[index]?.name && (
                                        <p className={cx('error-message')}>{formik.errors?.storage?.[index]?.name}</p>
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
                                        defaultValue={item.price}
                                        value={item.price}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors?.storage?.[index]?.price && (
                                        <p className={cx('error-message')}>{formik.errors?.storage?.[index]?.price}</p>
                                    )}
                                    <span style={{ marginLeft: '10px', marginRight: '10px', lineHeight: '40px' }}>
                                        Link:
                                    </span>
                                    <Input
                                        name={`storage[${index}].link`}
                                        id={`storage[${index}].link`}
                                        defaultValue={item.link}
                                        value={item.link}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors?.storage?.[index]?.link && (
                                        <p className={cx('error-message')}>{formik.errors?.storage?.[index]?.link}</p>
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
                        style={{ marginLeft: '18%', marginTop: '-10px' }}
                    >
                        Add...
                    </Button>
                </div>
                {/* Category Product Relative*/}
                <div className={'wrapper-custom'}>
                    <Form.Item label="Category Product Relative" className={cx('label-edit')}>
                        <Input
                            name="subcategorySlug"
                            defaultValue={formik.values.subcategorySlug}
                            value={formik.values.subcategorySlug}
                            onChange={formik.handleChange}
                            style={{ marginTop: '0px' }}
                        />
                        {formik.errors.subcategorySlug && (
                            <p className={cx('error-message')}>{formik.errors.subcategorySlug}</p>
                        )}
                    </Form.Item>
                </div>
            </div>
        </>
        // </Modal>
    );
}

export default EditDetailProduct;
