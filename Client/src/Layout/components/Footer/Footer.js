import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook, faSquareYoutube, faSquareInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { BsTelephone, BsHouse } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    {/* ROW 1 */}
                    <div className={cx('one', 'col-12', 'col-lg-4')}>
                        <h3 className={cx('footer-tilte')}>Hỗ trợ khách hàng</h3>
                        <div className={cx('', 'row row-cols-3 row-cols-xl-4 cus-row-cols-xl-3')}>
                            <span className={cx('item', 'col')}>
                                <div className={cx('box')}>
                                    <FontAwesomeIcon icon={faTruckFast} className={cx('icon-truck')} />
                                    <span className={cx('name')}>
                                        Kiểm tra<p> đơn hàng</p>
                                    </span>
                                </div>
                            </span>
                            <span className={cx('item', 'col')}>
                                <div className={cx('box')}>
                                    <Link to="/he-thong-cua-hang">
                                        <BsHouse className={cx('icon-truck')} />
                                        <span className={cx('name')}>
                                            Kiểm tra<p> đơn hàng</p>
                                        </span>
                                    </Link>
                                </div>
                            </span>
                        </div>
                        <h3 className={cx('footer-tilte', 'mt-4')}>Tổng đài liên hệ( 08h00 - 22h00)</h3>
                        <div className={cx('row row-cols-3 row-cols-xl-4 cus-row-cols-xl-3')}>
                            <span className={cx('item-phone', 'col', 'mt-4')}>
                                <div className={cx('box-phone')}>
                                    <a href="tel:19003355">
                                        <p className={cx('name-phone')}>Tư Vấn Mua Hàng</p>
                                        <div className={cx('info-phone')}>
                                            <BsTelephone className={cx('icon-phone')} />
                                            <p>19003355</p>
                                        </div>
                                    </a>
                                </div>
                            </span>
                            <span className={cx('item-phone', 'col', 'mt-4')}>
                                <div className={cx('box-phone')}>
                                    <a href="tel:19003355">
                                        <p className={cx('name-phone')}>Hỗ trợ kỹ thuật</p>
                                        <div className={cx('info-phone')}>
                                            <BsTelephone className={cx('icon-phone')} />
                                            <p>19003355</p>
                                        </div>
                                    </a>
                                </div>
                            </span>
                            <span className={cx('item-phone', 'col', 'mt-4')}>
                                <div className={cx('box-phone')}>
                                    <a href="tel:0838335577">
                                        <p className={cx('name-phone')}>Tư vấn bảo hành</p>
                                        <div className={cx('info-phone')}>
                                            <BsTelephone className={cx('icon-phone')} />
                                            <p> 0838335577</p>
                                        </div>
                                    </a>
                                </div>
                            </span>
                            <span className={cx('item-phone', 'col', 'mt-4')}>
                                <div className={cx('box-phone')}>
                                    <a href="tel:0911335577">
                                        <p className={cx('name-phone')}> Góp ý Sản Phẩm</p>
                                        <div className={cx('info-phone')}>
                                            <BsTelephone className={cx('icon-phone')} />
                                            <p> 0911335577</p>
                                        </div>
                                    </a>
                                </div>
                            </span>
                            <span className={cx('item-phone', 'col', 'mt-4')}>
                                <div className={cx('box-phone')}>
                                    <a href="tel:0832335577">
                                        <p className={cx('name-phone')}>Tuyển dụng</p>
                                        <div className={cx('info-phone')}>
                                            <BsTelephone className={cx('icon-phone')} />
                                            <p>0832335577</p>
                                        </div>
                                    </a>
                                </div>
                            </span>
                        </div>
                    </div>
                    {/* ROW 2 */}
                    <div className={cx('', 'col-12', 'col-lg')}>
                        <div className={cx('box-2')}>
                            <h3 className={cx('box-2-title')}> Liên hệ & mua hàng</h3>
                            <ul className={cx('box-2-list')}>
                                <li className={cx('box-2-item')}>
                                    <a href="ducanh123@gmail">
                                        <b className={cx('box-2-name-b')}>Báo giá sản phẩm:</b>
                                        <p className={cx('box-2-link')}>cskh@minhtuanmobile.com</p>
                                    </a>
                                </li>
                                <li className={cx('box-2-item')}>
                                    <a href="ducanh123@gmail">
                                        <p className={cx('box-2-name')}>Báo giá sản phẩm:</p>
                                        <p className={cx('box-2-link')}>baogia@minhtuanmobile.com</p>
                                    </a>
                                </li>
                            </ul>
                            <div className={cx('box-2-nav')}>
                                <h3 className={cx('box-2-nav-tilte')}>Chính sách bán hàng</h3>
                                <ul className={cx('box-2-nav-list')}>
                                    <li>
                                        <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                        <Link to="/post/hinh-thuc-thanh-toan">Chính Sách Vận Chuyển, Thanh Toán</Link>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                        <Link to="/post/chinh-sach-bao-mat-thong-tinn">
                                            Chính Sách Bảo Mật Thông Tin
                                        </Link>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                        <Link to="/post/chinh-sach-quy-dinh-chung">Chính Sách & Quy Định Chung</Link>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                        <Link to="/post/chinh-sach-bao-hanh">Chính Sách Bảo Hành, Đổi, Trả Hàng</Link>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                        <Link to="/post/khach-hang-than-thiet">Khách Hàng Thân Thiết</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* ROW 3 */}
                    <div className={cx('', 'col-12', 'col-lg-2')}>
                        <div className={cx('box-2-nav')}>
                            <h3 className={cx('box-2-nav-tilte')}>Hỗ trợ khách hàng</h3>
                            <ul className={cx('box-2-nav-list')}>
                                <li>
                                    <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                    <Link to="/thuong-hieu">Thương Hiệu Phân Phối</Link>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                    <Link to="/keo-thom">Kèo Thơm</Link>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                    <Link to="/tra-gop">Trả Góp</Link>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                    <Link to="/trade-in">Thu Cũ Đổi Mới</Link>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faHandPointRight} className={cx('icon-hand')} />
                                    <Link to="/news">Tin Tức</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* ROW 4 */}
                    <div className={cx('', 'col-12', 'col-lg-3')}>
                        <h3 className={cx('end-title')}>Hình thức thanh toán</h3>
                        <div className={cx('end-box')}>
                            <div className={cx('box-img', 'my-4')}>
                                <img
                                    src="https://lh3.googleusercontent.com/pw/AIL4fc8oVKU595wo1RLtKL__VMOndZ_h9bbDKtjwOZT6tE60ydBYciwzig0qQTpwam7GMlFkyEjHcShHFGVKySQVZdbpT4wqPbr5V1iFdWjf4iAKw-50VQVgILWyTHvOePJc_XNLi46itNe35-cj7mV0RVVG=w676-h292-s-no?authuser=1"
                                    style={{ width: '204px', height: '70px' }}
                                    alt=""
                                />
                            </div>
                            <h3 className={cx('box-end-title', 'py-3')}>Liên kết với Minh Tuấn Mobile</h3>
                            <div className={cx('icon-box')}>
                                <ul className={cx('icon-box-list')}>
                                    <li className={cx('icon-box-item')}>
                                        <a href="/">
                                            <img
                                                src="https://lh3.googleusercontent.com/pw/AIL4fc_GAvxh_DQO3nvWLN99AGyl8MjVHptScs04xZjqWgcTQP_uSgpF1h9ciYgvuYuRh8o8aei4gMWbzBDI0GxuxmwR2RKa5PV6a2Ft4FeAeDiUKfSiUICJXGblrDoJBcLT6aBCge2nFEddmOZnlzRNrIgR=w53-h50-s-no?authuser=1"
                                                alt=""
                                                className={cx('zalo')}
                                            />
                                        </a>
                                    </li>
                                    <li className={cx('icon-box-item')}>
                                        <a href="/">
                                            <FontAwesomeIcon
                                                icon={faSquareFacebook}
                                                className={cx('icon')}
                                                style={{ color: '#6C80AD' }}
                                            />
                                        </a>
                                    </li>
                                    <li className={cx('icon-box-item')}>
                                        <a href="/">
                                            <FontAwesomeIcon
                                                icon={faSquareYoutube}
                                                className={cx('icon')}
                                                style={{ color: '#FF312A' }}
                                            />
                                        </a>
                                    </li>
                                    <li className={cx('icon-box-item')}>
                                        <a href="/">
                                            <FontAwesomeIcon
                                                icon={faSquareInstagram}
                                                className={cx('icon')}
                                                style={{ color: '#3B3B3B' }}
                                            />
                                        </a>
                                    </li>
                                    <li className={cx('icon-box-item')}>
                                        <a href="/">
                                            <FontAwesomeIcon
                                                icon={faTiktok}
                                                className={cx('icon')}
                                                style={{ color: '#191919' }}
                                            />
                                        </a>
                                    </li>
                                </ul>
                                <div className={cx('img-gov', 'mt-4')}>
                                    <img
                                        src="https://lh3.googleusercontent.com/pw/AIL4fc8zeCCpI6kKSzuZDJvXvJe00XcEYPOPRJWaL4sOjASufj7ks0jDBH8rbmRv5UH6mDxG6X0BFI2M81DtDRZWN-cC_ro-mj63krgTmYByJwYEpVZ3bMXOERTx0CF3tDrkRUto3OWrEaOTOAnlfom_w1nI=w106-h40-s-no?authuser=1"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer-end')}>
                <div className={cx('footer-content')}>
                    <p>Công ty TNHH Minh Tuấn Mobile - GPĐKKD: 0316579658 do sở KH & ĐT TP. HCM cấp ngày 09/11/2020.</p>
                    <p>
                        Địa chỉ: 135/1/8 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam.
                    </p>
                    <p>
                        Điện thoại:{' '}
                        <span>
                            <a href="tel:19003355">1900 3355</a>-<a href="tel:0838335577">0838335577</a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
