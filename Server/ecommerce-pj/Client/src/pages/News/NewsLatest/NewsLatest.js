import styles from './NewsLatest.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTags } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import ExchangTime from '~/components/ExchangeTIme';
import { newsLatest } from '~/services/newsServices';
const cx = classNames.bind(styles);

function NewsLatest() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await newsLatest();
            setData(response);
        };

        fetchApi();
    }, []);

    return (
        <>
            <ul className={cx('news-latest-list')} style={{ padding: '0px' }}>
                {data?.map((item, index) => (
                    <li className={cx('news-latest-item')} key={index}>
                        <Link to={item.slug} className={cx('d-flex')}>
                            <div className={cx('news-latest__images')}>
                                <LazyLoad>
                                    <img src={item.cover_image} style={{ width: '110px' }} className={cx('lazyload')} />
                                </LazyLoad>
                            </div>
                            <div className={cx('news-latest__info')}>
                                <h3 className={cx('news-latest__name')}>{item.title}</h3>
                                <div className={cx('news-latest__time')}>
                                    <FontAwesomeIcon icon={faClock} className={cx('icon-clock-latest')} />
                                    <span>
                                        <ExchangTime time={item.createAt} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default NewsLatest;
