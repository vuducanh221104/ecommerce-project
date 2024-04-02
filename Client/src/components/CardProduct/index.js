import styles from './CardProduct.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import LazyLoad from 'react-lazyload';
import 'bootstrap/dist/css/bootstrap.css';
import imagesIphone14 from '~/assets/Image-iphone';
import FormattedPrice from '../FormattedPrice/FormattedPrice';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function CardProduct({ data }) {
    return (
        <>
            <div className={cx('product')}>
                <Link to={`/product/${data.slug}`}>
                    <LazyLoad>
                        <img src={`${data.image}`} className={cx('image-thumb', 'lazyload')} />
                    </LazyLoad>
                    {data.category.brand === 'Apple' || 'apple' ? (
                        <img src={imagesIphone14.authorIcon} className={cx('author-icon')} />
                    ) : (
                        ''
                    )}
                    <span className={cx('precent')}>{`-${data.percent_discount}%`}</span>

                    <div className={cx('product-info')}>
                        <h3 className={cx('product-name')}>{`${data.name}`}</h3>
                        <div className={cx('product-price-info')}>
                            <p className={cx('product-price-discount')}>
                                <FormattedPrice value={data.price_discount} />
                            </p>
                            <p className={cx('product-price-real')}>
                                <FormattedPrice value={data.price} />
                            </p>
                        </div>
                        <p className={cx('product-prepay', 'd-block')}>
                            hoặc trả trước:
                            <b className={cx('product-prepay-price')}>
                                <FormattedPrice value={data.price_prepay} />
                            </b>
                        </p>
                        <div className={cx('product-star')}>
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

CardProduct.propTypes = {
    data: PropTypes.object.isRequired,
};
export default CardProduct;
