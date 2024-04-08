import styles from './News.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';
import { newsLimit } from '~/services/newsServices';
const cx = classNames.bind(styles);

function News() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await newsLimit(6);
            try {
                setData(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={cx('news-box')}>
            <h3 className={cx('news-title')}>Tin Tức</h3>
            <div className={cx('news-list')}>
                {windowWidth < 765 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        spaceBetween={20}
                        pagination={{ clickable: true }}
                        paginationStyle={{ marginTop: '100px' }}
                        slidesPerView={1}
                    >
                        {data?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className={cx('news-item')}>
                                    <div className={cx('img-box')}>
                                        <Link to={`/news/${item.slug}`}>
                                            <img src={item.cover_image} alt="" className={cx('img-news')} />
                                        </Link>
                                    </div>
                                    <div className={cx('news-info')}>
                                        <Link to={`/news/${item.slug}`}>
                                            <p>{item.title}</p>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className={cx('news-content')}>
                        {data?.map((item, index) => (
                            <div className={cx('news-item')} key={item._id}>
                                <div className={cx('img-box')}>
                                    <Link to={`/news/${item.slug}`}>
                                        <img src={item.cover_image} alt="" className={cx('img-news')} />
                                    </Link>
                                </div>
                                <div className={cx('news-info')}>
                                    <Link to={`/news/${item.slug}`}>
                                        <p>{item.title}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default News;
