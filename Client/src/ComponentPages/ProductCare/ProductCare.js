import styles from './ProductCare.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import imagesIphone14 from '~/assets/Image-iphone';
import { productCare } from '~/services/productServices';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function ProductCare({ data }) {
    const [productRelative, setProductRelative] = useState([]);
    useEffect(() => {
        if (data) {
            const fetchApi = async () => {
                const subcategorySlug = data.subcategory_slug;
                const response = await productCare(subcategorySlug);
                setProductRelative(response);
            };
            fetchApi();
        }
    }, [data]);

    return (
        <div className={cx('product-care')}>
            <h3 className={cx('product-care-title')}>Bạn đang quan tâm</h3>
            <div className={cx('product-care-box')}>
                <div className={cx('product-care-list', 'row row-cols-2 row-cols-sm-4 row-cols-lg-2')}>
                    {productRelative &&
                        productRelative.map((item, index) => (
                            <div className={cx('', 'col proitem')} key={index}>
                                <Link to="/product/iphone-14-256gb-chinh-hang-vn-a">
                                    <div className={cx('product-care-item')}>
                                        <img
                                            src={item.image}
                                            style={{ width: '205px', height: '205px' }}
                                            alt=""
                                            className={cx('img-product-care')}
                                        />
                                        <div className={cx('product-sale')}>{item.percent_discount}</div>
                                        {item.category.brand === 'Apple' && (
                                            <img
                                                src={imagesIphone14.authorIcon}
                                                alt=""
                                                width={'80px'}
                                                height={'20px'}
                                                className={cx('img-authen')}
                                            />
                                        )}
                                        <div className={cx('product-care-info')}>
                                            <h3 className={cx('product-care-name')}>{item.name}</h3>
                                            <div className={cx('product-care-price')}>
                                                <p className={cx('price-discount')}>{item.price_discount}</p>
                                                <p className={cx('price')}>{item.price}</p>
                                            </div>
                                            <p className={cx('product-care-prepay')}>
                                                Hoặc trả trước <span>{item.prepay}đ</span>
                                            </p>
                                        </div>
                                        {item.rating === 5 && (
                                            <div className={cx('product-care-star')}>
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                            </div>
                                        )}
                                        {item.rating === 4 && (
                                            <div className={cx('product-care-star')}>
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStarRegular} className={cx('icon-star')} />
                                            </div>
                                        )}
                                        {item.rating === 0 && (
                                            <div className={cx('product-care-star')}>
                                                <FontAwesomeIcon icon={faStarRegular} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStarRegular} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStarRegular} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStarRegular} className={cx('icon-star')} />
                                                <FontAwesomeIcon icon={faStarRegular} className={cx('icon-star')} />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
ProductCare.propTypes = {
    data: PropTypes.object,
};
export default ProductCare;
