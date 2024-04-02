import styles from './HeaderOnly.module.scss';
import classNames from 'classnames/bind';
import Header from '~/Layout/components/Header';
const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header login={false} />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
