import styles from './CartCustomer.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CartNavStep from '../components/CartNavStep';
import CartTitleAndPrev from '../components/CartTitleAndPrev';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setCookies, getCookies } from '~/components/EncodeCookies';

const cx = classNames.bind(styles);

function CartCustomer() {
    const Navigate = useNavigate();
    const [isCheckedAtStore, setIsCheckedAtStore] = useState(true);
    const [isCheckedOrder, setIsCheckedOrder] = useState(false);
    const [callOtherPeople, setCallOtherPeople] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    const formik = useFormik({
        initialValues: {
            fullname: '',
            phone: '',
            email: '',
            giveAtStore: '',
            selectCity: '',
            selectDistrict: '',
            selectAddress: '',
            descriptionCustomer: '',
            nameOtherPeople: '',
            phoneOtherPeople: '',
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string()
                .required('Required')
                .matches(
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                    'Valid Full name',
                ),
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
        }),

        onSubmit: (values) => {
            if (!isCheckedAtStore) {
                values.giveAtStore = '';
            }
            if (!isCheckedOrder) {
                values.selectCity = '';
                values.selectDistrict = '';
                values.selectAddress = '';
            }
            if (!callOtherPeople) {
                values.nameOtherPeople = '';
                values.phoneOtherPeople = '';
            }
            // Lọc ra tất cả các trường có giá trị
            const fieldsWithValues = Object.keys(formik.values).filter((fieldName) => {
                const fieldValue = formik.values[fieldName];
                return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
            });

            // Tạo một đối tượng mới chứa các trường có giá trị
            const formValuesToSubmit = {};
            fieldsWithValues.forEach((fieldName) => {
                formValuesToSubmit[fieldName] = formik.values[fieldName];
            });

            setCookies('infoCustomer', formValuesToSubmit, 'infoCustomer', 100000);
        },
    });

    useEffect(() => {
        // Something this error by cors
        axios
            .get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        const cookies = getCookies('infoCustomer', 'infoCustomer');

        if (cookies) {
            formik.setValues({
                fullname: cookies.fullname || '',
                email: cookies.email || '',
                phone: cookies.phone || '',
                giveAtStore: cookies.giveAtStore || '',
                descriptionCustomer: cookies.descriptionCustomer || '',
                nameOtherPeople: cookies.nameOtherPeople || '',
                phoneOtherPeople: cookies.phoneOtherPeople || '',
                selectCity: cookies.selectCity || '',
                selectDistrict: cookies.selectDistrict || '',
                selectAddress: cookies.selectAddress || '',
            });
            if (cookies.nameOtherPeople && cookies.phoneOtherPeople) {
                setCallOtherPeople(true);
            }
            if (cookies.selectCity && cookies.selectDistrict && cookies.selectAddress) {
                setIsCheckedAtStore(false);
                setIsCheckedOrder(true);
            }
        } else {
            // CALL API OF TOKEN
        }
    }, []);

    useEffect(() => {
        const cookies = getCookies('infoCustomer', 'infoCustomer');
        if (cookies) {
            const selectedCity = cities.find((city) => city.Name === cookies.selectCity);
            if (selectedCity) {
                setDistricts(selectedCity.Districts);
            }
        }
    }, [cities]);

    const handleCityChange = (e) => {
        const cityId = e.target.value;
        const selectedCity = cities.find((city) => city.Id === cityId);
        if (selectedCity) {
            setDistricts(selectedCity.Districts);

            // Lấy giá trị city.Name và cập nhật vào formik.values.selectCity
            const cityName = selectedCity.Name;
            formik.setFieldValue('selectCity', cityName);
        }
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        const selectedDistrict = districts.find((district) => district.Id === districtId);
        if (selectedDistrict) {
            // Lấy giá trị city.Name và cập nhật vào formik.values.selectCity
            const districtName = selectedDistrict.Name;
            formik.setFieldValue('selectDistrict', districtName);
        }
    };

    const handleCheckBox = () => {
        setIsCheckedAtStore(true);
        setIsCheckedOrder(false);
    };

    const handleCheckBoxOrder = () => {
        setIsCheckedOrder(true);
        setIsCheckedAtStore(false);
    };

    const handleCallOtherPeople = () => {
        setCallOtherPeople(!callOtherPeople);
    };

    // Validate Click
    const handleRegisterClick = () => {
        if (isCheckedAtStore) {
            if (!formik.values.giveAtStore) {
                return;
            }
        }
        if (isCheckedOrder) {
            if (!formik.values.selectDistrict || !formik.values.selectCity || !formik.values.selectAddress) {
                return;
            }
        }

        if (callOtherPeople) {
            if (!formik.values.nameOtherPeople || !formik.values.phoneOtherPeople) {
                return;
            }
        }

        if (formik.isValid) {
            // setRequired(false);
            formik.handleSubmit();
            Navigate('/cart/payment');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-fluid')}>
                <form className={cx('form-submit')} onSubmit={formik.handleSubmit}>
                    <div className="header-nav">
                        <CartNavStep activeStep={2} />
                    </div>
                    <CartTitleAndPrev title={'Thông Tin Đơn Hàng'} linkTo={'/cart'} />
                    <div className={cx('content')}>
                        <h3 className={cx('title')}>Thông tin đơn hàng</h3>
                        <ul className={cx('input-list')}>
                            <li className={cx('input-item')}>
                                <input
                                    type="text"
                                    placeholder="Please Enter Your Name"
                                    name="fullname"
                                    id="fullname"
                                    onChange={formik.handleChange}
                                    value={formik.values.fullname}
                                />
                                {formik.errors.fullname && (
                                    <p className={cx('error-message')}>{formik.errors.fullname}</p>
                                )}
                            </li>
                            <li className={cx('input-item')}>
                                <input
                                    type="text"
                                    placeholder="Please enter your phone number"
                                    name="phone"
                                    id="phone"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                                {formik.errors.phone && <p className={cx('error-message')}>{formik.errors.phone}</p>}
                            </li>
                            <li className={cx('input-item')}>
                                <input
                                    type="text"
                                    placeholder="Please enter your email"
                                    name="email"
                                    id="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.errors.email && <p className={cx('error-message')}>{formik.errors.email}</p>}
                            </li>
                        </ul>
                        <h3 className={cx('title')}>Chọn phương thức nhận hàng:</h3>
                        <div className={cx('choose-check-box__list')}>
                            <div className={cx('form-check')}>
                                <input
                                    className={cx('form-check-input')}
                                    type="radio"
                                    name="flexRadioDefault"
                                    defaultChecked={isCheckedAtStore ? 'checked' : null}
                                    onClick={() => handleCheckBox()}
                                />
                                <label className={cx('form-check-label')} htmlFor="flexRadioDefault1">
                                    Nhận Tại Cửa Hàng
                                </label>
                            </div>
                            <div className={cx('form-check')}>
                                <input
                                    className={cx('form-check-input')}
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    defaultChecked={!isCheckedAtStore ? 'checked' : null}
                                    onClick={() => handleCheckBoxOrder()}
                                />
                                <label className={cx('form-check-label')} htmlFor="flexRadioDefault2">
                                    Giao Hàng Tận Nơi
                                </label>
                            </div>
                        </div>

                        {isCheckedAtStore && (
                            <div className={cx('at-store')}>
                                <span className={cx('store-where')}>Hệ Thống Cửa Hàng</span>
                                <select
                                    className={cx('form-select')}
                                    name="giveAtStore"
                                    id="giveAtStore"
                                    onChange={formik.handleChange}
                                    required
                                >
                                    <option value="none" defaultValue="selected">
                                        Vui Lòng Chọn
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 43 Trần Quang Khải"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 43 Trần Quang Khải'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 43 Trần Quang Khải
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 83 Võ Văn Ngân"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 83 Võ Văn Ngân'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 83 Võ Văn Ngân
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 93 Nguyễn Ảnh Thủ"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 93 Nguyễn Ảnh Thủ'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 93 Nguyễn Ảnh Thủ
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 363 Nguyễn Oanh"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 363 Nguyễn Oanh'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 363 Nguyễn Oanh
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 475 Phan Văn Trị"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 475 Phan Văn Trị'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 475 Phan Văn Trị
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 179 Khánh Hội"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 179 Khánh Hội'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 179 Khánh Hội
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 297 Đường 3/2"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 297 Đường 3/2'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 297 Đường 3/2
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 488 Lê Hồng Phong"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 488 Lê Hồng Phong'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 488 Lê Hồng Phong
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 539 Quang Trung"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 539 Quang Trung'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 539 Quang Trung
                                    </option>
                                    <option
                                        value="Hồ Chí Minh - 287 Xô Viết Nghệ Tĩnh"
                                        selected={
                                            formik.values.giveAtStore === 'Hồ Chí Minh - 287 Xô Viết Nghệ Tĩnh'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Hồ Chí Minh - 287 Xô Viết Nghệ Tĩnh
                                    </option>
                                    <option
                                        value="Lâm Đồng - Chi nhánh Bảo Lộc"
                                        selected={
                                            formik.values.giveAtStore === 'Lâm Đồng - Chi nhánh Bảo Lộc'
                                                ? 'selected'
                                                : null
                                        }
                                    >
                                        Lâm Đồng - Chi nhánh Bảo Lộc
                                    </option>
                                </select>
                                {formik.errors.giveAtStore && (
                                    <p className={cx('error-message')}>{formik.errors.giveAtStore}</p>
                                )}
                            </div>
                        )}

                        {isCheckedOrder && (
                            <>
                                {/* FORM ORDER AT PLACE */}
                                <div className={cx('order-delivery')}>
                                    <select
                                        className={cx('form-select form-select-sm mb-3', 'order-delivery-select')}
                                        name="selectCity"
                                        id="selectCity"
                                        onChange={(e) => {
                                            formik.handleChange(e); // Thực hiện formik.handleChange
                                            handleCityChange(e); // Thực hiện handleCityChange
                                        }}
                                        required
                                        autocomplete="off"
                                    >
                                        <option value="" selected="selected">
                                            Chọn tỉnh thành
                                        </option>
                                        {cities.map((city) => (
                                            <option
                                                key={city.Id}
                                                value={city.Id}
                                                valuesCity={city.Name}
                                                selected={formik.values.selectCity === city.Name ? 'selected' : null}
                                            >
                                                {city.Name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.errors.selectCity && (
                                        <p className={cx('error-message')}>{formik.errors.selectCity}</p>
                                    )}

                                    <select
                                        className={cx('form-select form-select-sm mb-3', 'order-delivery-select')}
                                        name="selectDistrict"
                                        id="selectDistrict"
                                        onChange={(e) => {
                                            formik.handleChange(e); // Thực hiện formik.handleChange
                                            handleDistrictChange(e); // Thực hiện handleCityChange
                                        }}
                                        required
                                        autocomplete="off"
                                    >
                                        <option value="" selected="selected">
                                            Chọn quận huyện
                                        </option>
                                        {districts.map((district) => (
                                            <option
                                                key={district.Id}
                                                value={district.Id}
                                                valuesDistrict={district.Name}
                                                selected={
                                                    formik.values.selectDistrict === district.Name ? 'selected' : null
                                                }
                                            >
                                                {district.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={cx('order-delivery-adress')}>
                                    <span>Địa Chỉ</span>
                                    <input
                                        type="text"
                                        name="selectAddress"
                                        id="selectAddress"
                                        onChange={formik.handleChange}
                                        value={formik.values.selectAddress}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className={cx('title')} style={{ fontWeight: '500' }}>
                            Ghi chú của khách hàng
                        </div>
                        <div className={cx('input-description')}>
                            <input
                                type="text"
                                name="descriptionCustomer"
                                id="descriptionCustomer"
                                onChange={formik.handleChange}
                                value={formik.values.descriptionCustomer}
                            />
                        </div>
                        <div>
                            <div className={cx('call-other-people')}>
                                <input
                                    type="checkbox"
                                    name="callOtherPeople"
                                    id="callOtherPeople"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleCallOtherPeople()}
                                    checked={callOtherPeople ? 'checked' : null}
                                />
                                <label
                                    style={{
                                        color: '#000',
                                        marginLeft: '5px',
                                        fontSize: '1.3rem',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                    }}
                                    htmlFor="callOtherPeople"
                                >
                                    Gọi người khác nhận hàng (nếu có)
                                </label>
                            </div>
                            {callOtherPeople && (
                                <div className={cx('call-other-people__list')}>
                                    <div className={cx('call-other-people__item')}>
                                        <input
                                            type="text"
                                            placeholder="Nhập Họ và Tên nguời nhận (Bắt Buộc)"
                                            name="nameOtherPeople"
                                            id="nameOtherPeople"
                                            onChange={formik.handleChange}
                                            value={formik.values.nameOtherPeople}
                                            required
                                        />
                                    </div>
                                    <div className={cx('call-other-people__item')}>
                                        <input
                                            type="text"
                                            placeholder="Nhập số điện thoại nguời nhận (Bắt Buộc)"
                                            name="phoneOtherPeople"
                                            id="phoneOtherPeople"
                                            onChange={formik.handleChange}
                                            value={formik.values.phoneOtherPeople}
                                            required
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={cx('btn-order')}>
                            <button type="submit" onClick={handleRegisterClick}>
                                ĐẶT HÀNG
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CartCustomer;
