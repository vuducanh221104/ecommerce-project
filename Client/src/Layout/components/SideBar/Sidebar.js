import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import config from '~/config';
import MenuSidebar from './Menu';
import { MenuItemm } from './Menu';
import { HomeIcon, UserGroupIcon, LiveIcon } from '~/components/Icons';
import { HomeActiveIcon, UserGroupActiveIcon, LiveActiveIcon } from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userServices from '~/services/userServices';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [isSeeAll, setIsSeeAll] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        userServices
            .getUserServices({ page: page, prePage: PER_PAGE })
            .then((data) => {
                setUser((prev) => [...prev, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);
    const handleSeeAll = () => {
        setPage(page + 1);
        setIsSeeAll(true);
    };

    return (
        <aside className={cx('wrapper')}>
            {
                <MenuSidebar>
                    <MenuItemm
                        to={config.routes.home}
                        title="For You"
                        icon={<HomeIcon />}
                        iconActive={<HomeActiveIcon />}
                    />
                    <MenuItemm
                        to={config.routes.following}
                        title="Following"
                        icon={<UserGroupIcon />}
                        iconActive={<UserGroupActiveIcon />}
                    />
                    <MenuItemm
                        to={config.routes.live}
                        title="Live"
                        icon={<LiveIcon />}
                        iconActive={<LiveActiveIcon />}
                    />
                </MenuSidebar>
            }
            <SuggestedAccounts lable="Suggessted Account" data={user} isSeeAll={isSeeAll} onSeeAll={handleSeeAll} />
            <SuggestedAccounts lable="Following Account" data={user} />
        </aside>
    );
}

Sidebar.propTypes = {};

export default Sidebar;
