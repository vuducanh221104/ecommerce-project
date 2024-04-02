import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    const [changeFollow, setChangeFollow] = useState(false);

    const handleChangeFollow = () => {
        setChangeFollow((prev) => !prev);
    };
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image className={cx('avatar')} src={data.avatar} alt="" />
                {!changeFollow && (
                    <Button className={cx('button-fix')} primary onClick={handleChangeFollow}>
                        Follow
                    </Button>
                )}
                {changeFollow && (
                    <Button className={cx('button-following')} outline onClick={handleChangeFollow}>
                        Following
                    </Button>
                )}
            </header>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong className={cx('nickname-strong')}>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>
                    {data.first_name} {data.last_name}
                </p>
            </div>
            <div className={cx('footer')}>
                <strong className={cx('strong-footer')}>{data.followers_count}</strong>
                <span className={cx('lable')}> Followers</span>
                <strong className={cx('strong-footer')}>{data.likes_count}</strong>
                <span className={cx('lable')}> Likes</span>
            </div>
        </div>
    );
}

export default AccountPreview;
