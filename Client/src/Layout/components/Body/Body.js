import styles from './Body.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import Map from '~/ComponentPages/Map';
import ProductInfo from './ProductInfo/ProductInfo';
import { useEffect, useState } from 'react';
import ProductFrequently from '~/ComponentPages/ProductFrequently';
import ProductDescription from '~/ComponentPages/ProductDescription';
import { useParams } from 'react-router-dom';
import * as productService from '~/services/productServices';
import News from '~/ComponentPages/News';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Body() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const { slug } = useParams();
    useEffect(() => {
        const fetchApi = async () => {
            const data = await productService.productInfo(slug, navigate);
            try {
                setData(data);
            } catch (err) {}
        };
        fetchApi();
    }, [slug]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    {/* PRODUCT-INFO */}
                    <div className={cx('product-info')}>
                        <div className={cx('row')}>
                            {/* COT 1-2*/}
                            <div className={cx('', 'col-12 col-lg-12 col-xl-9 px-4 mt-5')}>
                                <ProductInfo data={data} />
                            </div>
                            {/* COT 3 */}
                            <div className={cx('product-map-shop', 'col-12 col-lg-12 col-xl-3')}>
                                {/* MAP */}
                                <Map />
                                <div className={cx('wrapper-guarantee')}>
                                    <div className={cx('guarantee-header')}>
                                        <FontAwesomeIcon icon={faShieldHalved} className={cx('icon-shield')} />
                                        <p> Bảo Hành 12 Tháng</p>
                                    </div>
                                    <div className={cx('guarantee-body')}>
                                        <p>✔️Máy mới Fullbox 100% - Chưa Active - Chính Hãng Apple</p>
                                        <p>✔️Được hỗ trợ 1 đổi 1 trong 30 ngày nếu có lỗi từ nhà sản xuất</p>
                                        <p>✔️Bảo hành chính hãng Apple 12 tháng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* PRODUCT-REGULAR */}
                    <div className={cx('product-frequently')}>
                        <ProductFrequently />
                    </div>
                    {/* PRODUCT-DESCRIPTION */}
                    <div className={cx('product-description')}>
                        <ProductDescription data={data} slug={slug} />
                    </div>
                    {/* News / Newspaper */}
                    <div className={cx('news')}>
                        <News />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Body;
