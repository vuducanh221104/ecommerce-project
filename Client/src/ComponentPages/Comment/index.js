import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import ExchangTime from '~/components/ExchangeTIme';
import { productCommentPreview } from '~/services/productServices';
import { useSelector } from 'react-redux';
import { axiosInstance } from '~/utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
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
            stars: 0,
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Comment cannot be empty'),
        }),
        onSubmit: async (values) => {
            const axiosJWT = axiosInstance(dataUser, navigate);
            try {
                await axiosJWT.post(
                    process.env.REACT_APP_BASE_URL + 'api/comment',
                    {
                        slug: slug,
                        fullname: dataUser.fullname,
                        comment: values.comment,
                        stars:values.stars,
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
                const res = await productCommentPreview(slug);
                setData(res.content);
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


    const userRatings = data;
    const totalRatingPoints = userRatings.reduce((total, rating) => total + rating.stars, 0);
    const averageRating = (totalRatingPoints / userRatings.length).toFixed(1);
    
    // Total User Comment
    const numberEvalute = userRatings.length;
    
    // Total Evalute For Every Star
    const totalEvaluteFiveStar = userRatings.filter((rating) => rating.stars === 5).length;
    const totalEvaluteFourStar = userRatings.filter((rating) => rating.stars === 4).length;
    const totalEvaluteThreeStar = userRatings.filter((rating) => rating.stars === 3).length;
    const totalEvaluteTwoStar = userRatings.filter((rating) => rating.stars === 2).length;
    const totalEvaluteOneStar = userRatings.filter((rating) => rating.stars === 1).length;
    
    // Handle Sum For Every Star
    const totalFiveStars = userRatings.filter((rating) => rating.stars === 5).reduce((total, rating) => total + rating.stars, 0);
    const totalFourStars = userRatings.filter((rating) => rating.stars === 4).reduce((total, rating) => total + rating.stars, 0);
    const totalThreeStars = userRatings.filter((rating) => rating.stars === 3).reduce((total, rating) => total + rating.stars, 0);
    const totalTwoStars = userRatings.filter((rating) => rating.stars === 2).reduce((total, rating) => total + rating.stars, 0);
    const totalOneStars = userRatings.filter((rating) => rating.stars === 1).reduce((total, rating) => total + rating.stars, 0);
    
    // Handle Width Progress
    const maxRating = userRatings.length * 5;
    const ratingValueFiveStars = (totalFiveStars / maxRating) * 100;
    const ratingValueFourStars = (totalFourStars / maxRating) * 100;
    const ratingValueThreeStars = (totalThreeStars / maxRating) * 100;
    const ratingValueTwoStars = (totalTwoStars / maxRating) * 100;
    const ratingValueOneStars = (totalOneStars / maxRating) * 100;
    

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-submit')} onSubmit={formik.handleSubmit}>
            <div className={cx('comment')}>
            <h3 className={cx('comment-title')}>Đánh Giá & Nhận Xét Về IPhone 14 128GB - Chính Hãng VN/A</h3>
            {/* BOX-EVALUTE */}
            <div className={cx('evaluate-box', 'row')}>
                <div className={cx('evaluate-box-left', 'col-12', 'col-lg-5')}>
                    <h3 className={cx('evaluate-rate')}>{averageRating}</h3>
                    <div className={cx('evaluate-info')}>
                        <div className={cx('evaluate-star')}>
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star-evaluate')} />
                        </div>
                        <div className={cx('evaluate-quatity')}>
                            <p>
                                Có <span>{numberEvalute}</span> đánh giá và nhận xét
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('evaluate-box-right', 'col-12', 'col-lg-7')}>
                    {/* 5 */}
                    <div className={cx('rating-overview')}>
                        <div className={cx('rating-overview-item-rating')}>
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                        </div>
                        <div className={cx('rating-overview-item-progress')}>
                            <div
                                className={cx('progess-bar')}
                                style={{ width: `${ratingValueFiveStars}%` }}
                                role="progressbar"
                                aria-valuenow={ratingValueFiveStars}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                        <div className={cx('rating-overview-item-text')}>{totalEvaluteFiveStar} Nhận Xét</div>
                    </div>
                    {/* 4 */}
                    <div className={cx('rating-overview')}>
                        <div className={cx('rating-overview-item-rating')}>
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                        </div>
                        <div className={cx('rating-overview-item-progress')}>
                            <div
                                className={cx('progess-bar')}
                                style={{ width: `${ratingValueFourStars}%` }}
                                role="progressbar"
                                aria-valuenow={ratingValueFourStars}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                        <div className={cx('rating-overview-item-text')}>{totalEvaluteFourStar} Nhận Xét</div>
                    </div>
                    {/*  3 */}
                    <div className={cx('rating-overview')}>
                        <div className={cx('rating-overview-item-rating')}>
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                        </div>
                        <div className={cx('rating-overview-item-progress')}>
                            <div
                                className={cx('progess-bar')}
                                style={{ width: `${ratingValueThreeStars}%` }}
                                role="progressbar"
                                aria-valuenow={ratingValueThreeStars}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                        <div className={cx('rating-overview-item-text')}>{totalEvaluteThreeStar} Nhận Xét</div>
                    </div>
                    {/*  2 */}
                    <div className={cx('rating-overview')}>
                        <div className={cx('rating-overview-item-rating')}>
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                        </div>
                        <div className={cx('rating-overview-item-progress')}>
                            <div
                                className={cx('progess-bar')}
                                style={{ width: `${ratingValueTwoStars}%` }}
                                role="progressbar"
                                aria-valuenow={ratingValueTwoStars}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                        <div className={cx('rating-overview-item-text')}>{totalEvaluteTwoStar} Nhận Xét</div>
                    </div>
                    {/*  1 */}
                    <div className={cx('rating-overview')}>
                        <div className={cx('rating-overview-item-rating')}>
                            <FontAwesomeIcon icon={faStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                            <FontAwesomeIcon icon={regularStar} className={cx('icon-star-normal')} />
                        </div>
                        <div className={cx('rating-overview-item-progress')}>
                            <div
                                className={cx('progess-bar')}
                                style={{ width: `${ratingValueOneStars}%` }}
                                role="progressbar"
                                aria-valuenow={ratingValueOneStars}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                        <div className={cx('rating-overview-item-text')}>{totalEvaluteOneStar} Nhận Xét</div>
                    </div>
                </div>
                </div>
            </div>

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
                                <div className={cx('comment-star')}>
                                    <FontAwesomeIcon icon={faStar} className={cx('comment-icon-star')} />
                                    <span>{item.stars}</span>
                                </div>
                            </header>
                            <div className={cx('comment-body')}>
                                <p className={cx('comment-text')}>{item.comment}</p>
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
                        <div className={cx('comment-select')}>
                            <select         id="stars"
                                    name="stars"
                                    value={(formik.values.stars)}
                                    onChange={formik.handleChange}
>
                                <option value="">Choose number of stars</option>
                                <option value="1">1 Sao</option>
                                <option value="2">2 Sao</option>
                                <option value="3">3 Sao</option>
                                <option value="4">4 Sao</option>
                                <option value="5">5 Sao</option>
                            </select>
                        </div>
                            <div className={cx('btn-sumbit')}>
                                <button> Submit</button>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className={cx('blocked-area')}>
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
                            <div className={cx('blocked-overlay')}>
                                <h3> Bạn Phải Đăng Nhâp</h3>
                            </div>
                                    <div className={cx('btn-sumbit')}>
                                        <button> Submit</button>
                                    </div>      
                         </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default NewsComment;
