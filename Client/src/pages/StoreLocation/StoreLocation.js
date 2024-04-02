import React, { useState } from 'react';
import styles from './StoreLocation.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation, faLocationDot, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/scss/controller';
import LazyLoad from 'react-lazyload';

const cx = classNames.bind(styles);

function useSwiperConfig() {
    return {
        modules: [Navigation, Pagination, Scrollbar, A11y, Controller],
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 10,
                slidesPerGroup: 2,
            },
            765: {
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup: 2,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 10,
                slidesPerGroup: 5,
            },
        },
    };
}

function StoreLocation() {
    const [FirstSwiper, setFirstSwiper] = useState(null);
    const [SecondSwiper, setSecondSwiper] = useState(null);
    const [activeMapIndex, setActiveMapIndex] = useState(null);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [active, setActive] = useState(false);
    const swiperConfig = useSwiperConfig();

    const toggleMap = (index) => {
        setActiveMapIndex(activeMapIndex === index ? null : index);
    };
    // DATA LOCATIONS
    const locations = [
        {
            id: 1,
            city: 'ho-chi-minh',
            district: 'quan-1',
            address: '39 - 43 Trần Quang Khải, P.Tân Định, Quận 1',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.249034894563!2d106.69206267464536!3d10.792228758902867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528cb825b42c9%3A0x116439599e35e9c2!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693151763286!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc_04uuIC57k0WBgbQ_PpqvoH8766ILJ5Ca3M0tYVwQPZ8mYKisyyFSed3JX2oIBZlXn22dkEhwaIasADJrmeLyEJCHG3U5kwZcHLgJUc4H5c7vuXGR9TZOBMrPwckR364f6iQFlxd68-fE4vikijt0z=w500-h600-s-no?authuser=1',
        },
        {
            id: 2,
            city: 'ho-chi-minh',
            district: 'quan-tp-thu-duc',
            address: '83 Võ Văn Ngân, P.Linh Chiểu, TP.Thủ Đức',
            src: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1959.2357436389864!2d106.75606334106976!3d10.851698824794246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701e9e4b749%3A0x3370f2cae3171fe8!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693111098027!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc8m_dyqNEwUBC4LRK28PlrDHJl33ObmsfDT0POP3WqG-IEPpkRvMvmVRn7fla67jJ-UAh5YWTdI6zaLBnJtRtKfSHO95HCfeK1S66JYRldnD1ycKOCWHNwARWigR25wT2-Juqa2Pale-w7Lxe1hOoWx=w500-h600-s-no?authuser=1',
        },
        {
            id: 3,
            city: 'ho-chi-minh',
            district: 'quan-12',
            address: '93 Nguyễn Ảnh Thủ, P.Trung Mỹ Tây, Quận 12',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2936868496795!2d106.61123877464611!3d10.865252557549805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bfbb6a9a641%3A0x77c91bbaefaae6f7!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693151858211!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc8svp82AjV1_71b0mFjo_v3qOssmpFpa4DcIPlun64rrHUVoafEJLvBKAewhhJ8nyx0p9Hvlh6xBXbANwnQ2X9obuAEpcrsYTsO_Z3IiOS1B4D7C5KZgbDmhRFynVjHmvDYU13ul9eWyhCjdFvVIQjS=w500-h600-s-no?authuser=1',
        },
        {
            id: 4,
            city: 'ho-chi-minh',
            district: 'quan-binh-thanh',
            address: '287 Xô Viết Nghệ Tĩnh, Phường 15 , Q.Bình Thạnh',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1161265963383!2d106.70863647464546!3d10.80241705871461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b3c07e1f83%3A0x6d2c493000599380!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693152962858!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc_ATwsQ38VM4ZYslNTx_LCDVFTBddRopmGHjq531JOt6bIocrKPggpXOKsBcp-fioFqfSVFEI73WyDZ5RfA1TA5ej9oNuhA-DcbXthxcRNuByco4QLrcypWaGg6Nr_F-ezY8i42VW7fEJ-SXgFAVhw5=w500-h600-s-no?authuser=1',
        },
        {
            id: 5,
            city: 'ho-chi-minh',
            district: 'quan-go-vap',
            address: '363 Nguyễn Oanh, Phường 17, Q. Gò Vấp',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5702195815134!2d106.67232907683635!3d10.844165230399286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529f2a1cf0fe3%3A0x53c66993baa57af2!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693190980376!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc9VCBlEAbeIP2f5Zc9Rvv52izc6lMfFnn4URJYJYlIbSMnq1bYm7gJsJyg-qs7pASaFNB3CHIicmN-eOzLzLORXNZ_Vj2uUZ3-hmb3ImMG9mn9MEQnaAU4ctBVMay8Fu_8c7kIXO5p5WZIR55bFs5ZQ=w500-h600-s-no?authuser=1',
        },
        {
            id: 6,
            city: 'ho-chi-minh',
            district: 'quan-tan-binh',
            address: '429 Hoàng Văn Thụ, Phường 2, Q.Tân Bình',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.163496505472!2d106.65460187683189!3d10.798786931349346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529313ae1402d%3A0x8ff332a2287155d1!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693151916425!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc9G7fs-m8DFBoOC2C0Y0wXgNbwbpT1k3ciOLZRrhfHEmH6kHRfmVJmoizSVPeR90k89GsHBVgzIyCyBCswjO2mELFa-BQp_N1rwxM9mN3f40NukHtsGU_k-ACmkikBsa-M2C4wmn7BYd96GDLUQUE1D=w500-h600-s-no?authuser=1',
        },
        {
            id: 7,
            city: 'ho-chi-minh',
            district: 'quan-tan-binh',
            address: '910 Âu Cơ, Phường 14, Q.Tân Bình',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2057058712635!2d106.63591677464534!3d10.795551258841435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a788dfa6fd%3A0x4374c5f3d6eab116!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693151943570!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc8lQamOrpxnRLRJ0gnSYk2uaycT1YWelh5XhyDeWBTRMTbhcq6PJ5M44D4O98Gz5_R3_BEplY66NfwaB4W86a5LaZBB5uKhQDdZzbXQ_BrEbdRcPnYYMQygdn_Yyn_O4l5ifLS0PKUDhTvd0da5UlOz=w400-h400-s-no?authuser=1',
        },
        {
            id: 8,
            city: 'ho-chi-minh',
            district: 'quan-10',
            address: '488 Lê Hồng Phong, Phường 1, Quận 10',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5864448910283!2d106.67243887464511!3d10.766321259380883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b658188b83%3A0x5680b7fbe6a210ed!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693151967904!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc_OMjVB430REa--c-IlyPRjMonYS0jshKur9uRteC-ff7WpsIxJwu06fwkq4bhj7aNfCa9Zk6o_G5NjqH1NuSIdjORmz5HK1_j8rdieiCjX_L05Vof9Esoavh0sWuyIVkDygkfXCgOs6TPQauvTxmXG=w500-h600-s-no?authuser=1',
        },
        {
            id: 9,
            city: 'ho-chi-minh',
            district: 'quan-go-vap',
            address: '539 Quang Trung, Phường 10, Q.Gò Vấp',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62700.30931941166!2d106.6215708132957!3d10.82895652127591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752954fd48e5cb%3A0xdc1107a13281c7fc!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693152024481!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc_OMjVB430REa--c-IlyPRjMonYS0jshKur9uRteC-ff7WpsIxJwu06fwkq4bhj7aNfCa9Zk6o_G5NjqH1NuSIdjORmz5HK1_j8rdieiCjX_L05Vof9Esoavh0sWuyIVkDygkfXCgOs6TPQauvTxmXG=w500-h600-s-no?authuser=1',
        },
        {
            id: 10,
            city: 'ho-chi-minh',
            district: 'quan-tp-thu-duc',
            address: '112 Lê Văn Việt, P.Hiệp Phú, TP.Thủ Đức',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125415.90111781133!2d106.60993930269295!3d10.792391726123705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175271c14111ad7%3A0x411deae69e68f046!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693152936781!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc8sq6uqVPP954TqXFGt5_z7BzV3z4jArRyTx88JiMX2iHEebnKanHrtAEU_njnQyNs5rAQREk71lLjEi0mEsgs9Ry9okLozeH9XrtC0jxEh_renaOBFTkLUVfpZS9zkIS3eMIQFLq_UvKqnFB84pyTM=w500-h600-s-no?authuser=1',
        },
        {
            id: 11,
            city: 'ho-chi-minh',
            district: 'quan-4',
            address: '179 Khánh Hội, Phường 3, Quận 4',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7062099472423!2d106.69761277464495!3d10.757110459550502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f6d5210e8a5%3A0xac843210a547c67c!2zMTc5IMSQLiBLaMOhbmggSOG7mWksIFBoxrDhu51uZyA2LCBRdeG6rW4gNCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1693190917041!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc8cO2S5OJ8qeWRR4ZV9ceBF9YPpcRULTGx293TalV7Fgb2o_vqE0VqYsmcUuC3iNaiVXv6ArPyvs71HY8UasjIUTjpnTxnR6zadRM4zN1WaHM7RRUpO53ZIrj1wolczutNg4SVjpcHv5CCJwm8eU5D9=w500-h600-s-no?authuser=1',
        },
        {
            id: 12,
            city: 'ho-chi-minh',
            district: 'quan-1',
            address: '28 Trần Quang Khải, P. Tân Định,Quận 1',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.242455566585!2d106.69003537683135!3d10.792733331475866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528cb9af77c33%3A0xc9a9f57c39f0da51!2zMjggxJAuIFRy4bqnbiBRdWFuZyBLaOG6o2ksIFBoxrDhu51uZyBUw6JuIMSQ4buLbmgsIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1693190873561!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc8eBqc3bK52_nailjttyENDxqdy-L-aIEZORbiTQ0q_eWk53vppTImyKg2PfafzmYT9j3x4mRYp9-Z5xrZ0I_YLtAkqYOnR1-iSGe4pnasRjqJGKruA2KIQ92gEEXU6WbQxFnerKoEgklgMmQgCw2vm=w500-h600-s-no?authuser=1',
        },
        {
            id: 13,
            city: 'lam-dong',
            district: 'tp-da-lat',
            address: '123 Phan Đình Phùng, Phường 1, TP.Đà Lạt',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.427214870917!2d108.43184097465937!3d11.944895636556428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171132944fa62e7%3A0x8ee89d4aacb1fdad!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693191032231!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc8wnFfKOU5oVtEb6fQckTh-SXhSnKXzNX1yilHViv9uVF8OceOjsBlWypJb38LfiVMjpVsdUgl4_4EaWP9aQFHwdp6KSYOhOH637EiB0mICc5ItwuWEGbO7lKvbzY-396x6C891gzGDkSqVX_VyVOsa=w500-h600-s-no?authuser=1',
        },
        {
            id: 14,
            city: 'lam-dong',
            district: 'tp-bao-loc',
            address: '373 Trần Phú, P.Lộc Sơn, TP.Bảo Lộc',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.2361934367764!2d107.81487967465422!3d11.534907244746524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173f7b6a3866e59%3A0xa26069d02b324999!2zMzczIFRy4bqnbiBQaMO6LCBM4buZYyBTxqFuLCBC4bqjbyBM4buZYywgTMOibSDEkOG7k25nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1693191072450!5m2!1svi!2s',
            image: 'https://lh3.googleusercontent.com/pw/AIL4fc_ATwsQ38VM4ZYslNTx_LCDVFTBddRopmGHjq531JOt6bIocrKPggpXOKsBcp-fioFqfSVFEI73WyDZ5RfA1TA5ej9oNuhA-DcbXthxcRNuByco4QLrcypWaGg6Nr_F-ezY8i42VW7fEJ-SXgFAVhw5=w500-h600-s-no?authuser=1',
        },
    ];

    const location_LamDong = [
        {
            id: 13,
            city: 'lam-dong',
            district: 'tp-da-lat',
            address: '123 Phan Đình Phùng, Phường 1, TP.Đà Lạt',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.427214870917!2d108.43184097465937!3d11.944895636556428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171132944fa62e7%3A0x8ee89d4aacb1fdad!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693191032231!5m2!1svi!2s',
        },
        {
            id: 14,
            city: 'lam-dong',
            district: 'tp-bao-loc',
            address: '373 Trần Phú, P.Lộc Sơn, TP.Bảo Lộc',
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.2361934367764!2d107.81487967465422!3d11.534907244746524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173f7b6a3866e59%3A0xa26069d02b324999!2zMzczIFRy4bqnbiBQaMO6LCBM4buZYyBTxqFuLCBC4bqjbyBM4buZYywgTMOibSDEkOG7k25nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1693191072450!5m2!1svi!2s',
        },
    ];

    // LOGIC FILTER ALL ADRESS HAVE CHOOSE
    const filteredLocations = locations.filter((location) => {
        if (!city || !district) return true;
        return city === location.city && district === location.district;
    });

    const filteredLocationsLamDong = location_LamDong.filter((location) => {
        if (!city || !district) return true;
        return city === location.city && district === location.district;
    });

    // CHANGE CITY WILL SET IT A ''

    const changeCity = (e) => {
        setActive(true);
        setCity(e.target.value);
        setDistrict('');
    };

    const changeDistrict = (e) => {
        setDistrict(e.target.value);
    };

    // SLICE
    const firstSwiperImages = locations.slice(0, locations.length / 2);
    const secondSwiperImages = locations.slice(locations.length / 2, locations.length);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('title')}>Hệ thống cửa hàng Minh Tuấn Mobile</h3>
                <div className={cx('map-container')}>
                    <div className={cx('map-item row')}>
                        <div className={cx('map-item-left', 'col-lg-8')}>
                            {activeMapIndex === null && (
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1959.2357436389864!2d106.75606334106976!3d10.851698824794246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701e9e4b749%3A0x3370f2cae3171fe8!2sMinh%20Tu%E1%BA%A5n%20Mobile!5e0!3m2!1svi!2s!4v1693111098027!5m2!1svi!2s"
                                    width="100%"
                                    height="450"
                                    allowFullScreen=""
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            )}
                            {locations.map((map, index) => (
                                <div key={index}>
                                    {activeMapIndex === index && (
                                        <iframe
                                            src={map.src}
                                            width="100%"
                                            height="450"
                                            allowFullScreen=""
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className={cx('map-item-right', 'col-12 col-lg-4')}>
                            {/* <p>{map.address}</p> */}
                            {/*  */}
                            <div className={cx('map-select', 'row')}>
                                <select className={cx('select-city', 'col-12 col-lg')} onChange={changeCity}>
                                    <option value>Chọn thành Phố</option>
                                    <option value="ho-chi-minh">Hồ Chí Minh</option>
                                    <option value="lam-dong">Lâm Đồng</option>
                                </select>
                                <select
                                    className={cx('select-district', 'col-12 col-lg', active ? '' : 'active')}
                                    onChange={changeDistrict}
                                >
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
                                {city === 'lam-dong' &&
                                    filteredLocationsLamDong.map((location, index) => (
                                        <li
                                            key={index}
                                            className={cx('map-item')}
                                            onClick={() => toggleMap(location.id - 1)}
                                        >
                                            <FontAwesomeIcon icon={faLocationDot} className={cx('map-icon')} />
                                            <span onClick={() => toggleMap(index)}>{location.address}</span>
                                            <div className={cx('time')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('clock-icon')} />
                                                8h00 - 22h00 tất cả các ngày trong tuần
                                            </div>
                                        </li>
                                    ))}
                                {/* MAP */}
                                {city !== 'lam-dong' &&
                                    filteredLocations.map((location, index) => (
                                        <li
                                            key={index}
                                            className={cx('map-item')}
                                            onClick={() => toggleMap(location.id - 1)}
                                        >
                                            <FontAwesomeIcon icon={faLocationDot} className={cx('map-icon')} />
                                            <span>{location.address}</span>
                                            <div className={cx('time')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('clock-icon')} />
                                                8h00 - 22h00 tất cả các ngày trong tuần
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('swiper-class')}>
                        <Swiper {...swiperConfig} onSwiper={setFirstSwiper} controller={{ control: SecondSwiper }}>
                            {firstSwiperImages.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <LazyLoad>
                                        <div className={cx('box-image-map')} onClick={() => toggleMap(item.id - 1)}>
                                            <img
                                                src={item.image}
                                                key={index}
                                                className={cx('image-home', 'lazyload')}
                                            />
                                            <div className={cx('title-adress')}>
                                                <span>{item.address}</span>
                                            </div>
                                        </div>
                                    </LazyLoad>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            {...swiperConfig}
                            onSwiper={setSecondSwiper}
                            controller={{ control: FirstSwiper }}
                            pagination={{ clickable: true }}
                        >
                            {secondSwiperImages.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <LazyLoad>
                                        <div className={cx('box-image-map')} onClick={() => toggleMap(item.id - 1)}>
                                            <img
                                                src={item.image}
                                                key={index}
                                                className={cx('image-home', 'lazyload')}
                                            />
                                            <div className={cx('title-adress')}>
                                                <span>{item.address}</span>
                                            </div>
                                        </div>
                                    </LazyLoad>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className={cx('end')}>
                    <h3>Danh sách hệ thống cửa hàng trực thuộc MINH TUẤN MOBILE</h3>
                </div>
            </div>
        </div>
    );
}

export default StoreLocation;
