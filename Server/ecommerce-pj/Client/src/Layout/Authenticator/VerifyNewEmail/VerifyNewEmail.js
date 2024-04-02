import styles from './VerifyNewEmail.module.scss';
import classNames from 'classnames/bind';
import { BsEnvelopeCheck } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorWarning from '~/components/ErrorWarning';
import { IconPrev } from '~/components/IconPrev';
import { resendEmail } from '~/services/userServices';
const cx = classNames.bind(styles);

function VerifyNewEmail({ newEmail }) {
    const [resendDisabled, setResendDisabled] = useState(false);
    const [show, setShow] = useState(true);
    const handleResend = async () => {
        setResendDisabled(true);

        // Gọi API yêu cầu gửi lại email xác nhận
        await resendEmail(newEmail);
        try {
            setTimeout(() => {
                setResendDisabled(false);
            }, 30000);
        } catch (error) {
            console.error('Error resending confirmation email:', error);
        }
    };

    useEffect(() => {
        if (!newEmail) {
            setShow(false);
        }
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
                            <IconPrev urlPrev={'/user'} />
                            <h2 className={cx('verify-title')}>Please verify your email </h2>
                            <div className={cx('verify-send-to')}>
                                <p>You're almost there! We sent and email to</p>
                                <span id="email" name="email">
                                    {newEmail}
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
                                Need help?<span>Contact us</span>
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

export default VerifyNewEmail;
