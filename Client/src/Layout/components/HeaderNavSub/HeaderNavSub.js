import classNames from 'classnames/bind';
import styles from './HeaderNavSub.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imagesHeader from '~/assets/images-header-nav';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderNavSub() {
    const dataNavSub = [
        {
            title: 'iPhone',
            to: '/iphone',
            img: imagesHeader.iphone,
            subMenu: [
                {
                    title: 'iPhone 14 Series',
                    to: '/iphone-14-series',
                    subItems: [
                        { title: 'iPhone 14 Pro Max', to: '/iphone-14-pro-max' },
                        { title: 'iPhone 14 Pro', to: '/iphone-14-pro' },
                        { title: 'iPhone 14 Plus', to: '/iphone-14-plus' },
                        { title: 'iPhone 14', to: '/iphone-14' },
                    ],
                },
                {
                    title: 'iPhone 13 Series',
                    to: '/iphone-13-series',
                    subItems: [
                        { title: 'iPhone 13', to: '/iphone-13' },
                        { title: 'iPhone 13 Pro Max', to: '/iphone-13-mini' },
                        ,
                    ],
                },
                {
                    title: 'iPhone 12 Series',
                    to: '/iphone-12-series',
                    subItems: [{ title: 'iPhone 12', to: '/iphone-12' }],
                },
                {
                    title: 'iPhone 11 Series',
                    to: '/iphone-11-series',
                    subItems: [{ title: 'iPhone 11', to: '/iphone-11' }],
                },
            ],
        },
        {
            title: 'iPad',
            to: '/ipad',
            img: imagesHeader.ipad,
            subMenu: [
                {
                    title: 'iPad Pro',
                    to: '/ipad-pro',
                    subItems: [{ title: 'iPad Pro 2022', to: '/ipad-pro-2022' }],
                },
                {
                    title: 'iPad Air',
                    to: '/ipad-air',
                    subItems: [{ title: 'iPad Air 5', to: '/ipad-air-5' }],
                },
            ],
        },
        {
            title: 'Watch',
            to: '/watch',
            img: imagesHeader.watch,
            subMenu: [
                { title: 'Apple Watch Ultra', to: '/apple-watch-ultra' },
                { title: 'Apple Watch S7', to: '/apple-watch-s7' },
                { title: 'Apple Watch S6', to: '/apple-watch-s6' },
                { title: 'Apple Watch SE', to: '/apple-watch-se' },
                { title: 'Apple Watch S8', to: '/apple-watch-s8' },
                // Thêm các mục khác nếu cần...
            ],
        },
        {
            title: 'Mac',
            to: '/mac',
            img: imagesHeader.macbook,
            subMenu: [
                {
                    title: 'MacBook',
                    to: '/macbook',
                    subItems: [
                        { title: 'MacBook Pro', to: '/macbook-pro' },
                        { title: 'MacBook Air', to: '/macbook-air' },
                        // Thêm các mục khác nếu cần...
                    ],
                },
                { title: 'Mac Studio', to: '/mac-studio' },
                { title: 'iMac', to: '/imac' },
                { title: 'Mac mini', to: '/mac-mini' },
                { title: 'Apple TV', to: '/apple-tv' },
                // Thêm các mục khác nếu cần...
            ],
        },
        {
            title: 'Samsung',
            to: '/samsung',
            img: imagesHeader.samsung,
            // Thêm các submenu cho Samsung nếu cần...
        },
        {
            title: 'AirPods',
            to: '/airpods',
            img: imagesHeader.airpod,
            // Các submenu cho AirPods nếu cần...
        },
        {
            title: 'Âm Thanh',
            to: '/am-thanh',
            img: imagesHeader.headVolume,
            subMenu: [
                {
                    title: 'Loa',
                    to: '/loa',
                    subItems: [
                        { title: 'Loa Marshall', to: '/loa-marshall' },
                        { title: 'Loa Bose', to: '/loa-bose' },
                        // Thêm các loa khác nếu cần...
                    ],
                },
                {
                    title: 'Tai nghe',
                    to: '/tai-nghe',
                    subItems: [
                        { title: 'Tai nghe Apple', to: '/tai-nghe-apple' },
                        { title: 'Tai nghe Samsung', to: '/tai-nghe-samsung' },
                        // Thêm các tai nghe khác nếu cần...
                    ],
                },
                // Thêm các mục khác nếu cần...
            ],
        },
        {
            title: 'Phụ Kiện',
            to: '/phu-kien',
            img: imagesHeader.phuKien,
            subMenu: [
                { title: 'Phụ kiện Apple', to: '/phu-kien-apple' },
                { title: 'Phụ kiện Samsung', to: '/phu-kien-samsung' },
                { title: 'Cốc - Cáp', to: '/coc-cap-sac' },
                { title: 'Sạc dự phòng', to: '/sac-du-phong' },
                { title: 'Bao da - Ốp lưng', to: '/bao-da-op-lung' },
                // Thêm các mục phụ kiện khác nếu cần...
            ],
        },
        {
            title: 'Máy cũ',
            to: '/may-cu-like-new',
            img: imagesHeader.phoneUsed,
            subMenu: [
                { title: 'iPhone', to: '/may-cu-iphone' },
                { title: 'AirPods', to: '/may-cu-airpods' },
                { title: 'Mac', to: '/may-cu-mac' },
                // Thêm các mục máy cũ khác nếu cần...
            ],
        },
        // Thu cũ
        {
            title: 'Thu Cũ',
            to: '/trade-in',
            img: imagesHeader.exchangePhone,
            // Các submenu cho Thu Cũ nếu cần...
        },
        // Kèo Thơm
        {
            title: 'Kèo Thơm',
            to: '/keo-thom',
            img: imagesHeader.saleGood,
        },
        {
            title: 'Tin Tức',
            to: '/news',
            img: imagesHeader.news,
        },
    ];

    return (
        <div className={cx('header__nav__container')}>
            <div className={'container'}>
                <ul className={cx('header-list')}>
                    {dataNavSub.map((navItem) => (
                        <li className={cx('header-item')} key={navItem.title}>
                            <Link to={navItem.to} className={cx('header-link')}>
                                <img src={navItem.img} alt={navItem.title} className={cx('header-img')} />
                                <span className={cx('header-name')}>{navItem.title}</span>
                            </Link>
                            {navItem.subMenu && (
                                <div className={cx('header-navsub')}>
                                    <ul className={cx('header-navsub-list')}>
                                        {navItem.subMenu.map((subItem) => (
                                            <li className={cx('header-navsub-item')} key={subItem.title}>
                                                <Link to={subItem.to} className={cx('header-navsub-link')}>
                                                    {subItem.title}
                                                </Link>
                                                {subItem.subItems && (
                                                    <div className={cx('menu-mutilevel')}>
                                                        <ul className={cx('menu-mutilevel-list')}>
                                                            {subItem.subItems.map((item) => (
                                                                <li
                                                                    className={cx('menu-mutilevel-item')}
                                                                    key={item.title}
                                                                >
                                                                    <Link
                                                                        to={item.to}
                                                                        className={cx('menu-mutilevel-link')}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faCircle}
                                                                            className={cx('menu-mutilevel-icon')}
                                                                        />
                                                                        {item.title}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HeaderNavSub;
