import React, {useContext} from 'react'
import { GlobalContext } from './GlobalContext';
import styled from 'styled-components';
import { Link as ReachRouterLink } from 'react-router-dom';
export default function CountryList() {
    const {allCountries, searchContryName,filterCountryRegion} = useContext(GlobalContext);
    
    return (
        <List>
            {allCountries?.filter(country => country.name.toLocaleLowerCase().includes(searchContryName.toLocaleLowerCase()) 
            && country.region.toLocaleLowerCase().includes(filterCountryRegion.toLocaleLowerCase())).map(country => (
                <ListItemLink to={`/${country.alpha3Code}`} key={country.alpha2Code}>
                    <div>
                        <img src={country.flag}/>
                    </div>
                    <div>
                        <h2>{country.name}</h2>
                        <Strong>Population: <span>{country.population}</span></Strong>
                        <Strong>Region: <span>{country.region}</span></Strong>
                        <Strong>Capital: <span>{country.capital}</span></Strong>
                    </div>
                </ListItemLink>
            ))
            }   
        </List>
    )
    
}

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 264px);
    column-gap: 4rem;
    margin-top: 4.8rem;
    row-gap: 7.5rem;
    justify-content: center;
    
`;

const ListItemLink = styled(ReachRouterLink)`
    border-radius: 5px;
    text-decoration: none;
    box-shadow: 0 0 0.7rem 0.2rem rgba(0,0,0,0.03);
    color: initial;
    max-width: 128rem;
    img {
        max-width: 100%;
        min-width: 100%;
        max-height: auto;
        border-radius: 5px 5px 0px 0px;
    }

    @media (min-width: 1080px) {
        img {
            max-height: 200px;
            min-height: 100%;
        }
    }
`;

const Strong = styled.strong`
    display: flex;
    flex-direction: row;
    span {
        font-size: 16px;
        font-weight: normal;
    }
`;
