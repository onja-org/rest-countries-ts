import { useRef, useContext, useState} from 'react';
import {GlobalContext} from './GlobalContext';
import styled, {keyframes} from 'styled-components';
import {ReactComponent as SearchIcon} from '../images/search-icon.svg';
import {ReactComponent as DownArrow} from '../images/down-arrow.svg';
import { FILTER_COUNTRY_REGION, SEARCH_COUNTRY_NAME } from '../constants';

export const FormFilter = () => {
    
    const {dispatch,searchCountryName,filterCountryRegion} = useContext(GlobalContext);
    const [openDropdown, setOpenDropdown] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const regions = [{name: 'africa', id: '1'}, {name: 'america', id: '2'}, {name: 'asia', id: '3'}, {name: 'europe', id: '4'}, {name: 'oceania', id: '5'}, {name: 'none', id: '6'}]
    function searchCountryByName(e: any) {
        dispatch({type: SEARCH_COUNTRY_NAME, searchCountryName: e.target.value})
    }
    
    function filterByCountryRegion(value: any) {
        dispatch({type: FILTER_COUNTRY_REGION, filterCountryRegion: value})
    }
    return (
        <Form>
            <Search>
                <label htmlFor="searchCountry"><SearchIcon/> </label>
                <input autoComplete="off" ref={ref} value={searchCountryName} onChange={searchCountryByName} id="searchCountry" name="searchCountry" placeholder="Search for a country…"/>
            </Search>
            <DropDown onClick={() => setOpenDropdown(!openDropdown)}>
                <p>
                    <span>{filterCountryRegion ? filterCountryRegion.charAt(0).toUpperCase() + filterCountryRegion.slice(1) : 'Filter by Region'}</span>
                    <DownArrow/>
                </p>
                <RegionsList style={{display: openDropdown ? 'block' : 'none'}} id="filterCountry">
                    {regions.map(region => <li onClick={() => {
                        filterByCountryRegion(region.name === 'none' ? '' : region.name)
                        setOpenDropdown(false)
                    }} key={region.id}>{region.name}</li>)}
                </RegionsList>
            </DropDown>
        </Form>
    )
}

const growDown = keyframes`
    0% {
        transform: scaleY(0)
    }
    80% {
        transform: scaleY(1.1)
    }
    100% {
        transform: scaleY(1)
    }

`;
const Form = styled.form`
    margin-top: 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 40px;
    @media (min-width: 1280px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;
const Search = styled.div`
    display: grid;
    grid-template-columns: 18px auto;
    align-items: center;
    max-width: 416px;
    max-height: 56px;
    padding: 17px 32px;
    box-shadow: 0 0.2rem 0.9rem 0 rgb(0 0 0 / 5%);
    gap: 24px;
    border-radius: .5rem;
    background-color: ${props => props.theme.colors.backgroundColor};
    @media (min-width: 1280px) {
        width: 416px;
    }
    label {
        display: block;
        height: 18px;
        width: 18px;
        cursor: pointer;
        svg > g {
            fill: ${props => props.theme.colors.secondary};
        }
    }
    input {
        width: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        color: ${props => props.theme.colors.secondary};
    }
    input::placeholder {
        color: ${props => props.theme.colors.secondary};
    }
`;

const RegionsList = styled.ul`
    position: absolute;
    list-style: none;
    margin: 8px 0px 0px;
    padding: 16px 0px 16px 0px;
    display: none;
    width: -webkit-fill-available;
    width: inherit;
    max-width: 200px;
    animation: ${growDown} 300ms ease-in-out forwards;
    transform-origin: top center;
    transition: display 300ms;
    background-color: ${props => props.theme.colors.backgroundColor};
    border-radius: .5rem;
    box-shadow: 0 0.2rem 0.9rem 0 rgb(0 0 0 / 5%);
    z-index: 3;
    cursor: default;
    li {
        font-weight: 500;
        margin: 0px 18px 8px 24px;
        text-transform: capitalize;
        cursor: pointer;
        color: ${props => props.theme.colors.primary};
    }
    li:last-of-type {
        margin-bottom: 0;
    }
`;

const DropDown = styled.div`
    width: 200px;
    max-width: 200px;
    border-radius: .5rem;
    box-shadow: 0 0.2rem 0.9rem 0 rgb(0 0 0 / 5%);
    cursor: pointer;
    background-color: ${props => props.theme.colors.backgroundColor};
    p {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 18px 18px 18px 24px;
        cursor: pointer;
        color: ${props => props.theme.colors.primary};
    }
    svg {
        width: 14px;
    }
`;
