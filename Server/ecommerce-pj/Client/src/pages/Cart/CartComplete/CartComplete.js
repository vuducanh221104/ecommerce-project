import styles from './CartComplete.module.scss';
import classNames from 'classnames/bind';
import CartNavStep from '../components/CartNavStep';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { getLocalStorage } from '~/components/EncodeLocalStorage';
import { getCookies } from '~/components/EncodeCookies';
import { paymentSuccess } from '~/services/cartServices';

const cx = classNames.bind(styles);

function CartComplete() {
    useEffect(() => {
        const methodPayment = getLocalStorage('methodPayment', 'methodPayment');
        const dataProductOrignal = getLocalStorage('infoProduct', 'infoProduct');
        const dataCustomer = getCookies('infoCustomer', 'infoCustomer');
        // SPREAD TO GET ORDERID TO SET ORDERID FOR PAYMENT DATABASe
        const { orderId, ...dataProduct } = dataProductOrignal;
        const { giveAtStore, selectCity, selectDistrict, selectAddress, ...dataCustomerSpread } = dataCustomer;

        const shipping = `${selectAddress},${selectDistrict},${selectCity}`;
        // GET QUERY IN URL
        const currentURL = window.location.href;
        const parsed = queryString.parseUrl(currentURL);

        const dataToSave = {
            orderId,
            methodPayment: methodPayment,
            deliveryMethod: {
                name: giveAtStore ? 'At Store' : 'Shipping',
                info: giveAtStore ? giveAtStore : `${shipping}`,
            },
            dataProduct,
            dataCustomer: dataCustomerSpread,
            infoPayment: !parsed === {} ? JSON.stringify(parsed.query) : null,
        };
        const fetchApi = async () => {
            try {
                paymentSuccess(dataToSave);
                localStorage.removeItem('key');
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-fluid')}>
                <CartNavStep activeStep={4} />
                <div className={cx('content')}>
                    <ul className={cx('complete-list')}>
                        <li className={cx('complete-item')}>
                            <h3>Đặt Hàng Thành Công</h3>
                        </li>
                        <li className={cx('complete-item')}>
                            <p>
                                Cảm ơn quý khách đã mua hàng tại <b>Minh Tuấn Moblie</b>
                            </p>
                            <p>Chúng tôi sẽ gọi đén quý khách sớm nhất để xác nhận đơn hàng</p>
                            <p>
                                Nếu Quý Khách có bất cứ thắc mắc gì xin vui lòng liên hệ với hotline: <b>19003355</b>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CartComplete;
