import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItems({ data, onClick }) {
    const separate = data.separate;
    return (
        <>
            <div className={cx('menu-item')}>
                <Button menuFix leftIcon={data.icon} to={data.to} onClick={onClick}>
                    {data.title}
                </Button>
            </div>
        </>
    );
}

MenuItems.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItems;
