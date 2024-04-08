import styles from './News.module.scss';
import classNames from 'classnames/bind';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTags } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewsLatest from './NewsLatest/NewsLatest';
import ExchangTime from '~/components/ExchangeTIme/ExchangTime';
import LazyLoad from 'react-lazyload';
import { news } from '~/services/newsServices';
const cx = classNames.bind(styles);

function News() {
    const [data, setData] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const [reachedEnd, setReachedEnd] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await news(visibleCount);
            setData(response);
            if (response?.length < visibleCount) {
                setReachedEnd(true);
            } else {
                setReachedEnd(false);
            }
        };

        fetchApi();
    }, [visibleCount]);

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    if(!data){
        return (
            <div style={{display:'flex',alignItems:'center',justifyContent:"center",padding:'20px'}}>


                <h2 className={cx('title')}>Không có bài báo nào !!</h2>

            </div>
        )
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    {/* LEFT */}
                    <div className={cx('left', 'col-12 col-lg-8','mt-5')}>
                        <h2 className={cx('title')}>Gần Đây Nhất</h2>
                        
                        <div className={cx('content')}>
                            <ul className={cx('news-list')}>
                                {data?.map((item, index) => (
                                    <li className={cx('news-item')} key={item._id}>
                                        <Link to={item.slug} className={cx('row')}>
                                            <div className={cx('news-info', 'col-8')}>
                                                <h3 className={cx('news-name')}>{item.title}</h3>
                                                <div className={cx('news-category')}>
                                                    <div className={cx('news-category__types')}>
                                                        <FontAwesomeIcon icon={faTags} className={cx('icon-type')} />
                                                        <span>{item.tags}</span>
                                                    </div>
                                                    <div className={cx('news-category__times')}>
                                                        <FontAwesomeIcon icon={faClock} className={cx('icon-clock')} />
                                                        <span>
                                                            <ExchangTime time={item.createdAt} />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={cx('news-description')}>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                            <div className={cx('news-image', 'col-4')}>
                                                <LazyLoad>
                                                    <img src={item.cover_image} className={cx('lazyload','image')} />
                                                </LazyLoad>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {reachedEnd ? (
                            <div className={cx('reached-end')}>
                                <p
                                    className={cx('d-flex align-items-center justify-content-center', 'mt-3')}
                                    style={{ fontSize: '2rem' }}
                                >
                                    Nothing...
                                </p>
                                <div className={cx('btn-loadmore')} onClick={() => setVisibleCount(5)}>
                                    <button>Less</button>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('btn-loadmore')} onClick={() => loadMore()}>
                                <button>More</button>
                            </div>
                        )}
                    </div>
                    {/*  RIGHT*/}
                    <div className={cx('right', 'col-12 col-lg-4','mt-5')}>
                        <h2 className={cx('title-right')}>Cộng Đồng Minh Tuấn Mobile</h2>
                        <div className={cx('social', 'd-flex', 'mt-5')}>
                            <div className={cx('social-item-facebook')}>
                                <a
                                    href="https://www.facebook.com/minhtuanmobilesg/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faFacebookF} className={cx('icon-social')} />
                                </a>
                            </div>
                            <div className={cx('social-item-youtube')}>
                                <a
                                    href="https://www.youtube.com/channel/UCtXnwZvvr1QiGqyRMsFnXkA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faYoutube} className={cx('icon-social')} />
                                </a>
                            </div>

                            <div className={cx('social-item-instagram')}>
                                <a
                                    href="https://www.instagram.com/minhtuanmobile.official/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faInstagram} className={cx('icon-social')} />
                                </a>
                            </div>
                        </div>
                        <h3 className={cx('title', 'mt-5')}>Đánh Giá Gần Đây </h3>
                        <NewsLatest />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;
