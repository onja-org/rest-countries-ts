import {useContext} from 'react'
import { GlobalContext } from './GlobalContext';
import styled from 'styled-components';
import { Link as ReachRouterLink } from 'react-router-dom';
import {CountryName, Heading, Value} from '../globalStyles';

export default function CountryList() {
    const {allCountries, searchContryName,filterCountryRegion, dispatch} = useContext(GlobalContext);
    
    return (
    <Section>
        <List>
            {allCountries?.filter(country => country.name?.common.toLocaleLowerCase().includes(searchContryName.toLocaleLowerCase()) 
            && country.region.toLocaleLowerCase().includes(filterCountryRegion.toLocaleLowerCase())).map(country => (
                <ItemLink onClick={() => dispatch({type: "set-country-id", countryId: country.id})} to={`/${country.id}`} key={country.id}>
                    <CountryFlag>
                        <img src={country.flags.png} alt='country flag'/>
                    </CountryFlag>
                    <AboutCountry>
                        <CountryName>{country.name.common}</CountryName>
                        <BreakDown>
                            <Heading>Population:</Heading>
                            <Value>{country.population}</Value>
                        </BreakDown>
                        <BreakDown>
                            <Heading>Region:</Heading>
                            <Value>{country.region}</Value>
                        </BreakDown>
                       <BreakDown>
                            <Heading>Capital:</Heading>
                            <Value>{country.capital}</Value>
                       </BreakDown>
                    </AboutCountry>
                </ItemLink>
            ))
            }   
        </List>
    </Section>
    )
    
}

const Section = styled.section`
    padding-bottom: 4.5rem;
`;

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin-top: 4.8rem;
    column-gap: 40px;
    padding: 0;
    row-gap: 40px;
    justify-content: center;
    @media(min-width: 1280px) {
        justify-content: space-between;
    }

`;

const ItemLink = styled(ReachRouterLink)`
    border-radius: 5px;
    text-decoration: none;
    box-shadow: 0 0 0.7rem 0.2rem rgb(0 0 0 / 3%);
    background-color: ${props => props.theme.colors.backgroundColor};
    color: ${props => props.theme.colors.primary};
    width: 100%;
    max-width: 268px;
    @media (max-width: 400px) {
        height: 363px;
    }
    img {
        width: 100%;
        border-radius: 5px 5px 0px 0px;
        height: 100%;
        object-fit: cover;
    }
    &:hover {
        position: relative;
        bottom: 1px;
    }
`;

const CountryFlag = styled.div`
    height: 100%;
    max-height: 160px;
`;
const AboutCountry = styled.div`
    margin: 24px;
    & > h2 {
        font-size: 18px;
        margin-bottom: 16px;
    }
`;

const BreakDown = styled.div`
    display: flex;
    flex-direction: row;
`;