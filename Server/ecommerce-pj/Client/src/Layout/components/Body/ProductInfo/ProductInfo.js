import styles from './ProductInfo.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGift, faCartPlus, faComment } from '@fortawesome/free-solid-svg-icons';
import { BsCaretRight, BsCaretLeft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { setLocalStorage, getLocalStorage } from '~/components/EncodeLocalStorage';
import MarkdownRender from '~/components/MarkdownRender';
import FormattedPrice from '~/components/FormattedPrice/FormattedPrice';
import ModalLoading from '~/components/ModalLoading';
import { useDispatch } from 'react-redux';
import { incrementQuantity } from '~/redux/cartSlice';

const cx = classNames.bind(styles);

function ProductInfo({ data }) {
    const myRef = useRef(null);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [width, setWidth] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isDoubleClicked, setIsDoubleClicked] = useState(false);
    const [currentThumbnailSrc, setCurrentThumbnailSrc] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [newPrice, setNewPrice] = useState(0);
    const [activeColorIndex, setActiveColorIndex] = useState(0);
    const [selectPrice, setSelectPrice] = useState(0);
    const [selectNameColor, setSelectNameColor] = useState('');
    const [currentStock, setCurrentStock] = useState(data?.color[0].stored);

    const productDescription = data?.description;
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const handleQuantityInCart = () => {
        dispatch(incrementQuantity());
    };
    // Hàm xử lý khi sự kiện resize xảy ra
    const handleResize = () => {
        if (myRef.current) {
            const newWidth = myRef.current.offsetWidth;
            setWidth(newWidth - 16);
        }
    };

    //  Handle Next - Next of Thumb-Images
    const handleNext = (e) => {
        if (!isDoubleClicked) {
            setIsDoubleClicked(true);

            setTimeout(() => {
                setActiveImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
                setIsDoubleClicked(false);
            }, 100);
        }
        setTimeout(() => {
            setCurrentThumbnailSrc(null);
        }, 200);
    };

    //  Handle Prev - Prev of Thumb-Images
    const handlePrev = () => {
        setActiveImageIndex((prevIndex) => {
            if (prevIndex < 1) {
                prevIndex = 1;
            }
            return prevIndex - 1;
        });
        setTimeout(() => {
            setCurrentThumbnailSrc(null);
        }, 200);
    };

    // Handle Click to Images-details
    const handleThumbnailClick = (index) => {
        setActiveImageIndex(index);
        setCurrentThumbnailSrc(null);
    };

    // Get LocalStorage data in cart ( ADD ALL IN LOCALSTORAGE)
    useEffect(() => {
        const cartFromLocalStorage = getLocalStorage('addToCart', 'addToCart');
        if (cartFromLocalStorage && cartFromLocalStorage.length > 0) {
            setCartItems(cartFromLocalStorage);
        }
    }, []);

    // Set Localstorage when quantity in cart change
    useEffect(() => {
        setLocalStorage('addToCart', cartItems, 'addToCart');
    }, [cartItems]);

    // Handle when click add to cart
    const handleAddCart = () => {
        // Change quantity in cart on header
        handleQuantityInCart();
        const selectedColor = selectNameColor ? selectNameColor : data.color[activeColorIndex].name;
        const selectedPrice = selectPrice ? selectPrice : data.color[activeColorIndex].price;
        const selectedImage = currentThumbnailSrc ? currentThumbnailSrc : data.color[activeColorIndex].image;

        const getGroductIndex = cartItems.findIndex(
            (item) => item.name === data.name && item.selectedColor === selectedColor,
        );

        if (getGroductIndex !== -1) {
            // Product with the same name and color already exists in the cart
            const updatedCartItems = [...cartItems];
            updatedCartItems[getGroductIndex].amount += 1;
            setCartItems(updatedCartItems);
        } else {
            // Product with the same name and color doesn't exist in the cart, add a new product
            setCartItems((prevItems) => [
                ...prevItems,
                {
                    ...data,
                    selectedColor,
                    price_discount: selectedPrice,
                    images: [selectedImage],
                    amount: 1,
                },
            ]);
        }
    };

    // Handle when click buy now
    const handleBuyNow = () => {
        // Change quantity in cart on header
        handleQuantityInCart();
        setIsLoading(true);
        const selectedColor = selectNameColor ? selectNameColor : data.color[activeColorIndex].name;
        const selectedPrice = selectPrice ? selectPrice : data.color[activeColorIndex].price;
        const selectedImage = currentThumbnailSrc ? currentThumbnailSrc : data.color[activeColorIndex].image;

        const getGroductIndex = cartItems.findIndex(
            (item) => item.name === data.name && item.selectedColor === selectedColor,
        );

        if (getGroductIndex !== -1) {
            // Product with the same name and color already exists in the cart
            const updatedCartItems = [...cartItems];
            updatedCartItems[getGroductIndex].amount += 1;
            setCartItems(updatedCartItems);
        } else {
            // Product with the same name and color doesn't exist in the cart, add a new product
            setCartItems((prevItems) => [
                ...prevItems,
                {
                    ...data,
                    selectedColor,
                    price_discount: selectedPrice,
                    images: [selectedImage],
                    amount: 1,
                },
            ]);
        }

        setTimeout(() => {
            Navigate('/cart');
            setIsLoading(false);
        }, 500);
    };

    // Chage Color when Click Color of Product
    const handleColorProduct = (dataImage, index, price, nameColor) => {
        setActiveImageIndex(0);
        setCurrentThumbnailSrc(dataImage);
        setActiveColorIndex(index);
        setSelectPrice(price);
        setSelectNameColor(nameColor);
        data.images[0] = dataImage;
    };

    const handlePrice = (price) => {
        setNewPrice(price);
    };
    const currentSlug = window.location.pathname.split('/').slice(-1)[0];

    return (
        <>
            {isLoading && <ModalLoading />}
            {data ? (
                <div className={cx('row')}>
                    <div className={cx('product-img', 'col-12 col-sm-12 col-lg-5 col-xl-5 col-md-12')}>
                        {/* THUMB IMG */}
                        <div className={cx('img-main-container')} ref={myRef}>
                            <div
                                style={{
                                    transform: `translate3d(-${activeImageIndex * width}px, 0px, 0px)`,
                                }}
                                className={cx('img-main-list')}
                            >
                                {data.images.map((image, index) => (
                                    <img
                                        style={{
                                            width: `${width}px`,
                                            height: `${width <= 766 ? 320 : width}px`,
                                        }}
                                        key={index}
                                        alt={`imagePreview` + index}
                                        src={currentThumbnailSrc ? currentThumbnailSrc : image}
                                        className={cx('img-thumb')}
                                    />
                                ))}
                            </div>
                            <div className={cx('icon-list')}>
                                <div className={cx('icon-item')}>
                                    <BsCaretRight className={cx('icon-right')} onClick={handleNext} />
                                </div>
                                <div className={cx('icon-item')}>
                                    <BsCaretLeft className={cx('icon-left')} onClick={handlePrev} />
                                </div>
                            </div>
                        </div>
                        {/* DESCRIPTION IMAGES */}
                        <div className={cx('img-details-list', 'mt-4')}>
                            {/* IMAGES */}
                            {data.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={cx('img-details-item', 'current', {
                                        active: index === activeImageIndex,
                                    })}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <img src={image} className={cx('img-item')} alt={`imageDes` + index} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* COT 2 */}
                    <div className={cx('product-details', 'px-4', 'col-sm-12', 'col-lg', 'col-12 col-xl-7 col-md-12')}>
                        <div className={cx('product-info')}>
                            {/* NAME */}
                            <h3 className={cx('product-name')}>{data.name}</h3>
                            {/* PRODUCT-STAR */}
                            <div className={cx('icon-start-list')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                                <FontAwesomeIcon icon={faStar} className={cx('icon-start-item')} />
                            </div>
                            <h3 className={cx('price-buy')}>Giá bán</h3>
                            {/* PRODUCT-PRICE */}
                            <div className={cx('price')}>
                                <span className={cx('price-discount')}>
                                    {newPrice ? (
                                        <FormattedPrice value={newPrice} />
                                    ) : (
                                        <FormattedPrice value={data.color[0].price} />
                                    )}
                                </span>
                                <span className={cx('price-real')}>{data.price}đ</span>
                            </div>
                            {/* PRODUCT-MEMORY */}
                            <div
                                className={cx(
                                    'product-memory-list',
                                    'row row-cols-2 row-cols-sm-4 row-cols-md-4 row-cols-lg-3',
                                    'mt-3',
                                )}
                            >
                                {data.storage.map((data, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={cx('product-memory-item', {
                                                active: data.link === currentSlug, // Thêm lớp active nếu slug trùng khớp
                                                col: true,
                                            })}
                                        >
                                            <Link to={`/product/${data.link}`}>
                                                <p className={cx('product-memory-name')}>{data.name}</p>
                                                <p className={cx('product-memory-price')}>{data.price}đ</p>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* PRODUCT-COLOR */}
                            <h3 className={cx('product-color-title')}>Màu Sắc</h3>
                            <div className={cx('product-color-list')}>
                                {data.color.map((item, index) => (
                                    <div key={index}>
                                        <span>
                                            <img
                                                src={item.image}
                                                className={cx('prodcut-color-img', item.stored > 0 ? 'on' : 'off', {
                                                    active: index === activeColorIndex,
                                                })} //'have on just presently(hiện)'
                                                style={{ width: '60px' }}
                                                alt={`imageColor` + index}
                                                onClick={() => {
                                                    handleColorProduct(item.image, index, item.price, item.color);
                                                    handlePrice(item.price);
                                                    setCurrentStock(item.stored);
                                                }}
                                            />
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {/* PRODUCT DESCTRIPTION */}
                            <div className={cx('product-description', 'mt-4')}>
                                <div className={cx('product-description-header')}>
                                    <h3 className={cx('product-description-header-title')}>
                                        <FontAwesomeIcon icon={faGift} className={cx('icon-gift')} />
                                        Ưu Đãi Khi Mua {data.name}
                                    </h3>
                                </div>
                                <div className={cx('product-description-body')}>
                                    <div className={cx('product-description-info')}>
                                        <div className={cx('product-description-p')}>
                                            {productDescription && <MarkdownRender content={productDescription} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* PRODUCT BUTTON */}
                            <div className={cx('product-btn')}>
                                <div className={cx('div-icon-comment')}>
                                    <FontAwesomeIcon icon={faComment} className={cx('icon-comment')} />
                                </div>

                                <div className={cx('btn-frist', currentStock < 1 && 'disabled-button')}>
                                    {/* <Link to="/cart"> */}
                                    <button className={cx('btn-buy-now')} onClick={() => handleBuyNow()}>
                                        <h3>MUA NGAY</h3>
                                        <span>Giao nhanh từ 2 giờ trong nội thành</span>
                                    </button>
                                    {/* </Link> */}
                                </div>

                                <div className={cx('btn-info')}>
                                    <div className={cx('btn-second', currentStock < 1 && 'disabled-button')}>
                                        <Link to={`/product/${data.slug}`}>
                                            <button className={cx('btn-add-cart')} onClick={() => handleAddCart()}>
                                                <h3>
                                                    <FontAwesomeIcon icon={faCartPlus} className={cx('cart-plus')} />
                                                    THÊM GIỎ HÀNG
                                                </h3>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className={cx('btn-third', currentStock < 1 && 'disabled-button')}>
                                        <button className={cx('btn-installment')}>
                                            <h3>MUA TRẢ GÓP</h3>
                                            <span>Xét Duyệt Nhanh Chóng</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* TRADE */}
                        <div className={cx('trade')}>
                            <img
                                src="https://lh3.googleusercontent.com/pw/AIL4fc93vjalvTbWFt4tEQw4ElOqpKuLTqRsJ1KP_uX_ccP5LdafWhAaAVVyFcpWE_24SWlho96gKRRU0YT-Jh0gvNIgrMvgNJQ-0_p9FAxbcp6NOYODvfbRwlJYW3xaK_II6qUHW5BWh2peNUGiTU_DOcsV=w56-h35-s-no?authuser=1"
                                alt="trade"
                            />
                            <Link to="/trade-in">Đổi Cũ Mua Mới {data.name}</Link>
                        </div>
                        {/* END */}
                    </div>
                </div>
            ) : (
                <ModalLoading />
            )}
        </>
    );
}

export default ProductInfo;
