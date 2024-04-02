import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import * as searchServices from '~/services/searchServices';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import ProductItems from './AccountItemMap';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const nameRef = useRef();
    const Navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setshowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }

        const fetchApi = async () => {
            const result = await searchServices.productSearch(debounced);
            setSearchResult(result);
        };
        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        nameRef.current.value = '';
        nameRef.current.focus();
    };

    const handleOutside = () => {
        setshowResult(false);
    };
    const onChangeInput = (e) => {
        const searchValue = e.target.value;
        if (searchValue === '') {
            setSearchResult([]);
        }
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleFocus = () => {
        setshowResult(true);
    };

    const handleItemClick = () => {
        setshowResult(false);
    };

    const handleSearch = () => {
        Navigate(`/search/?k=${searchValue}`);
        setshowResult(false);
        nameRef.current.blur();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <HeadlessTippy
            interactive
            // hideOnClick={false}
            visible={showResult && searchResult.length > 0}
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <ProductItems searchResult={searchResult} onItemClick={handleItemClick} />
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={() => handleOutside()}
            offset={[30, 0]}
        >
            <div className={cx('search')}>
                <input
                    placeholder="What are you looking for?"
                    spellCheck={false}
                    ref={nameRef}
                    onChange={onChangeInput}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                <button
                    className={cx('sreach-btn')}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSearch()}
                >
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
