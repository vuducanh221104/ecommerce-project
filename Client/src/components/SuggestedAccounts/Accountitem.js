import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountPreview from './AccountPreview';
import Image from '../Image';
const cx = classNames.bind(styles);

function Accountitem({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };
    return (
        <Tippy interactive delay={[800, 0]} placement="bottom-start" render={renderPreview}>
            <div className={cx('account-item')}>
                <Image className={cx('avatar')} src={data.avatar} alt="" />
                <div className={cx('info')}>
                    <p className={cx('nickname')}>
                        <strong className={cx('nickname-strong')}>{data.nickname}</strong>
                        {data.tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
                    </p>
                    <p className={cx('name')}>
                        {data.first_name} {data.last_name}
                    </p>
                </div>
            </div>
        </Tippy>
    );
}

export default Accountitem;
