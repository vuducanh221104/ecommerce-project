import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { BsTelephone, BsCart, BsHouse } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignIn,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faGear,
    faCoins,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from 'react-router-dom';
import routesConfig from '~/config/routes';
import images from '~/assets/images';
import Search from '../Search';
import HeaderNavSub from '../HeaderNavSub';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MiniChat from '~/ComponentPages/MiniChat';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '~/redux/apiRequest';
import { logOutSuccess } from '~/redux/authSlice';
import iconNavMobile from '~/assets/icon-nav-mobile';
import { ReactComponent as IconHome } from '~/assets/icon-nav-mobile/icon-home-nav-moblie.svg';
import { ReactComponent as IconStore } from '~/assets/icon-nav-mobile/icon-store.svg';
import { ReactComponent as IconCart } from '~/assets/icon-nav-mobile/icon-cart-nav-moblie.svg';
import { ReactComponent as IconCategory } from '~/assets/icon-nav-mobile/icon-category.svg';
import { ReactComponent as IconDots } from '~/assets/icon-nav-mobile/icon-dots.svg';
import imagesCateMobile from '~/assets/imagesCategoryMobile';
import CategoryMobile from '~/ComponentPages/CategoryMobile/CategoryMobile';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header({ login = true }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const cartQuantity = useSelector((state) => state.cart.quantity);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English ',
            children: {
                title: 'language',
                data: [
                    {
                        type: 'Language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'Language',
                        code: 'vn',
                        title: 'VietNam',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and help ',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: ' Keyboard Shortcut ',
        },
    ];

    const USER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'User ',
            to: '/user',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Coins ',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings ',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Signout',
            separate: true,
            handle: () => {
                dispatch(logOutSuccess());
                logoutUser();
                navigate('/');
            },
        },
    ];

    // const handleChangeItem = (menuList) => {
    //     switch (menuList.code) {
    //         case 'vn':
    //             return console.log('daylavn');
    //     }
    // };

    return (
        <>
            {/* MiniChat */}
            <MiniChat />

            <header className={cx('clearfix')}>
                {/* Header */}
                <div className={cx('header-content')}>
                    <div className={cx('container', 'px-3')}>
                        <div
                            className={cx('row', 'flex-nowrap', 'align-items-center', 'px-2', 'content-header')}
                            style={{ justifyContent: 'center' }}
                        >
                            <div className={cx('col-auto', 'col-3', 'col-xl-2 ', 'col-md-2', 'col-lg-2', 'col-sm-2')}>
                                <div className={cx('logo')}>
                                    <Link to={routesConfig.user.home} className={cx('logo-link', 'd-inline-block')}>
                                        <img src={images.logoMain} alt="iphoneweb" width="202" height="40" />
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('col col-md', 'search-grid')}>
                                <div className={cx('search')}>
                                    <Search />
                                </div>
                            </div>
                            <div className={cx('col-auto')}>
                                <div className={cx('action')}>
                                    <div className="row">
                                        {/* HOTLINE */}
                                        <div className={cx('hotline', 'col-auto', '')}>
                                            <BsTelephone className={cx('phone-icon')} />
                                            <div className="hotline-info">
                                                <h3 className={cx('hotline-name')}>HOTLINE</h3>
                                                <p className={cx('hotline-numberphone')}>19003355</p>
                                            </div>
                                        </div>
                                        {/* CART */}
                                        <div className={cx('cart', 'col-auto', '')}>
                                            <Link to="/cart">
                                                <BsCart className={cx('cart-icon')} />
                                                <div className="cart-info">
                                                    <h3 className={cx('cart-name')}>GIỎ HÀNG</h3>
                                                    <p className={cx('cart-for-you')}>{cartQuantity} Sản Phẩm</p>
                                                </div>
                                            </Link>
                                        </div>
                                        {/* HOUSE */}
                                        <div className={cx('house', 'col-auto', '')}>
                                            <Link to="/he-thong-cua-hang">
                                                <BsHouse className={cx('house-icon')} />
                                                <div className="house-info">
                                                    <h3 className={cx('house-name')}>HỆ THỐNG</h3>
                                                    <p className={cx('house-for-you')}>CỬA HÀNG</p>
                                                </div>
                                            </Link>
                                        </div>
                                        {/* LOGIN/SIGN IN */}

                                        {
                                            <>
                                                {user ? (
                                                    <div
                                                        className={cx('img-avt', 'col-auto')}
                                                        style={{ paddingLeft: '35px', marginTop: '-5px' }}
                                                    >
                                                        <HeadlessTippy
                                                            interactive
                                                            render={(attrs) => (
                                                                <div
                                                                    className={cx('user-wrapper')}
                                                                    tabIndex="-1"
                                                                    {...attrs}
                                                                >
                                                                    <PopperWrapper>
                                                                        {USER_MENU.map((item, index) => (
                                                                            <Link
                                                                                to={item?.to}
                                                                                onClick={item?.handle}
                                                                                key={index}
                                                                            >
                                                                                <span>{item.icon}</span>
                                                                                <p>{item.title}</p>
                                                                            </Link>
                                                                        ))}
                                                                    </PopperWrapper>
                                                                </div>
                                                            )}
                                                            trigger="click"
                                                            placement="bottom-start"
                                                            offset={[0, 7]}
                                                        >
                                                            <img
                                                                src={user.avatar || images.noImage}
                                                                style={{
                                                                    width: '50px',
                                                                    height: '50px',
                                                                    borderRadius: '50%',
                                                                }}
                                                                alt="imageAvatar"
                                                            />
                                                        </HeadlessTippy>
                                                    </div>
                                                ) : (
                                                    // KHI USER LOGIN

                                                    <div className={cx('button-authen', 'col-auto', user && 'd-none')}>
                                                        <button className={cx('Signin')}>
                                                            <Link to="/register">Sign in</Link>
                                                        </button>
                                                        <button className={cx('Login')}>
                                                            <Link to="/login">
                                                                Login
                                                                <FontAwesomeIcon
                                                                    icon={faSignIn}
                                                                    className={cx('icon-login')}
                                                                />
                                                            </Link>
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <HeaderNavSub />
            </header>

            {/* NAVBAR MOBLIE */}
            <div className={cx('navbar-mobile')}>
                <div className={cx('navbar-mobile-navgroup')}>
                    <ul className={cx('navbar-mobile-navgroup-list')}>
                        <li className={cx('navbar-mobile-navgroup-item')}>
                            <Link to={'/'} className={'navbar-moblie-link'}>
                                <div className={cx('navbar-moblie-icon')}>
                                    <IconHome />
                                </div>
                                <p className={cx('navbar-mobile-p')}>Trang Chủ</p>
                            </Link>
                        </li>

                        <li className={cx('navbar-mobile-navgroup-item')} onClick={() => setMenuOpen(!menuOpen)}>
                            <div className={'navbar-moblie-link'} style={{ cursor: 'pointer' }}>
                                <div className={cx('navbar-moblie-icon')}>
                                    <IconCategory />
                                </div>
                                <p className={cx('navbar-mobile-p')}>Danh Mục</p>
                            </div>
                        </li>
                        <li className={cx('navbar-mobile-navgroup-item')}>
                            <Link to={'/he-thong-cua-hang'} className={'navbar-moblie-link'}>
                                <div className={cx('navbar-moblie-icon')}>
                                    <IconStore />
                                </div>
                                <p className={cx('navbar-mobile-p')}>Cửa Hàng</p>
                            </Link>
                        </li>
                        <li className={cx('navbar-mobile-navgroup-item')}>
                            <Link to={'/cart'} className={'navbar-moblie-link'}>
                                <div className={cx('navbar-moblie-icon')}>
                                    <IconCart />
                                </div>
                                <p className={cx('navbar-mobile-p')}>Giỏ Hàng</p>
                            </Link>
                        </li>
                        <li className={cx('navbar-mobile-navgroup-item')}>
                            <Link to={'/news'} className={'navbar-moblie-link'}>
                                <div className={cx('navbar-moblie-icon')} style={{ paddingTop: '10px' }}>
                                    <IconDots />
                                </div>
                                <p className={cx('navbar-mobile-p')}>Xem Thêm</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <CategoryMobile openFrist={menuOpen} setMenuOpen={setMenuOpen} />
        </>
    );
}
export default Header;
