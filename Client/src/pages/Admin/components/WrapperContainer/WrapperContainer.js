import classNames from 'classnames/bind';
import styles from './WrapperContainer.module.scss';

const cx = classNames.bind(styles);
function WrapperContainer({ children, title }) {
    return (
        <div className={cx('admin container-xxl')}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default WrapperContainer;
