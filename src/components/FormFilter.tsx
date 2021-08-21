import { useRef, useContext, useState} from 'react';
import {GlobalContext} from './GlobalContext';
import styled, {keyframes} from 'styled-components';
import SearcIcon from '../images/search-icon.svg';
export const FormFilter = () => {
    const {dispatch,searchContryName,filterCountryRegion} = useContext(GlobalContext);
    const [openDropdown, setOpenDropdown] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const regions = [{name: 'africa', id: '1'}, {name: 'america', id: '2'}, {name: 'asia', id: '3'}, {name: 'europe', id: '4'}, {name: 'oceania', id: '5'}]
    function searchCountryByName(e: any) {
        dispatch({type: "search-country-name", searchContryName: e.target.value})
    }
    
    function filterByCountryRegion(value: any) {
        dispatch({type: "filter-country-region", filterCountryRegion: value})
    }
    return (
        <Form>
            <Search>
                <label htmlFor="searchCountry">Country Name</label> 
                <input ref={ref} value={searchContryName} onChange={searchCountryByName} id="searchCountry" name="searchCountry" placeholder="Search for a country…"/>
            </Search>
            <DropDown onClick={() => setOpenDropdown(!openDropdown)}>
                <p>{filterCountryRegion ? filterCountryRegion.charAt(0).toUpperCase() + filterCountryRegion.slice(1) : 'Filter by Region'}</p>
                <RegionsList style={{display: openDropdown ? 'block' : 'none'}} id="filterCountry">
                    {regions.map(region => <li onClick={() => {
                        filterByCountryRegion(region.name)
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
`;
const Search = styled.div`
    display: grid;
    grid-template-columns: 18px auto;
    align-items: center;
    max-width: 480px;
    max-height: 56px;
    padding: 17px 32px;
    box-shadow: 0 0.2rem 0.9rem 0 rgb(0 0 0 / 5%);
    gap: 24px;
    border-radius: .5rem;

    label {
        display: block;
        content: '';
        background-image: url(${SearcIcon});
        background-repeat: no-repeat;
        background-size: 18px 18px;
        height: 18px;
        width: 18px;
        text-indent: -999rem;
        cursor: pointer;
    }
    input {
        width: 100%;
        border: none;
        outline: none;
    }
`;

const RegionsList = styled.ul`
    position: absolute;
    list-style: none;
    margin: 8px 0px 0px;
    padding: 16px 0px 16px 0px;
    display: none;
    width: -webkit-fill-available;
    max-width: 200px;
    animation: ${growDown} 300ms ease-in-out forwards;
    transform-origin: top center;
    transition: display 300ms;
    background-color: hsl(0, 0%, 100%);
    border-radius: .5rem;
    box-shadow: 0 0.2rem 0.9rem 0 rgb(0 0 0 / 5%);
    z-index: 3;
    cursor: default;
    li {
        font-weight: 500;
        margin: 0px 18px 8px 24px;
        text-transform: capitalize;
        cursor: pointer;
    }
    li:last-of-type {
        margin-bottom: 0;
    }
`;

const DropDown = styled.div`
    max-width: 200px;
    border-radius: .5rem;
    box-shadow: 0 0.2rem 0.9rem 0 rgb(0 0 0 / 5%);
    cursor: pointer;
    p {
        margin: 18px 18px 18px 24px;
        cursor: pointer;
    }
`;
