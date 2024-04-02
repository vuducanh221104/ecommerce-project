import styles from './Swiper.module.scss';
import classNames from 'classnames/bind';
import CardProduct from '~/components/CardProduct';
import { ProductBox as ProductBoxCard } from '../ProductBox';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Autoplay, Virtual } from 'swiper/modules';
import 'swiper/scss/virtual';
import 'swiper/scss';
import 'swiper/scss/grid';
import 'swiper/scss/autoplay';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productSwiperComponent } from '~/services/productServices';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function SwiperComponent({ dataImageAndBox }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await productSwiperComponent(dataImageAndBox.link);
                setData(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
    }, []);

    // Convert x2 Data
    const repeatedData = Array.from({ length: 3 }, () => data).flat();
    return (
        <>
            <div className={cx('content')}>
                <Link to={`/${dataImageAndBox.thumbnail.link}`}>
                    <img src={dataImageAndBox.thumbnail.image} alt="anh-theme" className={cx('image-theme')} />
                </Link>
                <div
                    className={cx('swiper-container')}
                    style={{
                        background: dataImageAndBox.backgroundColor ? dataImageAndBox.backgroundColor : '#fff',
                        marginTop: '10px',
                    }}
                >
                    <div className={cx('row pt-4', 'wrapper-product-box-card')}>
                        {data &&
                            dataImageAndBox.productBoxTheme.map((item, index) => (
                                <ProductBoxCard
                                    key={index}
                                    dataImage={item.imageBox}
                                    dataTitle={item.titleBox}
                                    dataLink={item.slugBox}
                                />
                            ))}
                    </div>
                    <Swiper
                        modules={[Virtual, Autoplay, Grid]}
                        spaceBetween={0}
                        slidesPerView={5}
                        slidespercolumn={30}
                        loop={true}
                        speed={1800}
                        autoplay={{
                            delay: 3500,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                            waitForTransition: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                grid: {
                                    rows: 2,
                                    fill: 'row',
                                },
                            },
                            575: {
                                slidesPerView: 4,
                                grid: {
                                    rows: 2,
                                    fill: 'row',
                                },
                            },
                            1200: {
                                slidesPerView: 5,
                                grid: {
                                    rows: 2,
                                    fill: 'row',
                                },
                            },
                        }}
                        className={cx('mySwiper')}
                    >
                        {repeatedData.map((item, index) => (
                            <SwiperSlide key={index} virtualIndex={index}>
                                <div className={cx('swiper-class')}>
                                    <CardProduct data={item} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {dataImageAndBox.linkButton && (
                    <div className={cx('button-see-all')}>
                        <button>
                            <Link to={`/${dataImageAndBox.linkButton ? dataImageAndBox.linkButton : ''}`}>
                                Xem Toàn Bộ Sản Phẩm
                                <span>
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        style={{
                                            fontSize: '1.5rem',
                                            color: 'var(--color-hover)',
                                        }}
                                        className={cx('icon-next')}
                                    />
                                </span>
                            </Link>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

SwiperComponent.propTypes = {
    dataImageAndBox: PropTypes.object.isRequired,
};
export default SwiperComponent;
