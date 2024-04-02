import classNames from 'classnames/bind';
import styles from './EditUser.module.scss';

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Tooltip, message } from 'antd';

import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ModalLoading from '~/pages/Admin/components/ModalLoading';
import { useFormikUser } from '~/FormikConfig/FormikUser';
import ImageCustom from '~/pages/Admin/components/ImageCustom';
import MessageFormikError from '~/components/MessageFormikError';
import { useMessage } from '~/pages/Admin/components/Message';
import { editUser } from '~/pages/Admin/services/userServieces';
const cx = classNames.bind(styles);
function EditUser({ editUserId, recordId, setEditUserId, record }) {
    const { messageSuccess, messageError, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);

    const formik = useFormikUser();

    useEffect(() => {
        formik.setValues({
            fullname: record.fullname,
            username: record.username,
            avatar: record.avatar || null,
            email: record.email,
            phone: record.phone,
            password: record.password,
            isVerified: record.isVerified,
            createdAt: record.createdAt,
            role: record.role,
        });
    }, [record]);

    const handleFileChange = (e, nameValue) => {
        const target = e.target.files[0];
        formik.setFieldValue(nameValue, target);
    };
    const editImage = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, (formikValuesData = ''));
    };

    const handleClickOk = async () => {
        if (formik.isValid) {
            setLoading(true);
            await editUser(recordId, formik.values);
            try {
                messageSuccess();
            } catch (error) {
                console.error('Error updating user :', error);
                messageError();
            } finally {
                setLoading(false);
            }
        } else {
            messageError();
        }
    };

    return (
        <>
            {contextHolder}
            {loading && <ModalLoading />}
            <Modal
                title="EDIT"
                visible={editUserId === recordId}
                onOk={() => {
                    handleClickOk();
                }}
                onCancel={() => setEditUserId(null)}
                width={1100}
                style={{ marginTop: '-50px' }}
            >
                <p>
                    Id :<span style={{ fontWeight: '700', fontSize: '1.5rem' }}> {recordId}</span>
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
                    className={cx('testInput')}
                    style={{
                        maxWidth: '100%',
                        marginLeft: '10px',
                        fontWeight: '600',
                        padding: '0 20px',
                        overflowY: 'scroll',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item label="Avatar" name="avatar" className={cx('label-edit')}>
                        <ImageCustom
                            file={formik.values.avatar}
                            handleFileChange={(e) => handleFileChange(e, `avatar`)}
                            handleEdit={() => editImage(formik.values.avatar, 'avatar')}
                        />
                        <MessageFormikError formikErrorValue={formik.errors.avatar} />
                    </Form.Item>
                    <Form.Item label="Fullname" name="fullname" className={cx('label-edit')}>
                        <Input
                            name="fullname"
                            id="fullname"
                            defaultValue={record.fullname}
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                        />
                        <MessageFormikError formikErrorValue={formik.errors.fullname} />
                    </Form.Item>
                    <Form.Item label="Username" name="username" className={cx('label-edit')}>
                        <Tooltip placement="topLeft" title={record.username}>
                            <Input
                                name="username"
                                id="username"
                                defaultValue={record.username}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                        </Tooltip>
                        <MessageFormikError formikErrorValue={formik.errors.username} />
                    </Form.Item>
                    <Form.Item label="email" name="email" className={cx('label-edit')}>
                        <Input
                            name="email"
                            id="email"
                            defaultValue={record.email}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <MessageFormikError formikErrorValue={formik.errors.email} />
                    </Form.Item>
                    <Form.Item label="phone" name="phone" className={cx('label-edit')}>
                        <Input
                            name="phone"
                            id="phone"
                            defaultValue={record.phone}
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                        <MessageFormikError formikErrorValue={formik.errors.phone} />
                    </Form.Item>
                    <Form.Item label="password" name="password" className={cx('label-edit')}>
                        <Input
                            name="password"
                            id="password"
                            defaultValue={record.password}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <MessageFormikError formikErrorValue={formik.errors.password} />
                    </Form.Item>

                    <Form.Item label="isVerified" name="isVerified" className={cx('label-edit')} style={{}}>
                        <Input
                            name="isVerified"
                            id="isVerified"
                            defaultValue={record.isVerified}
                            value={formik.values.isVerified}
                            onChange={formik.handleChange}
                        />
                        <MessageFormikError formikErrorValue={formik.errors.isVerified} />
                    </Form.Item>
                    <Form.Item label="role" name="role" className={cx('label-edit')}>
                        <Input
                            name="role"
                            id="role"
                            defaultValue={record.role}
                            value={formik.values.role}
                            onChange={formik.handleChange}
                        />
                        <MessageFormikError formikErrorValue={formik.errors.role} />
                    </Form.Item>
                    <Form.Item label="createdAt" name="createdAt" className={cx('label-edit')}>
                        <Input name="createdAt" id="createdAt" disabled defaultValue={record.createdAt} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default EditUser;
