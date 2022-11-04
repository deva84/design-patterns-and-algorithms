import { useState, FC } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Search.module.scss';

interface SearchProps {
    store?: {};
    updateStore?: (val) => void;
}


export const Search: FC<SearchProps> = props => {
    const [searchedValue, setSearchedValue] = useState('');

    const onChange = value => {
        setSearchedValue(value);
    };

    const onKeyPress = event => {
        if (event.key === 'Enter') {
            props.updateStore(searchedValue);
        }
    }

    return (
        <OutlinedInput
            className={styles.input}
            placeholder="Search by country/name/username"
            value={searchedValue}
            type="search"
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => onKeyPress(e)}
        />
    );
};
