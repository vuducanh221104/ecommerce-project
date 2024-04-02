import classNames from 'classnames/bind';
import styles from './ModalLoading.module.scss';
import { Spin } from 'antd';

const cx = classNames.bind(styles);
function ModalLoading() {
    return (
        <div className={cx('modal-loading')}>
            <div className={cx('icon-loading')}>
                <Spin size="large" className={'spin'} />
                <h3 className={cx('title-loading')}>Loading....</h3>
            </div>
        </div>
    );
}

export default ModalLoading;
