import classNames from 'classnames/bind';
import styles from './ImageCategoryBoxProduct.module.scss';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductBox } from '~/components/ProductBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ModalLoading from '~/pages/Admin/components/ModalLoading';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useParams } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { category, categoryImage } from '~/services/categoryServices';
const cx = classNames.bind(styles);

function ImageCategoryBoxProduct({ slugParam }) {
    const Navigate = useNavigate();
    const [dataImageThumb, setDataImageThumb] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await categoryImage(slugParam);
                setDataImageThumb(response.images_theme);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApi();
    }, [slugParam]);

    const handleEdit = () => {
        Navigate(`/admin/edit/editCategoryImage/${slugParam}`);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                {loading ? (
                    <ModalLoading />
                ) : (
                    <div className={cx('images-thumb')}>
                        {dataImageThumb.map((item, index) => (
                            <LazyLoad key={index}>
                                <Link to={`/${item.link}`}>
                                    <img src={item.image} key={index} className={cx('image', 'lazyload')} />
                                </Link>
                            </LazyLoad>
                        ))}
                        {dataImageThumb.length > 0 && (
                            <Space>
                                <EditOutlined
                                    onClick={() => handleEdit()}
                                    style={{
                                        color: '#ff4d4f',
                                        cursor: 'pointer',
                                        fontSize: '1.8rem',
                                        marginLeft: '20px',
                                    }}
                                    className={cx('button-edit')}
                                />
                            </Space>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default ImageCategoryBoxProduct;
