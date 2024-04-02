import styles from './Map.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Map() {
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [active, setActive] = useState(false);
    const locations = [
        {
            id: 1,
            city: 'ho-chi-minh',
            district: 'quan-1',
            address: '39 - 43 Trần Quang Khải, P.Tân Định, Quận 1',
        },
        {
            id: 2,
            city: 'ho-chi-minh',
            district: 'quan-tp-thu-duc',
            address: '83 Võ Văn Ngân, P.Linh Chiểu...TP.Thủ Đức',
        },
        {
            id: 3,
            city: 'ho-chi-minh',
            district: 'quan-12',
            address: '93 Nguyễn Ảnh Thủ, P.Trung ...Quận 12',
        },
        {
            id: 4,
            city: 'ho-chi-minh',
            district: 'quan-binh-thanh',
            address: '287 Xô Viết Nghệ Tĩnh, ...Q.Bình Thạnh',
        },
        {
            id: 5,
            city: 'ho-chi-minh',
            district: 'quan-go-vap',
            address: '363 Nguyễn Oanh, Phường 17, ...Gò Vấp',
        },
        {
            id: 6,
            city: 'ho-chi-minh',
            district: 'quan-tan-binh',
            address: '429 Hoàng Văn Thụ, Phường ...Q.Tân Bình',
        },
        {
            id: 7,
            city: 'ho-chi-minh',
            district: 'quan-tan-binh',
            address: '910 Âu Cơ, Phường 14, Q.Tân Bình',
        },
        {
            id: 8,
            city: 'ho-chi-minh',
            district: 'quan-10',
            address: '488 Lê Hồng Phong, Phường ...Quận 10',
        },
        {
            id: 9,
            city: 'ho-chi-minh',
            district: 'quan-go-vap',
            address: '539 Quang Trung, Phường 10, Q.Gò Vấp',
        },
        {
            id: 10,
            city: 'ho-chi-minh',
            district: 'quan-tp-thu-duc',
            address: '112 Lê Văn Việt, P.Hiệp ...TP.Thủ Đức',
        },
        {
            id: 11,
            city: 'ho-chi-minh',
            district: 'quan-4',
            address: '179 Khánh Hội, Phường 3, Quận 4',
        },
        {
            id: 12,
            city: 'ho-chi-minh',
            district: 'quan-1',
            address: '28 Trần Quang Khải, P. Tân Định,Quận 1',
        },
        {
            id: 13,
            city: 'lam-dong',
            district: 'tp-da-lat',
            address: '23 Phan Đình Phùng, Phường ...TP.Đà Lạt',
        },
        {
            id: 14,
            city: 'lam-dong',
            district: 'tp-bao-loc',
            address: '373 Trần Phú, P.Lộc Sơn, TP.Bảo Lộc',
        },
    ];

    const filteredLocations = locations.filter((location) => {
        if (!city || !district) return true;
        return city === location.city && district === location.district;
    });

    const changeCity = (e) => {
        setActive(true);
        setCity(e.target.value);
        setDistrict('');
    };

    const changeDistrict = (e) => {
        setDistrict(e.target.value);
    };

    return (
        <div className={cx('wrapper-map')}>
            <div className={cx('map-header')}>
                <FontAwesomeIcon icon={faMapLocation} className={cx('location-icon')} />
                <h3>Hệ Thống Cửa Hàng</h3>
            </div>
            <div className={cx('map-select')}>
                <select className={cx('select-city')} onChange={changeCity}>
                    <option value>Chọn thành Phố</option>
                    <option value="ho-chi-minh">Hồ Chí Minh</option>
                    <option value="lam-dong">Lâm Đồng</option>
                </select>
                <select className={cx('select-district', active ? '' : 'active')} onChange={changeDistrict}>
                    <option value> Chọn Quận/Huyện</option>
                    {city !== 'lam-dong' && (
                        <>
                            <option value="quan-1">Quận 1</option>
                            <option value="quan-10">Quận 10</option>
                            <option value="quan-12">Quận 12</option>
                            <option value="quan-4">Quận 4</option>
                            <option value="quan-binh-thanh">Quận Bình Thạnh</option>
                            <option value="quan-go-vap">Quận Gò Vấp</option>
                            <option value="quan-tan-binh">Quận Tân Bình</option>
                            <option value="quan-tp-thu-duc">Quận TP.Thủ Đức</option>
                        </>
                    )}
                    {city === 'lam-dong' && (
                        <>
                            <option value="tp-bao-loc">Thành Phố Bảo Lộc</option>
                            <option value="tp-da-lat">Thành Phố Đà Lạt</option>
                        </>
                    )}
                </select>
            </div>
            <ul className={cx('map-list')}>
                {city === 'lam-dong' && (
                    <>
                        <li className={cx('map-item')}>
                            <FontAwesomeIcon icon={faLocationDot} className={cx('map-icon')} />
                            <span>23 Phan Đình Phùng, Phường ...TP.Đà Lạt</span>
                        </li>
                        <li className={cx('map-item')}>
                            <FontAwesomeIcon icon={faLocationDot} className={cx('map-icon')} />
                            <span>373 Trần Phú, P.Lộc Sơn, TP.Bảo Lộc</span>
                        </li>
                    </>
                )}
                {/* MAP */}
                {city !== 'lam-dong' &&
                    filteredLocations.map((location, index) => (
                        <li className={cx('map-item')} key={index}>
                            <FontAwesomeIcon icon={faLocationDot} className={cx('map-icon')} />
                            <span>{location.address}</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Map;
