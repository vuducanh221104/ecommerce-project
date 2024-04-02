import styles from './SwiperImage.module.scss';
import classNames from 'classnames/bind';
import { useRef, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import LazyLoad from 'react-lazyload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HandleImageClick from '../HandleImageClick';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function SwiperImage({
    data, //Data Image Thumb
    dataBreakpoints, // Data BreakPoints
    showImageCustomer = false, //Hide or Show Images (Thank Customer)
    propsColorBtn, //Add Color for Button swiper
    backgroundColor, // Add BackGround Color
    navigation = true, //Hide or Show Button swiper
}) {
    const sliderRef = useRef(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectIndexImage, setSelectIndexImage] = useState(0);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);
    // Handle click on image ( will happen open Overlay and Set index to show)
    const handleImageClick = (index) => {
        setShowOverlay(true);
        setSelectIndexImage(index);
    };

    return (
        <>
            {showOverlay && (
                <HandleImageClick data={data} setShowOverlay={setShowOverlay} indexImage={selectIndexImage} />
            )}
            {data && (
                <div className={cx('wrapper')}>
                    {showImageCustomer && (
                        <img
                            src="https://lh3.googleusercontent.com/pw/AIL4fc_xW5iBF182Ojzi9prbjThb8sWWP2qxRwpXD5uUgKCcDx6G5RKYH00iE1JFGA0vF3I2B5TNaNBMuhk5PYdYNvBN6bZ7x0TfbRmgNTDCFslA4Y83MjX7R7PTZsLYAUiSK4jiZPFrNf2ZWIhUAp1ppeHG=w1380-h74-s-no?authuser=1"
                            className={cx('image-customer-header')}
                        />
                    )}
                    <div className={cx('customer-background')} style={{ backgroundColor: backgroundColor }}>
                        <Swiper
                            ref={sliderRef}
                            modules={[Navigation, Autoplay]}
                            spaceBetween={0}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                pauseOnMouseEnter: true,
                                disableOnInteraction: false,
                                waitForTransition: true,
                            }}
                            speed={800}
                            breakpoints={{ ...dataBreakpoints }}
                        >
                            {data.concat(data).map((item, index) => (
                                <SwiperSlide key={index}>
                                    <LazyLoad>
                                        {item.link && item.image ? (
                                            <Link to={`/${item.link}`}>
                                                {/* If a Thumbnail home */}
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        key={index}
                                                        className={cx('image-home', 'lazyload')}
                                                    />
                                                )}
                                            </Link>
                                        ) : (
                                            <>
                                                {/* If a Image Customter */}
                                                <img
                                                    src={item}
                                                    key={index}
                                                    className={cx('image-home', 'lazyload')}
                                                    onClick={() => handleImageClick(index)}
                                                />
                                            </>
                                        )}
                                    </LazyLoad>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {navigation && (
                            <>
                                <div className="prev-arrow-customer" onClick={handlePrev}>
                                    <FontAwesomeIcon
                                        icon={faArrowLeft}
                                        className={cx('icon-prev-customer')}
                                        style={{ color: propsColorBtn }}
                                    />
                                </div>
                                <div className="next-arrow-customer" onClick={handleNext}>
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className={cx('icon-next-customer')}
                                        style={{ color: propsColorBtn }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

SwiperImage.propTypes = {
    data: PropTypes.array.isRequired,
    dataBreakpoints: PropTypes.object,
    showImageCustomer: PropTypes.bool,
    propsColorBtn: PropTypes.string,
    backgroundColor: PropTypes.string,
    navigation: PropTypes.bool,
};
export default SwiperImage;
