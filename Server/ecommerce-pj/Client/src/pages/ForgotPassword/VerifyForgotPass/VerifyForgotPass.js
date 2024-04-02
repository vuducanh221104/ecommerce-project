import styles from './VerifyForgotPass.module.scss';
import classNames from 'classnames/bind';
import { BsEnvelopeCheck } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorWarning from '~/components/ErrorWarning';
import { resendEmaill } from '~/services/userServices';
const cx = classNames.bind(styles);

function VerifyForgotPass() {
    const [resendDisabled, setResendDisabled] = useState(false);
    const [show, setShow] = useState(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    useEffect(() => {
        if (email === null) {
            setShow(false);
        }
    }, []);
    const handleResend = async () => {
        setResendDisabled(true);

        try {
            await resendEmaill(email);

            setTimeout(() => {
                setResendDisabled(false);
            }, 30000);
        } catch (error) {
            console.error('Error resending confirmation email:', error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setResendDisabled(false);
        }, 30000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            <div className={cx('wrapper pt-0 pt-lg-0 container')}>
                <div className={cx('content')}>
                    {show ? (
                        <div className={cx('verify')}>
                            <BsEnvelopeCheck className={cx('icon-email')} />
                            <h2 className={cx('verify-title')}>Please verify your email </h2>
                            <div className={cx('verify-send-to')}>
                                <p>You're almost there! We sent and email to</p>
                                <span id="email" name="email">
                                    {email}
                                </span>
                            </div>
                            <div className={cx('verify-description')}>
                                <p>Just click on the link in that email to complete your Login</p>
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
        </>
    );
}

export default VerifyForgotPass;
