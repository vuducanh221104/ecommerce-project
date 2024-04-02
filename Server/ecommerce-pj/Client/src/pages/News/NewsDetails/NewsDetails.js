import styles from './NewsDetails.module.scss';
import classNames from 'classnames/bind';
import { faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MarkdownRender from '~/components/MarkdownRender';
import ExchangTime from '~/components/ExchangeTIme';
import NewsComment from '../NewsComment';
import NewsLatest from '../NewsLatest/NewsLatest';
import { newsDetail } from '~/services/newsServices';
const cx = classNames.bind(styles);
function NewsDetails() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await newsDetail(slug);
            try {
                setData(response);
            } catch (err) {
                console.log('Feching error :', err);
            }
        };

        fetchApi();
    }, [slug]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container-fluid')}>
                    <div className={cx('header')}>
                        <h1 className={cx('title')}>{data.title}</h1>
                        <div className={cx('info')}>
                            <div className={cx('info-author')}>
                                <FontAwesomeIcon icon={faUser} className={cx('icon-info')} />
                                <b className={cx('info-name')}>{data.author}</b>
                            </div>
                            <div className={cx('info-item-time')}>
                                <FontAwesomeIcon icon={faCalendar} className={cx('icon-info')} />
                                <b className={cx('info-name')}>
                                    <ExchangTime time={data.createdAt} />
                                </b>
                            </div>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <MarkdownRender content={data.content} />
                    </div>
                    <div className={cx('footer')}>
                        <NewsComment />
                    </div>
                    <div className={cx('news-latest')}>
                        <h3 className={cx('title-recent-review')}>Recent Reviews</h3>
                        <NewsLatest />
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewsDetails;
