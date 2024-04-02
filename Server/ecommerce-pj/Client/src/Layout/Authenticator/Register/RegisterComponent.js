import styles from './RegisterComponent.module.scss';
import classNames from 'classnames/bind';
import { BsPerson, BsKey, BsEye, BsEyeSlash, BsPersonLinesFill, BsEnvelope, BsPhone } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import queryString from 'query-string';
import ErrorWarning from '~/components/ErrorWarning';
import { checkEmail, checkUsername, createUser } from '~/services/userServices';
import { useDebounce } from '~/hooks';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function RegisterComponent() {
    const dataUser = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showComfirmPassword, setShowComfirmPassword] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            comfirmPassword: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required('Required')
                .matches(
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                    'Valid Full name',
                ),
            username: Yup.string().required('Required').min(5, 'Must be 5 characters or more'),
            phone: Yup.string()
                .required('Required')
                .matches(
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                    'Please Enter a valid Phone Number',
                ),
            email: Yup.string()
                .required('Required')
                .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'Please Enter a valid email',
                ),
            password: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    'Password must be 7-19 characters and contain at least on letter ,one number and a spcial character',
                ),
            comfirmPassword: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Password must match'),
        }),

        onSubmit: async (values) => {
            try {
                if (!usernameExists || !emailExists) {
                    const valuesUser = {
                        username: values.username,
                        fullname: values.fullname,
                        email: values.email,
                        phone: values.phone,
                        password: values.password,
                    };
                    const res = await createUser(valuesUser);
                }
            } catch (err) {
                console.log(err);
            }
        },
    });

    const debouncedUsername = useDebounce(formik.values.username, 1000);
    const debouncedEmail = useDebounce(formik.values.email, 1000);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await checkUsername(debouncedUsername);
                setUsernameExists(res.exists);
            } catch (err) {
                console.log(err);
                setUsernameExists(false);
            }
        };
        fetchApi();
    }, [debouncedUsername]);

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

    const handlePassword = (boolean) => {
        setShowPassword(boolean);
    };

    const handleConfirmPassword = (boolean) => {
        setShowComfirmPassword(boolean);
    };
    // Values Cofirm
    const requiredCofirm =
        formik.values.fullname === '' ||
        formik.values.username === '' ||
        formik.values.email === '' ||
        formik.values.phone === '' ||
        formik.values.password === '' ||
        formik.values.comfirmPassword === '';
    // Values Cofirm
    const BoolRequiredCofirm =
        !formik.values.fullname ||
        !formik.values.username ||
        !formik.values.email ||
        !formik.values.phone ||
        !formik.values.password ||
        !formik.values.comfirmPassword ||
        emailExists ||
        usernameExists;

    // Validate Click
    const handleRegisterClick = () => {
        if (BoolRequiredCofirm) {
            return;
        }

        if (formik.isValid) {
            // setRequired(false);
            formik.handleSubmit(); // Gửi form nếu hợp lệ

            const emailQueryParam = formik.values.email; // Lấy giá trị email từ formik

            // Tạo object chứa query parameter
            const queryParams = {
                email: emailQueryParam,
            };

            // Chuyển đổi object query parameter thành chuỗi query
            const queryStringValue = queryString.stringify(queryParams);

            // Xây dựng URL với query parameter và chuyển trang
            navigate(`/verify?${queryStringValue}`);
        }
    };

    return (
        <div className={cx('wrapper pt-0 pt-lg-0 container')}>
            <div className={cx('content')}>
                {dataUser ? (
                    <ErrorWarning message="You Are Already Register !!!" />
                ) : (
                    <form className={cx('form-register')} onSubmit={formik.handleSubmit}>
                        <div className={cx('register')}>
                            <div className={cx('register-title')}>Register</div>
                            <div className={cx('register-content')}>
                                {/* FULL NAME */}
                                <div className={cx('register-fullname')}>
                                    <div className={cx('register-input')}>
                                        <BsPersonLinesFill className={cx('icon-user')} />
                                        <input
                                            type="text"
                                            placeholder="Full name"
                                            id="fullname"
                                            name="fullname"
                                            value={formik.values.fullname}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    {formik.errors.fullname && (
                                        <p className={cx('error-message')}>{formik.errors.fullname}</p>
                                    )}
                                </div>

                                {/* USERNAME */}
                                <div className={cx('register-user')}>
                                    <div className={cx('register-input')}>
                                        <BsPerson className={cx('icon-user')} />
                                        <input
                                            type="text"
                                            placeholder="UserName"
                                            id="username"
                                            name="username"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    {formik.errors.username && (
                                        <p className={cx('error-message')}>{formik.errors.username}</p>
                                    )}
                                    {usernameExists && <p className={cx('error-message')}>Username Already used</p>}
                                </div>

                                {/* EMAIl */}
                                <div className={cx('register-email')}>
                                    <div className={cx('register-input')}>
                                        <BsEnvelope className={cx('icon-email')} />
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            placeholder="E-mail Address"
                                        />
                                    </div>
                                    {formik.errors.email && (
                                        <p className={cx('error-message')}>{formik.errors.email}</p>
                                    )}
                                    {emailExists && <p className={cx('error-message')}>Email Already used</p>}
                                </div>
                                {/* PHONE-NUMBER */}
                                <div className={cx('register-phone')}>
                                    <div className={cx('register-input')}>
                                        <BsPhone className={cx('icon-phone')} />
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    {formik.errors.phone && (
                                        <p className={cx('error-message')}>{formik.errors.phone}</p>
                                    )}
                                </div>
                                {/* PASSWORD */}
                                <div className={cx('register-password')}>
                                    <div className={cx('register-input')}>
                                        <BsKey className={cx('icon-password')} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            placeholder="Password"
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
                                    {formik.errors.password && (
                                        <p className={cx('error-message')}>{formik.errors.password}</p>
                                    )}
                                </div>
                                {/* COMFIRM-PASSWORD */}
                                <div className={cx('register-confirm-password')}>
                                    <div className={cx('register-input')}>
                                        <BsKey className={cx('icon-comfirm-password')} />
                                        <input
                                            type={showComfirmPassword ? 'text' : 'password'}
                                            id="comfirmPassword"
                                            name="comfirmPassword"
                                            value={formik.values.comfirmPassword}
                                            onChange={formik.handleChange}
                                            placeholder="Confirm Password"
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
                                    {formik.errors.comfirmPassword && (
                                        <p className={cx('error-message')}>{formik.errors.comfirmPassword}</p>
                                    )}
                                </div>
                            </div>
                            <button
                                className={cx('btn-register', requiredCofirm ? 'disabled' : '')}
                                onClick={handleRegisterClick}
                                disabled={requiredCofirm}
                            >
                                Register
                            </button>
                            <div className={cx('register-forget')}>
                                <p className={cx('register-forget-text')}>Or </p>
                            </div>
                            <div className={cx('group-social-list')}>
                                <div className={cx('group-social-item')}>
                                    <Link to="">
                                        <FontAwesomeIcon icon={faFacebook} className={cx('icon-social')} />
                                        <p>Sign in with Facebook</p>
                                    </Link>
                                </div>
                                <div className={cx('group-social-item')}>
                                    <Link to="">
                                        <FontAwesomeIcon icon={faGoogle} className={cx('icon-social')} />
                                        <p>Sign in with Google</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('register-end')}>
                                <p>
                                    {' '}
                                    You have a account? <Link to="/login">Login</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default RegisterComponent;
