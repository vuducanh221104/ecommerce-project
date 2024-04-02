import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useEffect, useState } from 'react';
import { IconPrev } from '~/components/IconPrev';
import { Link, useNavigate } from 'react-router-dom';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import ErrorWarning from '~/components/ErrorWarning';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { axiosRequest } from '~/utils/axiosRequest';
import { patchUser } from '~/services/userServices';

const cx = classNames.bind(styles);
function User() {
    const dataUser = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(true);
    // HANDLE FORM

    useEffect(() => {
        axiosRequest(navigate);
        if (dataUser) {
            formik.setValues({
                fullname: dataUser.fullname || '',
                username: dataUser.username || '',
                phone: dataUser.phone || '',
            });
        }
    }, []);
    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            phone: '',
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
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                    'Please Enter a valid Phone Number',
                ),
        }),
        onSubmit: async (values) => {
            try {
                await patchUser(dataUser._id, values);
                setShow(true);
            } catch (err) {
                console.log(err);
            }
        },
    });
    // Values Check Input
    let requiredCofirm = formik.values.fullname === '' && formik.values.username === '' && formik.values.phone === '';
    // Values Cofirm
    const BoolRequiredCofirm = !formik.values.fullname || !formik.values.username || !formik.values.phone;
    //  Validate Click
    const handleRegisterClick = () => {
        if (BoolRequiredCofirm) {
            return;
        }
    };
    return (
        <>
            <>
                {dataUser ? (
                    <div className={cx('wrapper pt-0 pt-lg-0 container')}>
                        <div className={cx('content')}>
                            {!show ? (
                                <>
                                    {dataUser.isVerified && (
                                        <form
                                            className={cx(
                                                'form-user',
                                                dataUser ? '' : 'd-none',
                                                dataUser.isVerified ? '' : 'd-none',
                                            )}
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <div className={cx('user')}>
                                                <IconPrev urlPrev={'/'} />

                                                <div className={cx('user-info-list')}>
                                                    <div className={cx('user-info-item')}>
                                                        <h3>Full name</h3>
                                                        <input
                                                            type="text"
                                                            placeholder="Edit your fullname"
                                                            id="fullname"
                                                            name="fullname"
                                                            value={formik.values.fullname}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                setValue(false);
                                                            }}
                                                        />
                                                        {formik.errors.fullname && (
                                                            <p className={cx('error-message')}>
                                                                {formik.errors.fullname}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className={cx('user-info-item')}>
                                                        <h3>User name</h3>
                                                        <input
                                                            type="text"
                                                            placeholder="Edit your fullname"
                                                            id="username"
                                                            name="username"
                                                            value={formik.values.username}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                setValue(false);
                                                            }}
                                                        />
                                                        {formik.errors.username && (
                                                            <p className={cx('error-message')}>
                                                                {formik.errors.username}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className={cx('user-info-item')}>
                                                        <h3>Phone Number</h3>
                                                        <input
                                                            type="text"
                                                            placeholder="Phone Number"
                                                            id="phone"
                                                            name="phone"
                                                            value={formik.values.phone}
                                                            onChange={(e) => {
                                                                formik.handleChange(e);
                                                                setValue(false);
                                                            }}
                                                        />
                                                        {formik.errors.phone && (
                                                            <p className={cx('error-message')}>{formik.errors.phone}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={cx('change-password')}>
                                                    <Link to="/changePassword">Change Password</Link>
                                                </div>
                                                <div className={cx('change-password')}>
                                                    <Link to="/changeEmail">Change Email</Link>
                                                </div>
                                                <div className={cx('change-password')}>
                                                    <Link to="/changeAvatar">Change Avatar</Link>
                                                </div>
                                                {/* BUTTON */}
                                                <button
                                                    className={cx(
                                                        'btn-submit',
                                                        requiredCofirm || value ? 'disabled' : '',
                                                    )}
                                                    onClick={handleRegisterClick}
                                                    disabled={requiredCofirm || value}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </>
                            ) : (
                                <ErrorWarning icon={faCircleCheck} title="SUCCESSFULLY" />
                            )}
                            {!dataUser && <ErrorWarning title="ERROR" />}
                            {!dataUser.isVerified && <ErrorWarning title="YOU MUST VERIFY EMAIL" />}
                        </div>
                    </div>
                ) : (
                    <ErrorWarning />
                )}
            </>
        </>
    );
}

export default User;
