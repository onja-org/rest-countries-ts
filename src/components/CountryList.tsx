import {useContext} from 'react'
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
                    <CountryFlag>
                        <img src={country.flag}/>
                    </CountryFlag>
                    <AboutCountry>
                        <h2>{country.name}</h2>
                        <Strong>Population: <span>{country.population}</span></Strong>
                        <Strong>Region: <span>{country.region}</span></Strong>
                        <Strong>Capital: <span>{country.capital}</span></Strong>
                    </AboutCountry>
                </ListItemLink>
            ))
            }   
        </List>
    )
    
}

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 4rem;
    margin-top: 4.8rem;
    row-gap: 7.5rem;
    justify-content: center;
`;

const ListItemLink = styled(ReachRouterLink)`
    border-radius: 5px;
    text-decoration: none;
    box-shadow: 0 0 0.7rem 0.2rem rgb(0 0 0 / 3%);
    background-color: hsl(0, 0%, 100%);
    color: initial;
    max-width: 268px;
    img {
        width: 100%;
        border-radius: 5px 5px 0px 0px;
        height: 100%;
        object-fit: cover;
    }
`;

const CountryFlag = styled.div`
    height: 100%;
    max-height: 160px;
`;
const AboutCountry = styled.div`
    padding: 24px;
`;
const Strong = styled.strong`
    display: flex;
    flex-direction: row;
    span {
        font-size: 16px;
        font-weight: normal;
    }
`;
