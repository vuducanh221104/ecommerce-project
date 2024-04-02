import styles from './CartPayment.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBasketShopping,
    faTruckFast,
    faTicket,
    faGift,
    faCreditCard,
    faUserGroup,
    faSquarePhone,
    faPhone,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import CartNavStep from '../components/CartNavStep';
import CartTitleAndPrev from '../components/CartTitleAndPrev';
import images from '~/assets/images';
import { useEffect, useState } from 'react';
import MarkdownRender from '~/components/MarkdownRender';
import axios from 'axios';
import { getLocalStorage, setLocalStorage } from '~/components/EncodeLocalStorage';
import { getCookies, setCookies } from '~/components/EncodeCookies';
import { faPenToSquare, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import FormattedPrice from '~/components/FormattedPrice/FormattedPrice';
import { paymentMomo, paymentVNpay, paymentZalopay } from '~/services/cartServices';
const cx = classNames.bind(styles);

function CartPayment() {
    const [product, setProduct] = useState(getLocalStorage('infoProduct', 'infoProduct'));
    const [infoCustomer, setInfoCustomer] = useState(getCookies('infoCustomer', 'infoCustomer'));

    const [amount, setAmount] = useState(null);
    const [orderDescription, setOrderDescription] = useState('');
    const [orderGiveAtStore, setOrderGiveAtStore] = useState();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    // Condition Re-render UseEffect
    const getCustomer = getCookies('infoCustomer', 'infoCustomer');
    // const getProduct = getLocalStorage('infoProduct', 'infoProduct');

    useEffect(() => {
        setInfoCustomer([getCookies('infoCustomer', 'infoCustomer')]);
        setProduct([getLocalStorage('infoProduct', 'infoProduct')]);

        //Handle Payment ( Total and Description)
        // Change Price
        const cookiesInfoCustomer = getCookies('infoCustomer', 'infoCustomer') || {};
        if (product?.totalPrice) {
            setAmount(product.totalPrice);
        }
        // Description Customer
        setOrderDescription(cookiesInfoCustomer.descriptionCustomer || 'Đơn hàng từ Minh Tuấn Mobile');
        setOrderGiveAtStore(cookiesInfoCustomer.giveAtStore);

        // Check Method Default When Mount
        if (cookiesInfoCustomer.giveAtStore) {
            setSelectedPaymentMethod('atStore');
        } else {
            setSelectedPaymentMethod('atCash');
        }
    }, [
        getCustomer?.giveAtStore,
        getCustomer?.email,
        getCustomer?.fullname,
        getCustomer?.phone,
        getCustomer?.selectCity,
        getCustomer?.selectDistrict,
        getCustomer?.selectAddress,
        getCustomer?.phoneOtherPeople,
        getCustomer?.nameOtherPeople,
        getCustomer?.descriptionCustomer,
    ]);

    const cookiesInfoCustomer = getCookies('infoCustomer', 'infoCustomer') || {};
    const newData = {
        ...cookiesInfoCustomer,
        methodPayment: 'cash',
    };
    const updateMethodPaymentCookie = (method) => {
        setCookies('infoCustomer', newData);
    };

    // Handle Submit (Choose Method Payment)
    const chooseMethodPayment = () => {
        switch (selectedPaymentMethod) {
            case 'atCash':
                setLocalStorage('methodPayment', 'cash', 'methodPayment');
                window.location.href = '/cart/complete';
                break;

            case 'atStore':
                setLocalStorage('methodPayment', 'cash', 'methodPayment');
                window.location.href = '/cart/complete';
                break;
            case 'atBank':
                setLocalStorage('methodPayment', 'vnpay', 'methodPayment');
                const dataToSend = {
                    amount,
                    orderDescription,
                };
                (async () => {
                    try {
                        const res = await paymentVNpay(dataToSend);

                        window.location.href = res;
                    } catch (err) {
                        console.error('Error:', err);
                    }
                })();
                break;

            case 'atZaloPay':
                setLocalStorage('methodPayment', 'zalopay', 'methodPayment');
                const dataToSendZalopay = {
                    amount,
                    orderDescription,
                };
                (async () => {
                    try {
                        const res = await paymentZalopay(dataToSendZalopay);
                        window.location.href = res.order_url;
                    } catch (err) {
                        console.error('Error:', err);
                    }
                })();
                break;

            case 'atMomo':
                setLocalStorage('methodPayment', 'momo', 'methodPayment');
                let amountValid = amount;
                let descriptionValid = orderDescription;
                if (amount > 50000000) {
                    amountValid = 50000000;
                    descriptionValid = 'Đây là thử nghiệm chỉ hạn mức 50.000.000đ';
                }
                const dataToSendMomo = {
                    amount: amountValid,
                    orderDescription: descriptionValid,
                };
                (async () => {
                    try {
                        const res = await paymentMomo(dataToSendMomo);
                        window.location.href = res;
                    } catch (err) {
                        console.error('Error:', err);
                    }
                })();
                break;

            default:
                console.log('Error Not Choose A Payment');
                break;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-fluid')}>
                <CartNavStep activeStep={3} />
                <CartTitleAndPrev title={'Thông Tin Thanh Toán'} linkTo={'/cart/customer'} />
                <div className={cx('content')}>
                    <ul className={cx('cart-info-list')}>
                        {/* INFO ORDER */}
                        <li className={cx('cart-info-item')}>
                            <div className={cx('d-flex justify-content-center align-items-center')}>
                                <div className={cx('title')}>
                                    <img src={images.order} />
                                    <h3>Thông tin đơn hàng</h3>
                                </div>
                            </div>
                            {product &&
                                Array.isArray(product) &&
                                product.map((data, indexProduct) => (
                                    <div className={cx('description-list')} key={indexProduct}>
                                        <div className={cx('description-item')}>
                                            <FontAwesomeIcon
                                                icon={faBasketShopping}
                                                className={cx('icon-description')}
                                            />
                                            <span>
                                                Tổng tiền sản phẩm:
                                                <FormattedPrice value={data.totalPrice} />
                                            </span>
                                        </div>
                                        <div className={cx('description-item')}>
                                            <FontAwesomeIcon icon={faTruckFast} className={cx('icon-description')} />
                                            <span>Phí vận chuyển: Free Ship</span>
                                        </div>
                                        <div className={cx('description-item')}>
                                            <FontAwesomeIcon icon={faTicket} className={cx('icon-description')} />
                                            <span>Mã giảm giá: ---</span>
                                        </div>
                                        <div className={cx('description-item')}>
                                            <FontAwesomeIcon icon={faGift} className={cx('icon-description')} />
                                            <span>Quà tặng:</span>
                                        </div>
                                        {data.products.map((item, index) => (
                                            <ul className={cx('endow-list')} style={{ padding: '0' }} key={index}>
                                                <li className={cx('endow-item')}>
                                                    <div className={cx('endow-title')}>
                                                        <b>Ưu đãi khi mua {item.name}</b>
                                                    </div>
                                                    <MarkdownRender content={item.description} />
                                                </li>
                                            </ul>
                                        ))}
                                        <div className={cx('total')}>
                                            <FontAwesomeIcon icon={faCreditCard} />
                                            <span style={{ marginLeft: '5px' }}>
                                                Tổng tiền đơn hàng:
                                                <b>
                                                    <FormattedPrice value={data.totalPrice} />
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </li>
                        {/* INFO CUSTOMER */}
                        <li className={cx('cart-info-item')}>
                            <div className={cx('d-flex justify-content-center align-items-center')}>
                                <div className={cx('title')}>
                                    <img src={images.cartCustomer} />
                                    <h3>Thông tin khách hàng</h3>
                                </div>
                            </div>
                            {infoCustomer &&
                                Array.isArray(infoCustomer) &&
                                infoCustomer.map((item, index) => (
                                    <div className={cx('description-list')} key={index}>
                                        <div className={cx('description-item')}>
                                            <FontAwesomeIcon icon={faUserCircle} className={cx('icon-description')} />
                                            <span>Người nhận: {item?.fullname}</span>
                                        </div>
                                        <div className={cx('description-item')}>
                                            <FontAwesomeIcon icon={faPhone} className={cx('icon-description')} />
                                            <span>Số điện thoại: {item?.phone}</span>
                                        </div>
                                        {item?.giveAtStore && (
                                            <div className={cx('description-item', 'mx-1')}>
                                                <FontAwesomeIcon
                                                    icon={faLocationDot}
                                                    className={cx('icon-description')}
                                                />
                                                <span>Địa chỉ nhận hàng: {item?.giveAtStore} </span>
                                            </div>
                                        )}
                                        {item?.selectCity && item?.selectDistrict && item?.selectAddress && (
                                            <div className={cx('description-item', 'mx-1')}>
                                                <FontAwesomeIcon
                                                    icon={faLocationDot}
                                                    className={cx('icon-description')}
                                                />
                                                <span>
                                                    Địa Chỉ Giao Tận Nơi :{' '}
                                                    {`${item?.selectCity} ,${item?.selectDistrict} ,${item?.selectAddress}`}
                                                </span>
                                            </div>
                                        )}
                                        {item?.nameOtherPeople && (
                                            <div className={cx('description-item')}>
                                                <FontAwesomeIcon
                                                    icon={faUserGroup}
                                                    className={cx('icon-description')}
                                                />
                                                <span>Tên Người Nhận Hộ : {item?.nameOtherPeople}</span>
                                            </div>
                                        )}
                                        {item?.phoneOtherPeople && (
                                            <div className={cx('description-item')}>
                                                <FontAwesomeIcon
                                                    icon={faSquarePhone}
                                                    className={cx('icon-description')}
                                                />
                                                <span>Số Điện Thoại Người Nhận Hộ : {item?.phoneOtherPeople}</span>
                                            </div>
                                        )}
                                        <div className={cx('description-item')}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-description')} />
                                            <span>
                                                Ghi chú: {item?.descriptionCustomer ? item?.descriptionCustomer : '---'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </li>
                    </ul>
                    <div className={cx('payments')}>
                        <h3 className={cx('payments-title')}>Hình thức thanh toán</h3>
                        <ul className={cx('payments-list')}>
                            {orderGiveAtStore ? (
                                <li className={cx('payments-item')}>
                                    <label className={cx('form-check')}>
                                        <input
                                            className={cx('form-check-input', 'form-checkbox')}
                                            type="radio"
                                            name="cartPayment"
                                            defaultChecked
                                            onChange={() => setSelectedPaymentMethod('atStore')}
                                        />
                                        <img src={images.cartOrderDelivery} />
                                        <span>Nhận và thanh toán tại cửa hàng</span>
                                    </label>
                                </li>
                            ) : (
                                <li className={cx('payments-item')}>
                                    <label className={cx('form-check')}>
                                        <input
                                            className={cx('form-check-input', 'form-checkbox')}
                                            type="radio"
                                            name="cartPayment"
                                            defaultChecked
                                            onChange={() => setSelectedPaymentMethod('atCash')}
                                        />
                                        <img src={images.cartToCash} />
                                        <span>Giao Hàng Tại Nhà</span>
                                    </label>
                                </li>
                            )}
                            <li className={cx('payments-item')}>
                                <label className={cx('form-check')}>
                                    <input
                                        className={cx('form-check-input', 'form-checkbox')}
                                        type="radio"
                                        name="cartPayment"
                                        value="atBank"
                                        checked={selectedPaymentMethod === 'atBank'}
                                        onChange={() => setSelectedPaymentMethod('atBank')}
                                    />
                                    <img src={images.cartToVnpay} />
                                    <span>Thanh toán trực tuyến bằng VNPay</span>
                                </label>
                            </li>
                            <li className={cx('payments-item')}>
                                <label className={cx('form-check')}>
                                    <input
                                        className={cx('form-check-input', 'form-checkbox')}
                                        type="radio"
                                        name="cartPayment"
                                        value="atMomo"
                                        checked={selectedPaymentMethod === 'atMomo'}
                                        onChange={() => setSelectedPaymentMethod('atMomo')}
                                    />
                                    <img src={images.cartToMomo} />
                                    <span>Thanh toán trực tuyến bằng MOMO</span>
                                </label>
                            </li>
                            <li className={cx('payments-item')}>
                                <label className={cx('form-check')}>
                                    <input
                                        className={cx('form-check-input', 'form-checkbox')}
                                        type="radio"
                                        name="cartPayment"
                                        value="atZaloPay"
                                        checked={selectedPaymentMethod === 'atZaloPay'}
                                        onChange={() => setSelectedPaymentMethod('atZaloPay')}
                                    />
                                    <img src={images.cartToZaloPay} />
                                    <span>Thanh toán trực tuyến bằng ZaloPay</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('btn-order')}>
                        <button onClick={() => chooseMethodPayment()} name="redirect">
                            Thanh Toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPayment;
