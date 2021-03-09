import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {GlobalContext} from '../components/GlobalContext';
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
        <div>
            {thisCountry && 
            <>
                <div>
                    <FlagImg src={thisCountry.flag}/>
                </div>
                <div>
                    <h2>{thisCountry.name}</h2>
                    <div>
                        <div>
                            <Strong>Population: <span>{thisCountry.population}</span></Strong>
                            <Strong>Region: <span>{thisCountry.region}</span></Strong>
                            <Strong>Capital: <span>{thisCountry.capital}</span></Strong>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    )
}

const FlagImg = styled.img`
    max-width: 100%;
    min-width: 100%;
    max-height: auto;
`;

const Strong = styled.strong`
    display: flex;
    flex-direction: row;
    span {
        font-size: 16px;
        font-weight: normal;
    }
`;