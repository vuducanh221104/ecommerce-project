import classNames from 'classnames/bind';
import styles from './ChangeEmail.module.scss';
import ErrorWarning from '~/components/ErrorWarning';
import { IconPrev } from '~/components/IconPrev';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import VerifyNewEmail from '~/Layout/Authenticator/VerifyNewEmail';
import { changeEmail } from '~/services/userServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosRequest from '~/utils/axiosRequest';
import { useDebounce } from '~/hooks';
import { checkEmail } from '~/services/userServices';
import ModalLoading from '~/components/ModalLoading';
import { changeUser } from '~/redux/authSlice';
const cx = classNames.bind(styles);
function ChangePassword() {
    const dataUser = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    useEffect(() => {
        axiosRequest(navigate);
    }, []);

    // HANDLE SUBMIT
    const formik = useFormik({
        initialValues: {
            changeEmail: '',
        },
        validationSchema: Yup.object({
            changeEmail: Yup.string()
                .required('Required')
                .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'Please Enter a valid email',
                ),
        }),
        onSubmit: async (values) => {
            setShow(true);
            try {
                if (!emailExists) {
                    const userId = dataUser._id;
                    const newEmail = values.changeEmail;
                    // const { email, ...data } = dataUser;
                    // const newDataUser = { ...data, email: newEmail };
                    await changeEmail(userId, newEmail);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setShow(false);
            }
        },
    });

    const debouncedEmail = useDebounce(formik.values.changeEmail, 500);
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
    // Values Cofirm
    const requiredCofirm = formik.values.changeEmail === '';

    //  Validate Click
    const handleRegisterClick = () => {
        // if (emailExists || !formik.values.changeEmail) {
        //     return;
        // }
    };

    return (
        <>
            <div className={cx('wrapper pt-0 pt-lg-0 container')}>
                <div className={cx('content')}>
                    {!show ? (
                        <>
                            {dataUser.isVerified && (
                                <form
                                    className={cx('form-user', dataUser ? '' : 'd-none')}
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div className={cx('change-password')}>
                                        <IconPrev urlPrev={'/user'} />
                                        <div className={cx('user-info-list')}>
                                            <div className={cx('user-info-item')}>
                                                <h3>Email Old : {dataUser.email}</h3>
                                            </div>
                                            <div className={cx('user-info-item')}>
                                                <h3>Change Email</h3>
                                                <div className={cx('user-box')}>
                                                    <input
                                                        type="text"
                                                        placeholder="Change Email"
                                                        id="changeEmail"
                                                        name="changeEmail"
                                                        value={formik.values.changeEmail}
                                                        onChange={formik.handleChange}
                                                    />
                                                </div>
                                                {formik.errors.changeEmail && (
                                                    <p className={cx('error-message')}>{formik.errors.changeEmail}</p>
                                                )}
                                                {emailExists && (
                                                    <p className={cx('error-message')}>Email Already used</p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className={cx('btn-submit', requiredCofirm ? 'disabled' : '')}
                                            onClick={handleRegisterClick}
                                            disabled={requiredCofirm}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            )}
                        </>
                    ) : (
                        // Show Verify Email
                        <VerifyNewEmail newEmail={formik.values.changeEmail} />
                    )}
                    {!dataUser && <ErrorWarning title="ERROR" />}
                    {!dataUser.isVerified && <ErrorWarning title="YOU MUST VERIFY EMAIL" />}
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
