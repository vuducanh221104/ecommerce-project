import styles from './CartTitleAndPrev.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function CartTitleAndPrev({ title, linkTo }) {
    return (
        <div className={cx('wrapper')}>
            <Link to={linkTo}>
                <FontAwesomeIcon icon={faArrowLeft} className={cx('icon-prev')} />
                <h3>{title}</h3>
            </Link>
        </div>
    );
}

export default CartTitleAndPrev;
