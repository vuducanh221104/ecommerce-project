import classNames from 'classnames/bind';
import styles from './AddUser.module.scss';

import React, { useEffect, useState } from 'react';
import { Button, Input, Form } from 'antd';
import ModalLoading from '~/pages/Admin/components/ModalLoading';
import WrapperContainer from '~/pages/Admin/components/WrapperContainer';
import {  useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useFormikUser } from '~/FormikConfig/FormikUser';
import MessageFormikError from '~/components/MessageFormikError';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import { useMessage } from '~/pages/Admin/components/Message';
import { uploadImageColor } from '~/pages/Admin/services/uploadServieces';
import { addUser } from '~/pages/Admin/services/userServieces';

const cx = classNames.bind(styles);
function AddUser() {
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        formik.isValid = false;
    }, []);

    const formik = useFormikUser();


    const handleFileChange = (e, nameValue) => {
        const target = e.target.files[0];
        formik.setFieldValue(nameValue, target);
    };
    const editImage = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, (formikValuesData = ''));
    };

    // BUTTON ADD & DELETE
    const handleClick = async () => {
        if (formik.isValid) {
            setLoading(true);
            try {
                // HANDLE IMAGE THUMB
                const formData = new FormData();

                formData.append('img', formik.values.avatar);

                if(formik.values.avatar){
                    const dataAvatar = await uploadImageColor(formData);
                    formik.values.avatar = dataAvatar.data[0].path;

                }
                await addUser(formik.values);
                formik.resetForm();
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
            <WrapperContainer title={'Add User'}>
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

                        <Form.Item label="FullName">
                            <Input name="fullname" value={formik.values.fullname} onChange={formik.handleChange} />
                            <MessageFormikError formikErrorValue={formik.errors.fullname} />
                        </Form.Item>
                        <Form.Item label="Username">
                            <Input name="username" value={formik.values.username} onChange={formik.handleChange} />
                            <MessageFormikError formikErrorValue={formik.errors.username} />
                        </Form.Item>
                        <Form.Item label="Avatar">
                            <ImageCustom
                                file={formik.values.avatar}
                                handleFileChange={(e) => handleFileChange(e, `avatar`)}
                                handleEdit={() => editImage(formik.values.avatar, 'avatar')}
                            />

                            <MessageFormikError formikErrorValue={formik.errors.avatar} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
                            <MessageFormikError formikErrorValue={formik.errors.email} />
                        </Form.Item>
                        <Form.Item label="Phone">
                            <Input name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                            <MessageFormikError formikErrorValue={formik.errors.phone} />
                        </Form.Item>
                        <Form.Item label="Password">
                            <Input name="password" value={formik.values.password} onChange={formik.handleChange} />
                            <MessageFormikError formikErrorValue={formik.errors.password} />
                        </Form.Item>
                        <Form.Item label="Role">
                            <Input name="role" value={formik.values.role} onChange={formik.handleChange} />
                            <MessageFormikError formikErrorValue={formik.errors.role} />
                        </Form.Item>
                    </>
                    {/* ))} */}

                    {/* BUTTON */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="primary" onClick={handleClick}>
                            {' '}
                            Submit
                        </Button>
                    </div>
                </Form>
            </WrapperContainer>
        </>
    );
}

export default AddUser;
