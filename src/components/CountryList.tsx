import React, {useContext} from 'react'
import { GlobalContext } from './GlobalContext';
import styled from 'styled-components';
import { Link as ReachRouterLink } from 'react-router-dom';
export default function CountryList() {
    // alpha3Code
    const {allCountries} = useContext(GlobalContext);
    console.log("sc",allCountries)
    return (
        <List>
            {allCountries ? allCountries.map(country => (
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
            )): ''
            }   
        </List>
    )
    
}

const List = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 762px) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 32px;

        img {
            max-height: 200px;
            min-height: 100%;
        }
    }
`;

const ListItemLink = styled(ReachRouterLink)`
    border-radius: 6px;
    text-decoration: none;
    color: initial;
    img {
        max-width: 100%;
        min-width: 100%;
        max-height: auto;
        border-radius: 6px 6px 0px 0px;
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
