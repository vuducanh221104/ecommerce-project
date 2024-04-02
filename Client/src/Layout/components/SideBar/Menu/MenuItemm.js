import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MenuSidebar.scss';

const cx = classNames.bind(styles);

function MenuItemm({ to, title, icon, iconActive }) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('icon-active')}>{iconActive}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

export default MenuItemm;
