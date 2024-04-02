import PropTypes from 'prop-types';
import Header from '~/Layout/components/Header';
import styles from './LayoutCart.module.scss';
import classNames from 'classnames/bind';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);
function LayoutCart({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

LayoutCart.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LayoutCart;
