import PropTypes from 'prop-types';
import Header from '~/Layout/components/Header';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
