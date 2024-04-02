import styles from './ProductDescription.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Comment from '~/ComponentPages/Comment';
import ProductCare from '~/ComponentPages/ProductCare';
import MarkdownRender from '~/components/MarkdownRender';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function ProductDescription({ data }) {
    const [height, setHeight] = useState(600);
    const [show, setShow] = useState(true);
    const [on, setOn] = useState(false);

    const handleSeeAll = () => {
        setHeight(0);
        setShow(false);
    };

    const handleSmallest = () => {
        setHeight(600);
        setShow(true);
    };

    const handleSeeAllSpecifi = () => {
        setOn(true);
    };
    const handleClose = () => {
        setOn(false);
    };

    return (
        <>
            <div className={cx('product-descripion-container', 'row', 'mt-5')}>
                <div className={cx('product-descripion-left', 'col-12 col-lg-8', 'order-2 order-lg-1 pe-lg-5')}>
                    {/* PRODUCT-DESCRIPTION */}
                    <div className={cx('product-descripion-info')}>
                        <h2 className={cx('product-descripion-info-title')}>Thông Tin Sản Phẩm</h2>
                        {data && (
                            <div
                                className={cx('product-descripion-content')}
                                style={{ maxHeight: height !== 0 ? `${height}px` : 'none' }}
                            >
                                <MarkdownRender content={data.introduce} />
                            </div>
                        )}

                        <div className={cx('btn-see-all')}>
                            {show && (
                                <button
                                    className={cx('button-see-all-item')}
                                    onClick={() => {
                                        handleSeeAll();
                                    }}
                                >
                                    See All
                                </button>
                            )}

                            {!show && (
                                <button
                                    className={cx('button-see-all-item')}
                                    onClick={() => {
                                        handleSmallest();
                                    }}
                                >
                                    Smallest
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Comment */}
                    <Comment />
                </div>
                <div className={cx('product-descripion-right', 'col-12', 'order-1 order-lg-2', 'col-lg-4')}>
                    {/*ROW 1 PRODUCT INFOMATION */}
                    <div className={cx('product-descripion-specifications')}>
                        <h3 className={cx('specifications-title')}>Thông Số Kỹ Thuật</h3>
                        <div className={cx('specifications-content')}>
                            {data && <table dangerouslySetInnerHTML={{ __html: data.infomation }} />}
                        </div>
                        <div className={cx('btn-specifications')}>
                            <button
                                onClick={() => {
                                    handleSeeAllSpecifi();
                                }}
                            >
                                Xem tất cả thông số
                            </button>
                        </div>
                    </div>
                    {/* ROW 2 PRODUCT CARE */}
                    <ProductCare data={data} />
                </div>
            </div>
            {/* MODAL PRODUCT INFOMATION*/}

            <div
                className={cx('modal', on && 'on')}
                onClick={() => {
                    handleClose();
                }}
            >
                <div className={cx('modal-diablog')}>
                    <div className={cx('modal-container')}>
                        <h3 className={cx('modal-title')}>
                            Thông Số Kỹ Thuật
                            <FontAwesomeIcon
                                icon={faX}
                                className={cx('modal-close')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClose();
                                }}
                            />
                        </h3>
                        <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                            {data && <table dangerouslySetInnerHTML={{ __html: data.infomation }} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ProductDescription.propTypes = {
    data: PropTypes.object,
};

export default ProductDescription;
