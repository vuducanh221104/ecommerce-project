import classNames from 'classnames/bind';
import styles from './ChangeAvatar.module.scss';
import axios from 'axios';
import ErrorWarning from '~/components/ErrorWarning';

import { IconPrev } from '~/components/IconPrev';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import * as userServices from '~/services/userServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosRequest from '~/utils/axiosRequest';
import { changeUser } from '~/redux/authSlice';
import { uploadAvatar } from '~/services/uploadServices';

const cx = classNames.bind(styles);
function ChangeAvatar() {
    const dataUser = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(true);

    useEffect(() => {
        axiosRequest(navigate);
    }, []);

    // UPLOAD AVATAR
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setValue(false);
    };

    const handleUpload = () => {
        if (selectedFile) {
            setLoading(true);
            const formData = new FormData();
            formData.append('img', selectedFile);
            formData.append('_id', dataUser._id);

            uploadAvatar(formData)
                .then((response) => {
                    const newUser = {
                        ...dataUser,
                        avatar: response,
                    };
                    dispatch(changeUser(newUser));
                    setSuccess(true);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Upload failed:', error);
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <div className={cx('wrapper pt-0 pt-lg-0 container')}>
                <div className={cx('content')}>
                    {dataUser ? (
                        <div className={cx('user')}>
                            <IconPrev urlPrev={'/user'} />
                            <div className={cx('change-avatar')}>
                                <h3>Thay đổi avatar</h3>
                                {selectedFile && (
                                    <img
                                        src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                                        alt="Avatar"
                                        className={cx('avatar-img')}
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    handle
                                    name="img"
                                    id="img"
                                    onChange={(e) => handleFileChange(e)}
                                />
                            </div>
                            {success && !loading && (
                                <p className={cx('text-success')}>
                                    Thay Đổi Avatar Thành Công <FontAwesomeIcon icon={faCircleCheck} />
                                </p>
                            )}
                            {loading && (
                                <div className={cx('loading')}>
                                    <FontAwesomeIcon className={cx('icon-loading')} icon={faCircleNotch} />
                                </div>
                            )}
                            <button
                                onClick={() => handleUpload()}
                                className={cx('btn-submit', !selectedFile || value ? 'disabled' : '')}
                            >
                                Upload Avatar
                            </button>
                        </div>
                    ) : (
                        <ErrorWarning title="ERROR" />
                    )}
                </div>
            </div>
        </>
    );
}

export default ChangeAvatar;
