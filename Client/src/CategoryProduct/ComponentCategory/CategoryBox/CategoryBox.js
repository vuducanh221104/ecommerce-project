import { useEffect, useState } from 'react';
import { ProductBox } from '~/components/ProductBox';

import styles from './CategoryBox.module.scss';
import classNames from 'classnames/bind';
import { categoryBox } from '~/services/categoryServices';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function CategoryBox({ slugParams: slug }) {
    const [data, setData] = useState([]);
    const [parent, setParent] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await categoryBox(slug);
            // If data >1 ,it is a Main Slug (ex:Iphone ,Ipad)
            try {
                if (response.length > 1) {
                    setData(response);
                    setParent(true);
                } else {
                    setData(response[0].box_product);
                    setParent(false);
                }
            } catch {}
        };
        fetchApi();
    }, [slug]);

    return (
        <>
            {data && (
                <div className={cx('wrapper')}>
                    {parent
                        ? data.map((item, index) => (
                              // If Category Main (ex:iphone,ipad)
                              <ProductBox
                                  dataTitle={item.category_name}
                                  dataImage={item.category_image}
                                  dataLink={item.category_slug}
                                  propsBgColor={'#ddd'}
                                  slug={slug}
                                  key={index}
                              />
                          ))
                        : data.map((item, index) => (
                              // IF Category normal (ex:iphone 14 pro max)
                              <ProductBox
                                  dataTitle={item.box_product_name}
                                  dataImage={item.box_product_image}
                                  dataLink={item.box_product_slug}
                                  propsBgColor={'#ddd'}
                                  slug={slug}
                                  key={index}
                              />
                          ))}
                </div>
            )}
        </>
    );
}
CategoryBox.propTypes = {
    slugParams: PropTypes.string,
};
export default CategoryBox;
