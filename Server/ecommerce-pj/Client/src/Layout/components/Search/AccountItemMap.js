import AccountItem from '~/components/AccountItem';
import { memo } from 'react';
function AccountItemMap({ searchResult, onItemClick }) {
    return searchResult.map((item, index) => {
        return <AccountItem key={index} data={item} onClick={onItemClick} />;
    });
}

export default memo(AccountItemMap);
