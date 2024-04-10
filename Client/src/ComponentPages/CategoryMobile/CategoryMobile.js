import classNames from 'classnames/bind';
import styles from './CategoryMobile.module.scss';
import imagesCateMobile from '~/assets/imagesCategoryMobile';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function CategoryMobile({ openFrist, setMenuOpen }) {
    const Navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [active, setActive] = useState(0);
    const data = [
        {
            title: 'iPhone',
            to: '/iphone',
            img: imagesCateMobile.iphone,
            subMenu: [
                {
                    title: 'iPhone 14 Series',
                    to: '/iphone-14-series',
                    img: imagesCateMobile.iphone,
                },
                {
                    title: 'iPhone 13 Series',
                    to: '/iphone-13-series',
                    img: imagesCateMobile.iphone14,
                },
                {
                    title: 'iPhone 13 Series',
                    to: '/iphone-13-series',
                    img: imagesCateMobile.iphone13,
                },
                {
                    title: 'iPhone 12 Series',
                    to: '/iphone-12-series',
                    img: imagesCateMobile.iphone12,
                },
                {
                    title: 'iPhone 11 Series',
                    to: '/iphone-11-series',
                    img: imagesCateMobile.iphone11,
                },
            ],
        },
        {
            title: 'iPad',
            to: '/ipad',
            img: imagesCateMobile.ipad,
            subMenu: [
                {
                    title: 'Dòng iPad',
                    to: '/ipad-pro',
                    img: imagesCateMobile.ipad,
                },
                {
                    title: 'iPad Pro',
                    to: '/ipad-pro',
                    img: imagesCateMobile.ipadPro,
                },
                {
                    title: 'iPad Air',
                    to: '/ipad-air',
                    img: imagesCateMobile.ipadAir,
                },
                {
                    title: 'iPad Gen 10',
                    to: '/ipad-gen-10',
                    img: imagesCateMobile.ipadGen10,
                },
                {
                    title: 'iPad Mini',
                    to: '/ipad-mini',
                    img: imagesCateMobile.ipadMini,
                },
            ],
        },
        {
            title: 'Watch',
            to: '/watch',
            img: imagesCateMobile.watch,
            subMenu: [
                { title: 'Dòng Apple Watch', to: '/apple-watch', img: imagesCateMobile.watch },
                { title: 'Apple Watch Ultra', to: '/apple-watch-ultra', img: imagesCateMobile.watchUltra },
                { title: 'Apple Watch S7', to: '/apple-watch-s9', img: imagesCateMobile.watchS9 },
            ],
        },
        {
            title: 'MacBook',
            to: '/macbook',
            img: imagesCateMobile.macbook,
            subMenu: [
                { title: 'Dòng MacBook', to: '/macbook', img: imagesCateMobile.macbook },
                { title: 'MacBook Pro', to: '/macbook-pro', img: imagesCateMobile.macbookPro },
                { title: 'MacBook Air', to: '/macbook-air', img: imagesCateMobile.macbookAir },
                { title: 'iMac', to: '/imac', img: imagesCateMobile.iMac },
            ],
        },
        {
            title: 'LapTop',
            to: '/laptop',
            img: imagesCateMobile.laptop,
        },
        {
            title: 'Samsung',
            to: '/samsung',
            img: imagesCateMobile.samSung,
        },
        {
            title: 'AirPods',
            to: '/airpods',
            img: imagesCateMobile.airPods,
        },
        {
            title: 'Âm Thanh',
            to: '/am-thanh',
            img: imagesCateMobile.amThanh,
        },
        {
            title: 'Tin Tức',
            to: '/news',
            img: imagesCateMobile.news,
        },
    ];

    // Function xử lý sự kiện khi người dùng chọn một nav-category-item
    const handleCategoryItemClick = (index) => {
        if (!data[index].subMenu) {
            Navigate(data[index].to);
            setMenuOpen(false);
        } else {
            setSelectedCategory(index === selectedCategory ? null : index);
            setActive(index);
        }
    };
    console.log(openFrist);
    return (
        <div className={' d-flex align-items-start flex-nowrap'}>
            <div
                className={cx('navbar-category')}
                style={openFrist ? { transform: 'translateY(0%)' } : { transform: 'translateY(100%)' }}
            >
                <div className={cx('nav-left')}>
                    <ul className={cx('nav-category-list')}>
                        <h3 className={cx('category-mobile-title')}>DANH MỤC</h3>

                        {data.map((item, index) => (
                            <li
                                className={cx('nav-category-item')}
                                style={active === index ? { backgroundColor: 'rgba(255, 124, 139, 0.3)' } : {}}
                                key={index}
                                onClick={() => handleCategoryItemClick(index)}
                            >
                                <figure className={cx('figure')}>
                                    <img
                                        src={item.img}
                                        className={cx('image-category-moblie')}
                                        style={active === index ? { borderColor: '#d70018' } : {}}
                                    />
                                </figure>
                                <p
                                    className={cx('category-moblie-p')}
                                    style={active === index ? { color: '#d70018' } : {}}
                                >
                                    {item.title}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cx('nav-right')}>
                    <ul className={cx('show-category-mobile-list')}>
                        {selectedCategory !== null &&
                            data[selectedCategory]?.subMenu.map((subItem, subIndex) => (
                                <li
                                    className={cx('show-category-mobile-item')}
                                    key={subIndex}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <Link to={subItem.to} className={cx('show-category-mobile-link')}>
                                        <figure className={cx('show-category-figure')}>
                                            <img
                                                src={subItem.img}
                                                alt={subItem.title}
                                                className={cx('image-show-category-moblie')}
                                            />
                                        </figure>
                                        <p className={cx('category-moblie-p')}>{subItem.title}</p>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
                <div onClick={() => setMenuOpen(!openFrist)}>
                    <FontAwesomeIcon icon={faXmark} className={cx('icon-x')} />
                </div>
            </div>
        </div>
    );
}

export default CategoryMobile;
