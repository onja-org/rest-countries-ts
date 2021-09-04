import {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {GlobalContext} from '../components/GlobalContext';
import { Link as ReachRouterLink } from 'react-router-dom';
import styled from 'styled-components';
import {Main, CountryName, Heading, Value} from '../globalStyles'
type ParamsType = {
    alpha3Code: string,
}

export default function CountryDetails() {
    const {allCountries} = useContext(GlobalContext);
    const {alpha3Code} = useParams<ParamsType>();
    const thisCountry = allCountries !== null && allCountries.find(country => country.alpha3Code === alpha3Code);

    return (
        <Main>
            <BackLink to="/">Back</BackLink>
            {thisCountry && 
            <Container>
                <Figure>
                    <FlagImg src={thisCountry.flag}/>
                </Figure>
                <Detail>
                    <CountryName>{thisCountry.name}</CountryName>
                    <BaseNave>
                        <List>
                            <ListItem><Heading>Population: </Heading> <Value>{thisCountry.population}</Value></ListItem>
                            <ListItem><Heading>Region: </Heading> <Value>{thisCountry.region}</Value></ListItem>
                            <ListItem><Heading>Capital: </Heading> <Value>{thisCountry.capital}</Value></ListItem>
                        </List>
                        <List>
                            <ListItem><Heading>Top Level Domain: </Heading> <Value>{thisCountry.topLevelDomain.map((domain, index) => <i style={{fontStyle: 'normal'}} key={domain + index}>{domain}</i>)}</Value></ListItem>
                            <ListItem><Heading>Currencies: </Heading> <Value>{thisCountry.currencies.map(currency => <i style={{fontStyle: 'normal'}} key={currency.symbol}>{currency.name}</i>)}</Value></ListItem>
                            <ListItem><Heading>Languages: </Heading> <Value>{thisCountry.languages.map(language => <i style={{fontStyle: 'normal'}} key={language.name}>{language.name}</i>)}</Value></ListItem>
                        </List>
                    </BaseNave>
                    <BorderCountryFrame>
                        <Heading>Border Countries:</Heading>
                        <BorderCountryList>
                            {thisCountry.borders.length > 0 ? thisCountry.borders.map(border => 
                            <BorderCountryLink key={border} to={`/${border}`}>
                                {allCountries?.filter(country => country.alpha3Code === border).map(item => item.name)}
                            </BorderCountryLink>)
                            :
                            <Value>No border countries found for this country.</Value>
                            }
                        </BorderCountryList>
                    </BorderCountryFrame>
                </Detail>
            </Container>
            }
        </Main>
    )
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 560px;
    margin: auto;
    padding-top: 80px;
    padding-bottom: 80px;
    @media (min-width: 1281px) {
        flex-direction: row;
        max-width: unset;
        align-items: center;
        gap: 8rem;
    }
    div {
        text-align: left;
    }
`;

const BackLink = styled(ReachRouterLink)`
    text-decoration: none;
    width: 8rem;
    padding: .8rem 0;
    font-size: 16px;
    border-radius: .6rem;
    color: #000;
    margin-top: 4rem;
    align-items: center;
    display: inline-flex;
    border-radius: .2rem;
    justify-content: center;
    background-color: #ffffff;
    font-weight: 300;
    box-shadow: 0 0 0.7rem 0 rgba(0,0,0,0.29);
`;

const Figure = styled.figure`
    margin: 0;
    width: 100%;
    max-width: 560px;
    max-height: 400px;
`;

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 44px;
    width: 100%;
    gap: 32px;
    @media (min-width: 1281px) {
        margin-top: unset;
    }
`;

const BaseNave = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 32px;
    width: 100%;
    @media (min-width: 1281px) {
        gap: unset;
        flex-direction: row;
    }
`;
const FlagImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
`;
const ListItem = styled.li`
    list-style: none;
    display: flex;
    flex-direction: row;
    span {
        font-size: 16px;
        font-weight: normal;
    }
`;

const BorderCountryFrame = styled.div`
    @media (min-width: 1281px) {
        display: grid;
        grid-template-columns: max-content auto;
        align-items: baseline;
        gap: 18px;
    }
`;

const BorderCountryList = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10px;
`;



const BorderCountryLink = styled(ReachRouterLink)`
    text-decoration: none;
    text-transform: capitalize;
    display: inline-flex;
    color: initial;
    padding: .6rem 2.4rem;
    background-color: #ffffff;
    box-shadow: 0 0 0.4rem 0.1rem rgba(17,21,23,0.25);
`;