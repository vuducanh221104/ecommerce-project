import styles from './ProductFrequently.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircleRight, faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as productService from '~/services/productServices';
import imagesIphone14 from '~/assets/Image-iphone';

const cx = classNames.bind(styles);

function ProductFrequently() {
    const [data, setData] = useState();
    const [navItem, SetNavItem] = useState(0);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await productService.product();
            setData(res);
        };
        fetchApi();
    }, []);

    let buyManyProduct = [];
    if (data && data.length > 0) {
        buyManyProduct = data.filter((product) => product.isBuyMany);
    }

    // NAV-PRODUCT-FRENQUETLY
    const handleNavNext = () => {
        SetNavItem((prevItem) => prevItem + 255);
        if (navItem === 1530) {
            SetNavItem(0);
        }
    };
    const handleNavPrev = () => {
        SetNavItem((prevItem) => prevItem - 255);
    };
    return (
        <>
            <div className={cx('nav-frequently')}>
                <h2 className={cx('product-title')}>Người dùng thường mua kèm</h2>
                {/* ICON */}
                <div className={cx('nav-icon-list')}>
                    <FontAwesomeIcon
                        icon={faCircleLeft}
                        className={cx('nav-icon-left')}
                        onClick={() => {
                            handleNavPrev();
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faCircleRight}
                        className={cx('nav-icon-right')}
                        onClick={() => {
                            handleNavNext();
                        }}
                    />
                </div>
            </div>
            <div className={cx('product-content')}>
                <div className={cx('product-container')}>
                    <div
                        className={cx('product-list')}
                        style={{
                            transform: `translate3d(-${navItem}px, 0px, 0px)`,
                            transition: ' all 0.82s ease 0s',
                        }}
                    >
                        {buyManyProduct.map((data, index) => (
                            <div className={cx('product-item')} key={index}>
                                <div className={cx('product-frequently-box')}>
                                    <div className={cx('product-frequently-item')}>
                                        <Link to={`/product/${data.slug}`} className={cx('box')}>
                                            <div className={cx('product-frequently-img')}>
                                                <img
                                                    src={data.image}
                                                    alt={data.slug}
                                                    width={'205px'}
                                                    height={'205px'}
                                                    className={cx('frequently-img')}
                                                />
                                                <span className={cx('frequently-tag-percent')}>
                                                    {data.percent_discount}
                                                </span>
                                                {data.category.brand === 'Apple' && (
                                                    <img
                                                        src={imagesIphone14.authorIcon}
                                                        alt=""
                                                        width={'40%'}
                                                        height={'20px'}
                                                        className={cx('img-authen')}
                                                    />
                                                )}
                                            </div>
                                            <div className={cx('product-frequently-info')}>
                                                <h3 className={cx('product-frequently-name')}>{data.name}</h3>
                                                <div className={cx('price-box')}>
                                                    <p>{data.price_discount}</p>
                                                    <span>{data.price}</span>
                                                </div>
                                            </div>
                                            <div className={cx('product-frequently-rating')}>
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-frequently')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-frequently')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-frequently')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-frequently')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star-frequently')} />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductFrequently;
