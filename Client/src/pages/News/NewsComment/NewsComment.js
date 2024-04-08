import styles from './NewsComment.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import ExchangTime from '~/components/ExchangeTIme';
import { newsComment, newsCommentPost } from '~/services/newsServices';
import { useSelector } from 'react-redux';
import { axiosInstance } from '~/utils/axiosInstance';
const cx = classNames.bind(styles);

function NewsComment() {
    const dataUser = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const { slug } = useParams();
    const [seeAll, setSeeAll] = useState(false);
    const [data, setData] = useState([]);

    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Comment cannot be empty'),
        }),
        onSubmit: async (values) => {
            const axiosJWT = axiosInstance(dataUser, navigate);
            try {
                await axiosJWT.post(
                    process.env.REACT_APP_BASE_URL + 'api/news/comment',
                    {
                        slug: slug,
                        fullname: dataUser.fullname,
                        comment_content: values.comment,
                    },
                    {
                        headers: { token: `Bearer ${dataUser?.accessToken}` },
                    },
                );
                setData([
                    {
                        fullname: dataUser.fullname,
                        comment: values.comment,
                        stars: values.stars,
                        createdAt: new Date().toISOString(),
                    },
                    ...data,
                ]);
                formik.resetForm();
            } catch (err) {
                console.log(err);
            }
        },
    });

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await newsComment(slug);
                setData(res.comment);
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
    }, []);

    // Quatity stars Option
    const handleSeeAll = (e) => {
        e.preventDefault();
        setSeeAll(true);
    };
    const handleSmallest = (e) => {
        e.preventDefault();
        setSeeAll(false);
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Mời Bạn Cùng Thảo Luận</h3>
            <form className={cx('form-submit')} onSubmit={formik.handleSubmit}>
                {/* COMMENT */}
                <div className={cx('comment-list', seeAll ? 'seeAll' : '')}>
                    {data.map((item, index) => (
                        <div className={cx('comment-box')} key={index}>
                            <header className={cx('comment-header')}>
                                <div className={cx('comment-content')}>
                                    <img
                                        src={images.noImage}
                                        alt="image-user"
                                        style={{ width: '50px' }}
                                        className={cx('image-user')}
                                    />
                                    <div className={cx('comment-info')}>
                                        <h3 className={cx('comment-name')}>{item.fullname}</h3>
                                        <p className={cx('comment-time')}>
                                            <ExchangTime time={item.createdAt} />
                                        </p>
                                    </div>
                                </div>
                            </header>
                            <div className={cx('comment-body')}>
                                <p className={cx('comment-text')}>{item.comment_content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* BUTTON SEE ALL */}
                {!seeAll && data.length > 3 ? (
                    <div className={cx('btn-see-all')} onClick={(e) => handleSeeAll(e)}>
                        <button>
                            <p>More</p>
                        </button>
                    </div>
                ) : (
                    <h3
                        className={cx(seeAll ? 'd-none' : 'd-flex justify-content-center align-items-center mt-5')}
                        style={{ color: '#555' }}
                    >
                        Nothing Comment...
                    </h3>
                )}
                {seeAll && (
                    <div className={cx('btn-see-all')} onClick={(e) => handleSmallest(e)}>
                        <button>
                            <p>Less</p>
                        </button>
                    </div>
                )}
                {/* INPUT */}
                {dataUser ? (
                    <div className={cx('comment-input-box')}>
                        <div className={cx('comment-input')}>
                            <input
                                type="text"
                                placeholder="Enter Your Comment"
                                id="comment"
                                name="comment"
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className={cx('comment-grid')}>
                            <div className={cx('btn-sumbit')}>
                                <button> Submit</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('blocked-area')}>
                        <div className={cx('blocked-overlay')}>
                            <h3> Bạn Phải Đăng Nhập</h3>
                        </div>
                        <div className={cx('comment-input-box')}>
                            <div className={cx('comment-input')}>
                                <input type="text" placeholder="Enter Your Comment" id="comment" name="comment" />
                            </div>
                            <div className={cx('comment-grid')}>
                                <div className={cx('btn-sumbit')}>
                                    <button> Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default NewsComment;
