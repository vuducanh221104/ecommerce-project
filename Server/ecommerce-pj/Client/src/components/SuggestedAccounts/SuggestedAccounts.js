import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import Accountitem from './Accountitem';
const cx = classNames.bind(styles);

function SuggestedAccounts({ lable, isSeeAll, data = [], onSeeAll }) {
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('lable')}>{lable}</p>
            {data.map((item, index) => (
                <Accountitem key={index} data={item} />
            ))}
            <p className={cx('more-btn')} onClick={onSeeAll}>
                {isSeeAll ? 'See Less' : 'See All'}
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    lable: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SuggestedAccounts;
