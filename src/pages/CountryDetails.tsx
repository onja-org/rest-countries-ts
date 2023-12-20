import {useContext} from 'react';
import {GlobalContext} from '../components/GlobalContext';
import { Link as ReachRouterLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {ReactComponent as BackArrow} from '../images/back-arrow.svg';
import {Main, CountryName, Heading, Value} from '../globalStyles';

export default function CountryDetails() {
    const {allCountries} = useContext(GlobalContext);
    const {countryId}: {countryId: string} = useParams();

    const thisCountry = allCountries !== null && allCountries.find(country => country.id.toString() === countryId);
    
    const nativeName = thisCountry && (Object.values(thisCountry?.name.nativeName)[1] ? <Value>{Object.values(thisCountry?.name.nativeName)[1].common}</Value> : Object.values(thisCountry?.name.nativeName).map(obj => <Value key={obj.official}>{obj.common}, </Value>))
    return (
        <Main>
            <BackLink to="/">
                <BackArrow/>
                <span>Back</span>
            </BackLink>
            {thisCountry && 
            <Container>
                <Figure>
                    <FlagImg src={thisCountry?.flags?.png}/>
                </Figure>
                <Detail>
                    <CountryName>{thisCountry?.name?.common}</CountryName>
                    <BaseNave>
                        <List>
                        <ListItem><Heading>Native Name: </Heading>{nativeName}</ListItem>
                            <ListItem><Heading>Population: </Heading> <Value>{thisCountry?.population}</Value></ListItem>
                            <ListItem><Heading>Region: </Heading> <Value>{thisCountry?.region}</Value></ListItem>
                            <ListItem><Heading>Sub Region: </Heading> <Value>{thisCountry?.subregion}</Value></ListItem>
                            <ListItem><Heading>Capital: </Heading> <Value>{thisCountry?.capital}</Value></ListItem>
                        </List>
                        <List>
                            <ListItem><Heading>Top Level Domain: </Heading> <Value>{thisCountry?.tld.map((domain, index) => <i style={{fontStyle: 'normal'}} key={domain + index}>{domain}</i>)}</Value></ListItem>
                            <ListItem><Heading>Currencies: </Heading> <Value>{Object.values(thisCountry?.currencies).map(currency => <i style={{fontStyle: 'normal'}} key={currency.symbol}>{currency.name}</i>)}</Value></ListItem>
                            <ListItem><Heading>Languages: </Heading> <Value>{Object.values(thisCountry?.languages).map(language => <i style={{fontStyle: 'normal'}} key={language}>{language}, </i>)}</Value></ListItem>
                        </List>
                    </BaseNave>
                    <BorderCountryFrame>
                        <Heading>Border Countries:</Heading>
                        <BorderCountryList>
                            {thisCountry?.borders?.length > 0 ? thisCountry.borders.map(border => {
                            const thisBorderCountry = allCountries.find(country => country.cca3 === border);
                            return <BorderCountryLink 
                                        key={border} 
                                        to={`/${thisBorderCountry && thisBorderCountry?.id}`}
                                    >
                                    {allCountries?.filter(country => country.cca3 === border).map(item => item.name.common)}
                                </BorderCountryLink>
                            })
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
    @media (min-width: 1280px) {
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
    color: ${props => props.theme.colors.primary};
    margin-top: 4rem;
    align-items: center;
    display: inline-flex;
    border-radius: .2rem;
    justify-content: center;
    background-color: ${props => props.theme.colors.backgroundColor};
    font-weight: 300;
    box-shadow: 0 0 0.7rem 0 rgba(0,0,0,0.29);

    svg {
        width: 20px;
        margin-right: 16px;
    }
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
    @media (min-width: 1280px) {
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
    @media (min-width: 1280px) {
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
    @media (min-width: 1280px) {
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
    color: ${props => props.theme.colors.primary};
    padding: .6rem 2.4rem;
    background-color: ${props => props.theme.colors.backgroundColor};
    box-shadow: 0 0 0.4rem 0.1rem rgba(17,21,23,0.25);
`;