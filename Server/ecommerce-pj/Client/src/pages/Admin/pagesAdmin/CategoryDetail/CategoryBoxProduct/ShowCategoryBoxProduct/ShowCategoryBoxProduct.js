import classNames from 'classnames/bind';
import styles from './ShowCategoryBoxProduct.module.scss';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductBox } from '~/components/ProductBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ModalLoading from '~/pages/Admin/components/ModalLoading';
import ImageCategoryBoxProduct from '../ImageCategoryBoxProduct';
import { categoryBox } from '~/services/categoryServices';
const cx = classNames.bind(styles);
function ShowCategoryBoxProduct() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [parent, setParent] = useState(false);
    const Navigate = useNavigate();
    const { pathname } = useLocation();

    const segments = pathname.split('/');
    const slug = segments[segments.length - 1];

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const response = await categoryBox(slug);
                // Clear previous data when starting a new fetch
                setData([]);
                if (response.length > 1) {
                    setData(response);
                    setParent(true);
                } else {
                    setData(response[0].box_product);
                    setParent(false);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        // Only call fetchApi when slug changes
        if (slug) {
            fetchApi();
        }
    }, [slug]);

    const editInput = (slugParam) => {
        Navigate(`/admin/edit/editBoxProduct/${slugParam}`);
    };

    return (
        <>
            {loading ? (
                <>
                    <ModalLoading />
                </>
            ) : (
                <>
                    <ImageCategoryBoxProduct slugParam={slug} loading={loading} setLoading={setLoading} />
                    <div className={cx('wrapper')}>
                        {data.length === 0 && <h2>Not Data</h2>}
                        {parent
                            ? data.map((item, index) => (
                                  // If Category Main (ex:iphone,ipad)

                                  <div className={cx('wrapper-item')} key={index}>
                                      <ProductBox
                                          dataTitle={item.category_name}
                                          dataImage={item.category_image}
                                          dataLink={`admin/edit/categoryboxProduct/${item.category_slug}`}
                                          propsBgColor={'#ddd'}
                                          slug={slug}
                                      />
                                      <Space>
                                          <EditOutlined
                                              onClick={() => editInput(item.category_slug)}
                                              style={{
                                                  color: '#ff4d4f',
                                                  cursor: 'pointer',
                                                  fontSize: '1.8rem',
                                                  marginLeft: '20px',
                                              }}
                                              className={cx('button-edit')}
                                          />
                                      </Space>
                                  </div>
                              ))
                            : data.map((item, index) => (
                                  // If  Category normal (ex:iphone 14 pro max)
                                  <div className={cx('wrapper-item')} key={index}>
                                      <ProductBox
                                          dataTitle={item.box_product_name}
                                          dataImage={item.box_product_image}
                                          dataLink={`admin/edit/categoryboxProduct/${slug}`}
                                          propsBgColor={'#ddd'}
                                          slug={slug}
                                      />
                                      <Space>
                                          <EditOutlined
                                              onClick={() => editInput(slug)}
                                              style={{
                                                  color: '#ff4d4f',
                                                  cursor: 'pointer',
                                                  fontSize: '1.8rem',
                                                  marginLeft: '20px',
                                              }}
                                              className={cx('button-edit')}
                                          />
                                      </Space>
                                  </div>
                              ))}
                        {/* BTN EDIT */}
                    </div>
                </>
            )}
        </>
    );
}

export default ShowCategoryBoxProduct;
