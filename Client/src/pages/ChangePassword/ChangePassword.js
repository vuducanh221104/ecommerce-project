import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import ErrorWarning from '~/components/ErrorWarning';
import { IconPrev } from '~/components/IconPrev';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '~/services/userServices';
import { store } from '~/redux/store';
import axiosRequest from '~/utils/axiosRequest';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function ChangePassword() {
    const dataUser = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showComfirmPassword, setShowComfirmPassword] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    useEffect(() => {
        axiosRequest(navigate);
    }, []);

    // EYE PASSWORD
    const handlePassword = (boolean) => {
        setShowPassword(boolean);
    };
    const handleConfirmPassword = (boolean) => {
        setShowComfirmPassword(boolean);
    };

    // HANDLE SUBMIT
    const formik = useFormik({
        initialValues: {
            oldpassword: '',
            newpassword: '',
            confirmnewpassword: '',
        },
        validationSchema: Yup.object({
            oldpassword: Yup.string().required('Required'),

            newpassword: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    'Password must be 7-19 characters and contain at least on letter ,one number and a spcial character',
                ),
            confirmnewpassword: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('newpassword'), null], 'Password must match'),
        }),
        onSubmit: async (values) => {
            if (values.oldpassword === values.newpassword) {
                setPasswordMatchError(true); // Mật khẩu mới trùng với mật khẩu cũ
            } else {
                // Mật khẩu mới không trùng với mật khẩu cũ, tiến hành thay đổi mật khẩu
                const response = await changePassword(dataUser.email, values.oldpassword, values.newpassword);

                if (response.status === 200) {
                    setShow(true);
                } else {
                    // Xử lý lỗi nếu cần
                }
            }
        },
    });

    // Values Cofirm

    const requiredCofirm = formik.values.oldpassword === '' || formik.values.newpassword === '';

    // Values Cofirm
    const BoolRequiredCofirm = !formik.values.oldpassword || !formik.values.newpassword;

    //  Validate Click
    const handleRegisterClick = () => {
        if (BoolRequiredCofirm) {
            return;
        }
    };

    return (
        <>
            <div className={cx('wrapper pt-0 pt-lg-0 container')}>
                <div className={cx('content')}>
                    {!show ? (
                        <>
                            <form className={cx('form-user', dataUser ? '' : 'd-none')} onSubmit={formik.handleSubmit}>
                                <div className={cx('change-password')}>
                                    <IconPrev urlPrev={'/user'} />
                                    <div className={cx('user-info-list')}>
                                        <div className={cx('user-info-item')}>
                                            <h3>Old password</h3>
                                            <input
                                                type="password"
                                                placeholder="Old password"
                                                id="oldpassword"
                                                name="oldpassword"
                                                value={formik.values.oldpassword}
                                                onChange={async (e) => {
                                                    formik.handleChange(e);
                                                    try {
                                                    } catch (err) {}
                                                }}
                                            />
                                            {formik.errors.oldpassword && (
                                                <p className={cx('error-message')}>{formik.errors.oldpassword}</p>
                                            )}
                                            {passwordMatchError && (
                                                <p className={cx('error-message')}>
                                                    Mật khẩu mới không được trùng với mật khẩu cũ.
                                                </p>
                                            )}
                                        </div>
                                        <div className={cx('user-info-item')}>
                                            <h3>New Password</h3>
                                            <div className={cx('user-box')}>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="New Password"
                                                    id="newpassword"
                                                    name="newpassword"
                                                    value={formik.values.newpassword}
                                                    onChange={formik.handleChange}
                                                />
                                                <div className={cx('register-eye')}>
                                                    {!showPassword && (
                                                        <BsEye
                                                            className={cx('icon-eye')}
                                                            onClick={() => {
                                                                handlePassword(true);
                                                            }}
                                                        />
                                                    )}
                                                    {showPassword && (
                                                        <BsEyeSlash
                                                            className={cx('icon-eye-slash')}
                                                            onClick={() => {
                                                                handlePassword(false);
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            {formik.errors.newpassword && (
                                                <p className={cx('error-message')}>{formik.errors.newpassword}</p>
                                            )}
                                        </div>
                                        <div className={cx('user-info-item')}>
                                            <h3>Cofirm New Password</h3>
                                            <div className={cx('user-box')}>
                                                <input
                                                    type={showComfirmPassword ? 'text' : 'password'}
                                                    placeholder="Cofirm New Password"
                                                    id="confirmnewpassword"
                                                    name="confirmnewpassword"
                                                    value={formik.values.confirmewpassword}
                                                    onChange={formik.handleChange}
                                                />
                                                <div className={cx('register-eye')}>
                                                    {!showComfirmPassword && (
                                                        <BsEye
                                                            className={cx('icon-eye')}
                                                            onClick={() => {
                                                                handleConfirmPassword(true);
                                                            }}
                                                        />
                                                    )}
                                                    {showComfirmPassword && (
                                                        <BsEyeSlash
                                                            className={cx('icon-eye-slash')}
                                                            onClick={() => {
                                                                handleConfirmPassword(false);
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            {formik.errors.confirmnewpassword && (
                                                <p className={cx('error-message')}>
                                                    {formik.errors.confirmnewpassword}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className={cx('btn-submit', requiredCofirm ? 'disabled' : '')}
                                        onClick={handleRegisterClick}
                                        disabled={requiredCofirm}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <ErrorWarning icon={faCircleCheck} title="SUCCESSFULLY" />
                    )}
                    {/* {!dataUser && <ErrorWarning title="ERROR" />}
                    {dataUser && dataUser.isVerified === false && <ErrorWarning title="YOU MUST VERIFY EMAIL" />} */}
                    {/* {dataUser.isVerified === false || (!dataUser && <ErrorWarning title="YOU MUST VERIFY EMAIL" />)} */}
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
