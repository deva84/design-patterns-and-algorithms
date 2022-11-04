import {FC} from 'react';
import {useState, useEffect} from 'react';
import {StyledEngineProvider} from '@mui/material/styles';

import {Image, User, Account} from '../types';
import {Table, Filters, Sort, Search, Row} from './components';
import {getImages, getUsers, getAccounts} from './mocks/api';
import rows from './mocks/rows.json';

import styles from './App.module.scss';
import {dataConverter} from "./helpers/data-converter";
import {filter, FilterOption} from "./helpers/filter";
import {search} from "./helpers/search";
import {Order, sort} from "./helpers/sort";

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = [];

let initialState = [];

export const App: FC = () => {
    const [data, setData] = useState<Row[]>(initialState);

    useEffect(() => {
        // fetching data from API
        Promise.all([
            getImages(),
            getUsers(),
            getAccounts(),
        ]).then(([images, users, accounts]: [Image[], User[], Account[]]) => {
                initialState = dataConverter(images, users, accounts);
                setData(initialState);
            }
        );
    }, []);

    const filterHandler = (filterOptions: FilterOption[]): void => {
        const newState = filter(initialState, filterOptions);
        setData(newState);
    }

    const searchHandler = (searchString: string): void => {
        const newState = search(initialState, searchString);
        setData(newState);
    }

    const sortHandler = (order: Order): void => {
        const newState = sort(initialState, order);
        setData(newState);
    }

    return (
        <StyledEngineProvider injectFirst>
            <div className="App">
                <div className={styles.container}>
                    <div className={styles.sortFilterContainer}>
                        <Filters updateStore={filterHandler}/>
                        <Sort updateStore={sortHandler}/>
                    </div>
                    <Search updateStore={searchHandler}/>
                </div>
                <Table rows={data || mockedData}/>
            </div>
        </StyledEngineProvider>
    );
};
