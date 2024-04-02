import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';

import ErrorWarning from '~/components/ErrorWarning';
import { BsPerson } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import ModalLoading from '~/components/ModalLoading';
import * as Yup from 'yup';
import { BsEnvelopeCheck } from 'react-icons/bs';
import { checkEmail, forgotPassword } from '~/services/userServices';
import { useDebounce } from '~/hooks';
const cx = classNames.bind(styles);
function ForgotPassword() {
    const dataUser = useSelector((state) => state.auth.login.currentUser);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showVeirfy, setShowVerify] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    let show = true;

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Required')
                .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'Please Enter a valid email',
                ),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setShowVerify(true);
            }, 5000);
            await forgotPassword(values.email);
        },
    });

    // Debounce
    const debouncedEmail = useDebounce(formik.values.email, 1000);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await checkEmail(debouncedEmail);
                setEmailExists(res.exists);
            } catch (err) {
                console.log(err);
                setEmailExists(false);
            }
        };
        fetchApi();
    }, [debouncedEmail]);

    // Handle Resend
    const handleResend = async () => {
        setResendDisabled(true);
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
            await forgotPassword(formik.values.email);
            setTimeout(() => {
                setResendDisabled(false);
            }, 30000);
        } catch (error) {
            console.error('Error resending confirmation email:', error);
        }
    };

    return (
        <>
            {!loading ? (
                <div
                    className={cx('wrapper pt-0 pt-lg-0 container')}
                    style={{ display: showVeirfy ? 'none' : 'block' }}
                >
                    <div className={cx('content')}>
                        {dataUser ? (
                            <ErrorWarning message="You Are Already Login !!!" />
                        ) : (
                            <form className={cx('form-register')} onSubmit={formik.handleSubmit}>
                                <div className={cx('login')}>
                                    <div className={cx('login-title')}>Forgot Password</div>
                                    <div className={cx('login-content')}>
                                        <div className={cx('login-user')}>
                                            <div className={cx('register-input')}>
                                                <BsPerson className={cx('icon-user')} />
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    id="email"
                                                    name="email"
                                                    value={formik.values.email}
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                    }}
                                                />
                                            </div>
                                            {formik.errors.email && (
                                                <p className={cx('error-message')}>{formik.errors.email}</p>
                                            )}
                                            {!emailExists && <p className={cx('error-message')}>Email Not Already</p>}
                                        </div>
                                    </div>
                                    <button className={cx('btn-login')}>Submit</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            ) : (
                <ModalLoading />
            )}

            {!loading && showVeirfy && (
                <div className={cx('wrapper pt-0 pt-lg-0 container')}>
                    <div className={cx('content')}>
                        {show ? (
                            <div className={cx('verify')}>
                                <BsEnvelopeCheck className={cx('icon-email')} />
                                <h2 className={cx('verify-title')}>Please verify your email </h2>
                                <div className={cx('verify-send-to')}>
                                    <p>You're almost there! We sent and email</p>
                                    <span id="email" name="email">
                                        {/* {email} */}
                                    </span>
                                </div>
                                <div className={cx('verify-description')}>
                                    <p>Just click on the link in that email to complete </p>
                                    <p>
                                        If you don't see it ,you may need to <span>check your spam</span> folder
                                    </p>
                                </div>
                                <div className={cx('verify-resend')}>
                                    <p>Still can't find the email </p>
                                </div>
                                <p className={cx('text-again')}>{resendDisabled ? `Please Again After 30s` : ''}</p>
                                <div className={cx('btn-resend')}>
                                    <button
                                        onClick={handleResend}
                                        disabled={resendDisabled}
                                        className={cx(resendDisabled ? 'disabled' : '')}
                                    >
                                        Resend Email
                                    </button>
                                </div>
                                <p className={cx('need-help')}>
                                    Need help? <span>Contact us</span>
                                </p>
                            </div>
                        ) : (
                            <ErrorWarning message="You Are Already Verify !!!" />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ForgotPassword;
