import React, {useState, useRef, useContext} from 'react';
import {GlobalContext} from './GlobalContext';

export const FormFilter = () => {
    const {dispatch,isDarkMode, turnOn, turnOff, allCountries} = useContext(GlobalContext);
    // const {dispatch, allCountries} = useContext(GlobalContext);

    const [countryName, setCountryName] = useState('');
    
    const ref = useRef<HTMLInputElement>(null);
    function searchCountryByName(e: any) {
        setCountryName(e.target.value);
        const filteredCountries = allCountries?.filter(country => country.name.toLocaleLowerCase().includes(countryName.toLocaleLowerCase()));
        dispatch({type: "search-country-name", searchContryName: filteredCountries})
    }
    console.log("ref", countryName);
    return (
        <form>
            <div>
                <label>Country Name</label> 
                <input ref={ref} value={countryName} onChange={searchCountryByName} id="searchCountry" name="searchCountry" placeholder="Search for a country…"/>
            </div>
            <div>
                <select name="filterCountry">
                    <option value="">Filter by Region</option>
                    <option value="africa">Africa</option>
                    <option value="america">America</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>
        </form>
    )
}
