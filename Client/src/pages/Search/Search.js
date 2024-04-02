import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faArrowDown91, faArrowDown19, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import News from '~/ComponentPages/News';
import queryString from 'query-string';
import CardProduct from '~/components/CardProduct';
import axios from 'axios';
import { productSearchClick } from '~/services/searchServices';
const cx = classNames.bind(styles);

function Search() {
    const location = useLocation();
    // GET URL
    const queryParams = queryString.parse(location.search);
    const orderParam = queryParams.order;
    const kParam = queryParams.k;

    const [reachedEnd, setReachedEnd] = useState(false);
    const [data, setData] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loadPage, setLoadPage] = useState(10);
    const [valueQuery, setValueQuery] = useState(false);
    const [checkHaveProduct, setCheckHaveProduct] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            let actualOrder = 'price-asc'; // Default Value

            // Check if orderParams valid
            if (orderParam && ['price-asc', 'price-desc', 'latest'].includes(orderParam)) {
                actualOrder = orderParam;
                setValueQuery(true);
            } else {
                setValueQuery(false);
            }

            const response = await productSearchClick(kParam, loadPage, orderParam, actualOrder);

            if (Array.isArray(response) && response.length === 0) {
                setCheckHaveProduct(true);
            } else {
                setCheckHaveProduct(false);
                setData(response);
                if (response.length < loadPage) {
                    setReachedEnd(true);
                } else {
                    setReachedEnd(false);
                }
            }
        };
        fetchApi();
    }, [orderParam, loadPage, kParam]);

    const handleOpen = () => {
        setMenuOpen(!menuOpen);
    };

    const loadMore = () => {
        setLoadPage((prevCount) => prevCount + 10);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* HEADER */}
                <div className={cx('body')}>
                    <h2 className={cx('title')}>Chọn sản phẩm theo tiêu chí</h2>
                    {/*FILTER PRICE  */}
                    <div className={cx('wrapper-filter')}>
                        <div className={cx('form-filter')} onClick={() => handleOpen()}>
                            {orderParam !== undefined && !valueQuery && (
                                <>
                                    <FontAwesomeIcon icon={faArrowDown91} />
                                    <p>Giá bán tăng dần</p>
                                </>
                            )}
                            {orderParam === undefined && (
                                <>
                                    <FontAwesomeIcon icon={faArrowDown91} />
                                    <p>Giá bán tăng dần</p>
                                </>
                            )}
                            {orderParam === 'price-asc' && (
                                <>
                                    <FontAwesomeIcon icon={faArrowDown91} />
                                    <p>Giá bán tăng dần</p>
                                </>
                            )}
                            {orderParam === 'price-desc' && (
                                <>
                                    <FontAwesomeIcon icon={faArrowDown19} />
                                    <p>Giá bán giảm dần</p>
                                </>
                            )}
                            {orderParam === 'latest' && (
                                <>
                                    <FontAwesomeIcon icon={faClock} />
                                    <p>Gần đây nhất</p>
                                </>
                            )}
                            <FontAwesomeIcon icon={faCaretDown} className={cx('icon-drop-down')} />
                        </div>
                        {menuOpen && (
                            <ul className={cx('filter-list')}>
                                <li className={cx('filter-item')}>
                                    <Link to={`/search/?k=${kParam}&order=price-asc`}>
                                        <FontAwesomeIcon icon={faArrowDown91} />
                                        <p> Giá bán tăng dần </p>
                                    </Link>
                                </li>
                                <li className={cx('filter-item')}>
                                    <Link to={`/search/?k=${kParam}&order=price-desc`}>
                                        <FontAwesomeIcon icon={faArrowDown19} />
                                        <p> Giá bán giảm dần</p>
                                    </Link>
                                </li>
                                <li className={cx('filter-item')}>
                                    <Link to={`/search/?k=${kParam}&order=latest`}>
                                        <FontAwesomeIcon icon={faClock} />
                                        <p>Gần đây nhất</p>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                    <h2 className={cx('title-result')}>
                        Kết quả tìm kiếm:<span> {kParam}</span>
                    </h2>
                </div>
                {checkHaveProduct ? (
                    <div className={cx('not-product')}>
                        <h3>Không tìm thấy dữ liệu</h3>
                    </div>
                ) : (
                    <>
                        {/* BODY */}
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
                        {/* BUTTON */}

                        {reachedEnd ? (
                            <div className={cx('button-see-all')} onClick={() => setLoadPage(10)}>
                                <button>
                                    Đã Tải Hết Dữ Liệu
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
                                </button>
                            </div>
                        ) : (
                            <div className={cx('button-see-all')} onClick={() => loadMore()}>
                                <button>
                                    Xem Thêm Sản Phẩm
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
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;
