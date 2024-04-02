import styles from './CategoryProduct.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faArrowDown91, faArrowDown19, faClock } from '@fortawesome/free-solid-svg-icons';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CategoryBox from './ComponentCategory/CategoryBox';
import News from '~/ComponentPages/News';
import queryString from 'query-string';
import CardProduct from '~/components/CardProduct';
import LazyLoad from 'react-lazyload';
import { category, categoryImage } from '~/services/categoryServices';
import ModalLoading from '~/components/ModalLoading';
const cx = classNames.bind(styles);

function CategoryProduct() {
    const { slug } = useParams();

    const [data, setData] = useState([]);
    const [dataImageThumb, setDataImageThumb] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuOpen2, setMenuOpen2] = useState(false);
    const [valueQuery, setValueQuery] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleOpen = () => {
        setMenuOpen(!menuOpen);
    };
    const handleOpen2 = () => {
        setMenuOpen2(!menuOpen2);
    };
    // GET URL
    const queryParams = queryString.parse(location.search);
    const orderParam = queryParams.order;

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setData([]);
                setDataImageThumb([]);
                setLoading(false);
                const imageResponse = await categoryImage(slug);
                setDataImageThumb(imageResponse.images_theme);

                let actualOrder = 'price-asc'; // Default Value

                // Check if orderParam valid
                if (orderParam && ['price-asc', 'price-desc', 'latest'].includes(orderParam)) {
                    actualOrder = orderParam;
                    setValueQuery(true);
                } else {
                    setValueQuery(false);
                }
                const categoryResponse = await category(slug, orderParam, actualOrder);
                setData(categoryResponse);
                setLoading(true);
            } catch (err) {
                // navigate('/');
            } finally {
                setLoading(true);
            }
        };
        fetchApi();
    }, [slug, orderParam]);

    // BREAKPOINTS SWIPER
    const variableBreakpoints = {
        0: {
            slidesPerView: 1,
        },
        765: {
            slidesPerView: 2,
            spaceBetween: 20,
            navigation: {
                enabled: false,
            },
        },
    };

    return (
        <>
            {loading ? (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        {/* HEADER */}
                        <div className={cx('header')}>
                            {dataImageThumb && (
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={0}
                                    autoplay={{
                                        delay: 4000,
                                        pauseOnMouseEnter: true,
                                        disableOnInteraction: false,
                                        waitForTransition: true,
                                    }}
                                    breakpoints={variableBreakpoints}
                                >
                                    {dataImageThumb.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <LazyLoad>
                                                <Link to={`/${item.link}`}>
                                                    <img src={item.image} className={cx('image-home', 'lazyload')} />
                                                </Link>
                                            </LazyLoad>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}

                            <CategoryBox slugParams={slug} />
                        </div>
                        {/* BODY */}
                        <div className={cx('body')}>
                            <h2 className={cx('title')}>Chọn sản phẩm theo tiêu chí</h2>
                            {/* FILTER */}
                            <div className={cx('filter-flex')}>
                                <div className={cx('wrapper-filter')} onClick={() => handleOpen()}>
                                    <div className={cx('form-filter')}>
                                        <p> Tình trạng máy</p>
                                        <FontAwesomeIcon icon={faCaretDown} className={cx('icon-drop-down')} />
                                    </div>

                                    {menuOpen && (
                                        <ul className={cx('filter-list')}>
                                            <li className={cx('filter-item')}>
                                                <Link to={`/${slug}/?ttm=new`}>
                                                    <FontAwesomeIcon icon={faArrowDown91} />
                                                    <p> New </p>
                                                </Link>
                                            </li>
                                            <li className={cx('filter-item')}>
                                                <Link to={`/${slug}/?ttm=like-new`}>
                                                    <FontAwesomeIcon icon={faArrowDown19} />
                                                    <p>Like New</p>
                                                </Link>
                                            </li>
                                            <li className={cx('filter-item')}>
                                                <Link to={`/${slug}/?ttm=payment`}>
                                                    <FontAwesomeIcon icon={faClock} />
                                                    <p>Trả Góp</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                {/*FILTER PRICE  */}
                                <div className={cx('wrapper-filter')} onClick={() => handleOpen2()}>
                                    <div className={cx('form-filter')}>
                                        {orderParam !== undefined && !valueQuery && <p>Giá bán tăng dần</p>}
                                        {orderParam === undefined && <p>Giá bán tăng dần</p>}
                                        {orderParam === 'price-asc' && <p>Giá bán tăng dần</p>}
                                        {orderParam === 'price-desc' && <p>Giá bán giảm dần</p>}
                                        {orderParam === 'latest' && <p>Gần đây nhất</p>}
                                        <FontAwesomeIcon icon={faCaretDown} className={cx('icon-drop-down')} />
                                    </div>
                                    {menuOpen2 && (
                                        <ul className={cx('filter-list')}>
                                            <li className={cx('filter-item')}>
                                                <Link to={`/${slug}/?order=price-asc`}>
                                                    <FontAwesomeIcon icon={faArrowDown91} />
                                                    <p> Giá bán tăng dần </p>
                                                </Link>
                                            </li>
                                            <li className={cx('filter-item')}>
                                                <Link to={`/${slug}/?order=price-desc`}>
                                                    <FontAwesomeIcon icon={faArrowDown19} />
                                                    <p> Giá bán giảm dần</p>
                                                </Link>
                                            </li>
                                            <li className={cx('filter-item')}>
                                                <Link to={`/${slug}/?order=latest`}>
                                                    <FontAwesomeIcon icon={faClock} />
                                                    <p>Gần đây nhất</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            {/* PRODUCT CATEGORY */}
                            <div
                                className={cx(
                                    'product-container',
                                    'row row-cols-2 row-cols-sm-4 row-cols-lg-5 row-cols-xl-5',
                                )}
                            >
                                {data &&
                                    data.map((item, index) => (
                                        <div className={cx('col proitem', 'mt-4')} key={index}>
                                            <CardProduct data={item} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {/* FOOTER */}
                        <div className={cx('footer')}>
                            <News />
                        </div>
                    </div>
                </div>
            ) : (
                <ModalLoading />
            )}
        </>
    );
}

export default CategoryProduct;
