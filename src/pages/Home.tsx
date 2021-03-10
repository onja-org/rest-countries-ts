import React from 'react';
import CountryList from '../components/CountryList';
import {FormFilter} from '../components/FormFilter';
export default function Home() {
    return (
        <div>
            <FormFilter/>
            <CountryList/>
        </div>
    )
}
