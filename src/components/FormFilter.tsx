import React, {useState, useRef, useContext} from 'react';
import {GlobalContext} from './GlobalContext';

export const FormFilter = () => {
    const {dispatch,isDarkMode, turnOn, turnOff,searchContryName,filterCountryRegion, allCountries} = useContext(GlobalContext);
    
    const ref = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    function searchCountryByName(e: any) {
        dispatch({type: "search-country-name", searchContryName: e.target.value})
    }
    
    function filterByCountryRegion(e: any) {
        dispatch({type: "filter-country-region", filterCountryRegion: e.target.value})
    }
    return (
        <form>
            <div>
                <label>Country Name</label> 
                <input ref={ref} value={searchContryName} onChange={searchCountryByName} id="searchCountry" name="searchCountry" placeholder="Search for a country…"/>
            </div>
            <div>
                <select ref={selectRef} name="filterCountry" value={filterCountryRegion} onChange={filterByCountryRegion}>
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
