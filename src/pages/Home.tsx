import React from 'react';
import styled from 'styled-components';
import CountryList from '../components/CountryList';
import {FormFilter} from '../components/FormFilter';
import {Main} from '../globalStyles'
export default function Home() {
    return (
        <Main>
            <FormFilter/>
            <CountryList/>
        </Main>
    )
}

