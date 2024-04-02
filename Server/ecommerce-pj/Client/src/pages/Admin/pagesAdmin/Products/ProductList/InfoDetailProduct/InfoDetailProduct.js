import classNames from 'classnames/bind';
import styles from './InfoDetailProduct.module.scss';

import { Form, Input, Tooltip, Image } from 'antd';

import MarkdownRender from '~/components/MarkdownRender';
import { useFormik } from 'formik';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import { getProductSlug } from '~/pages/Admin/services/productServices';

const cx = classNames.bind(styles);
function InfoDetailProduct({ recordSlug }) {
    const [id, setId] = useState([]);

    // const [messageApi, contextHolder] = message.useMessage();
    // const [loading, setLoading] = useState(false);
    // HANDLE MESSAGE
    // const success = (type, message) => {
    //     messageApi.open({
    //         type: type ? type : 'success',
    //         content: message ? message : 'Save Sucessfully',
    //     });
    // };
    // FORMIK VALUES
    const formik = useFormik({
        initialValues: {
            name: '',
            images: '',
            price: 0,
            color: '',
            storage: '',
            description: '',
            introduce: '',
            infomation: '',
            color: '',
            subcategorySlug: '',
            amount: 1,
        },
    });
    useEffect(() => {
        const fetchApi = () => {
            getProductSlug(recordSlug)
                .then((res) => {
                    setId(res._id);
                    console.log(res);
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
                        stored: res.stored,
                    });
                })
                .catch((err) => console.log(err));
        };
        fetchApi();
    }, []);

    return (
        <Form
            name="basic"
            className={cx('testInput')}
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
            <Form.Item label="Description" className={cx('label-edit')}>
                <div className={cx('description')}>
                    <MarkdownRender content={formik.values.description} />
                </div>
            </Form.Item>
            <Form.Item label="Introduce" className={cx('label-edit')}>
                <div className={cx('introduce')}>
                    <MarkdownRender content={formik.values.introduce} />
                </div>
            </Form.Item>
            <Form.Item label="Infomation" className={cx('label-edit')}>
                <div>
                    <div
                        className={cx('specifications-content')}
                        dangerouslySetInnerHTML={{
                            __html: `<table>${formik.values.infomation}</table>`,
                        }}
                    />
                </div>
            </Form.Item>
            <Form.Item label="Images" className={cx('label-custom')}>
                <div style={{ marginTop: '20px' }}>
                    <Form.Item className={cx('label-edit')} style={{ margin: '20px 0' }}>
                        <div style={{ marginTop: '20px' }}>
                            <Form.Item className={cx('label-edit')} style={{ margin: '20px 0' }}>
                                <div className={cx('wrapper-images-preview')}>
                                    {(formik.values.images || []).map((item, index) => (
                                        <div className={cx('wrapper-images-preview-content')} key={index}>
                                            <Image
                                                src={item}
                                                className={cx('wrapper-images-preview-img ')}
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Form.Item>
                        </div>
                    </Form.Item>
                </div>
            </Form.Item>
            <Form.Item label={'Color'} className={cx('label-custom')}>
                <div>
                    <div style={{ marginTop: '55px' }}>
                        <div className={cx('stock')}>
                            {(formik.values.color || []).map((item, index) => (
                                <Form.Item label={`${index + 1}`} style={{ position: 'relative' }} key={index}>
                                    <div className={cx('custom-wrap-input')}>
                                        <Form.Item label={`Image`}>
                                            <div className={cx('wrapper-images-preview-content')}>
                                                <Image src={item.image} className={cx('wrapper-images-preview-img ')} />
                                            </div>
                                        </Form.Item>
                                        <Form.Item label={`Name`} className={cx('label-edit')}>
                                            <Input
                                                name={`color[${index}].name`}
                                                id={`color[${index}].name`}
                                                defaultValue={item.name}
                                                value={item.name}
                                            />
                                        </Form.Item>

                                        <Form.Item label={`Price`} className={cx('label-edit')}>
                                            <Input
                                                name={`color[${index}].price`}
                                                id={`color[${index}].price`}
                                                defaultValue={item.price}
                                                value={item.price}
                                                onChange={formik.handleChange}
                                            />
                                        </Form.Item>

                                        <Form.Item label={`Stored`} className={cx('label-edit')}>
                                            <Input
                                                name={`color[${index}].stored`}
                                                id={`color[${index}].stored`}
                                                defaultValue={item.stored}
                                                value={item.stored}
                                            />
                                        </Form.Item>
                                    </div>
                                </Form.Item>
                            ))}
                        </div>
                    </div>
                </div>
            </Form.Item>
            <div>
                <h3 style={{ fontSize: '1.5rem', marginLeft: '34px' }}>Storage :</h3>
                {(formik.values.storage || []).map((item, index) => (
                    <div style={{ marginLeft: '25px' }} key={index}>
                        <Form.Item label={`${index + 1}`} className={cx('label-edit')}>
                            <div style={{ display: 'flex', marginLeft: '10px', marginTop: '30px' }}>
                                <span style={{ marginRight: '10px', lineHeight: '40px' }}>Name:</span>
                                <Input
                                    disabled
                                    name={`storage[${index}].name`}
                                    id={`storage[${index}].name`}
                                    defaultValue={item.name}
                                />
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
                                    disabled
                                    name={`storage[${index}].price`}
                                    id={`storage[${index}].price`}
                                    defaultValue={item.price}
                                />
                                <span style={{ marginLeft: '10px', marginRight: '10px', lineHeight: '40px' }}>
                                    Link:
                                </span>
                                <Tooltip placement="topLeft" title={`${item.link}}`}>
                                    <Input
                                        disabled
                                        name={`storage[${index}].link`}
                                        id={`storage[${index}].link`}
                                        defaultValue={item.link}
                                    />
                                </Tooltip>
                            </div>
                        </Form.Item>
                    </div>
                ))}
            </div>
            <Form.Item className={cx('label-edit')}>
                <h3 style={{ fontSize: '1.5rem' }}>Category Product Relative :</h3>
                <Input
                    disabled
                    name="subcategorySlug"
                    defaultValue={formik.values.subcategorySlug}
                    value={formik.values.subcategorySlug}
                    style={{ marginLeft: '130px', marginTop: '10px' }}
                />
            </Form.Item>
        </Form>
    );
}

export default InfoDetailProduct;
