import classNames from 'classnames/bind';
import styles from './ListCategoryBoxProduct.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imagesHeader from '~/assets/images-header-nav';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ListCategoryBoxProduct() {
    const dataNavSub = [
        {
            title: 'iPhone',
            to: '/admin/edit/categoryboxProduct/iphone',
            img: imagesHeader.iphone,
        },
        {
            title: 'iPad',
            to: '/admin/edit/categoryboxProduct/ipad',
            img: imagesHeader.ipad,
        },
        {
            title: 'Watch',
            to: '/admin/edit/categoryboxProduct/watch',
            img: imagesHeader.watch,
        },
        {
            title: 'Mac',
            to: '/admin/edit/categoryboxProduct/mac',
            img: imagesHeader.macbook,
        },
        {
            title: 'Samsung',
            to: '/admin/edit/categoryboxProduct/samsung',
            img: imagesHeader.samsung,
            // Thêm các submenu cho Samsung nếu cần...
        },
        {
            title: 'AirPods',
            to: '/admin/edit/categoryboxProduct/airpods',
            img: imagesHeader.airpod,
            // Các submenu cho AirPods nếu cần...
        },
        {
            title: 'Âm Thanh',
            to: '/admin/edit/categoryboxProduct/am-thanh',
            img: imagesHeader.headVolume,
        },
        {
            title: 'Phụ Kiện',
            to: '/admin/edit/categoryboxProduct/phu-kien',
            img: imagesHeader.phuKien,
        },
        {
            title: 'Máy cũ',
            to: '/admin/edit/categoryboxProduct/may-cu-like-new',
            img: imagesHeader.phoneUsed,
        },
        // Thu cũ
        {
            title: 'Thu Cũ',
            to: '/admin/edit/categoryboxProduct/trade-in',
            img: imagesHeader.exchangePhone,
            // Các submenu cho Thu Cũ nếu cần...
        },
        // Kèo Thơm
        {
            title: 'Kèo Thơm',
            to: '/admin/edit/categoryboxProduct/keo-thom',
            img: imagesHeader.saleGood,
        },
        {
            title: 'Tin Tức',
            to: '/admin/edit/categoryboxProduct/news',
            img: imagesHeader.news,
        },
    ];

    return (
        <div className={cx('header-nav')}>
            <div className={cx('header-nav-container')}>
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

export default ListCategoryBoxProduct;
