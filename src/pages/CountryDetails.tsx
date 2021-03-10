import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {GlobalContext} from '../components/GlobalContext';
import { Link as ReachRouterLink } from 'react-router-dom';
import styled from 'styled-components';

type ParamsType = {
    alpha3Code: string,
}

export default function CountryDetails() {
    const {allCountries} = useContext(GlobalContext);
    const {alpha3Code} = useParams<ParamsType>();

    const thisCountry = allCountries !== null && allCountries.find(country => country.alpha3Code === alpha3Code);
    console.log(thisCountry)
    return (
        <Frame>
            <BackLink to="/">Back</BackLink>
            {thisCountry && 
            <Container>
                <Figure>
                    <FlagImg src={thisCountry.flag}/>
                </Figure>
                <div>
                    <h2>{thisCountry.name}</h2>
                    <BaseNave>
                        <List>
                            <ListItem><BreakDown>Population: </BreakDown> <Value>{thisCountry.population}</Value></ListItem>
                            <ListItem><BreakDown>Region: </BreakDown> <Value>{thisCountry.region}</Value></ListItem>
                            <ListItem><BreakDown>Capital: </BreakDown> <Value>{thisCountry.capital}</Value></ListItem>
                        </List>
                        <List>
                            <ListItem><BreakDown>Top Level Domain: </BreakDown> <Value>{thisCountry.topLevelDomain.map((domain, index) => <i style={{fontStyle: 'normal'}} key={domain + index}>{domain}</i>)}</Value></ListItem>
                            <ListItem><BreakDown>Currencies: </BreakDown> <Value>{thisCountry.currencies.map(currency => <i style={{fontStyle: 'normal'}} key={currency.symbol}>{currency.name}</i>)}</Value></ListItem>
                            <ListItem><BreakDown>Languages: </BreakDown> <Value>{thisCountry.languages.map(language => <i style={{fontStyle: 'normal'}} key={language.name}>{language.name}</i>)}</Value></ListItem>
                        </List>
                    </BaseNave>
                    <div>
                        <BreakDown>Border Countries:</BreakDown> <BorderCountryFrame>{thisCountry.borders.map(border => <BorderCountryLink key={border} to={`/${border}`}>{allCountries?.filter(country => country.alpha3Code === border).map(item => item.name)}</BorderCountryLink>)}</BorderCountryFrame>
                    </div>
                </div>
            </Container>
            }
        </Frame>
    )
}
const Frame = styled.section`
    max-width: 90%;
    margin: auto;
`;
const Container = styled.div`
    /* margin-top: 8rem; */
    @media (min-width: 1080px) {
        display: flex;
        justify-content: space-between;
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
const BaseNave = styled.nav`
    display: inline-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
`;
const Figure = styled.figure`
    margin: 0;
    /* margin-top: 8rem; */
    text-align: center;
`;
const FlagImg = styled.img`
    width: 100%;
    height: auto;
    max-width: 560px;
    max-height: 375px;
    /* object-fit: cover; */
`;
const List = styled.ul`
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

const BreakDown = styled.strong`
    font-size: 16px;
    font-weight: 600;
    line-height: 3.2rem;
`;

const Value = styled.span`
    font-weight: 300;
    line-height: 3.2rem;
`;

const BorderCountryFrame = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
`;

const BorderCountryLink = styled(ReachRouterLink)`
    text-decoration: none;
    text-transform: capitalize;
    display: inline-flex;
    color: initial;
    padding: .6rem 2.4rem;
    background-color: #ffffff;
    box-shadow: 0 0 0.4rem 0.1rem rgba(17,21,23,0.25);
    margin: 1rem 0 0 1rem;
`;