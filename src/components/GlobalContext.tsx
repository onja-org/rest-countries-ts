import {createContext, useReducer, useEffect} from 'react';
import {themeTypes, CUSTOM_THEMES} from '../theme/index'
type countryStateType = {
    alpha2Code: string,
    alpha3Code: string,
    altSpellings:[string],
    area: number,
    borders: [string],
    callingCodes: [string],
    capital: string,
    cioc: string,
    currencies: [{code: string, name: string, symbol: string}],
    demonym: string,
    flag: string,
    gini: number,
    languages: [{iso639_1: string, iso639_2: string, name: string, nativeName: string}],
    latlng: [number],
    name: string,
    nativeName: string,
    numericCode: string,
    population: number,
    region: string,
    regionalBlocs: [object],
    subregion: string,
    timezones: [string]
    topLevelDomain: [string]
    translations: object, 
}

interface State {
    dispatch: React.Dispatch<any>;
    allCountries: countryStateType[];
    searchContryName: string;
    filterCountryRegion: string;
    theme: themeTypes
}
export const initialValues: State = {
    allCountries: [],
    searchContryName: '',
    filterCountryRegion: '',
    dispatch: () => {},
    theme: CUSTOM_THEMES.defaultMode,
}
type Action = 
| {type: "get-all-countries", allCountries: countryStateType[]} 
| {type: "search-country-name", searchContryName: ''}
| {type: "filter-country-region", filterCountryRegion: ''}
| {type: "switch-theme", theme: themeTypes} ;
    
export const GlobalContext = createContext(initialValues);

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'get-all-countries': {
            return {
                ...state,
                allCountries: action.allCountries}
        }
        case 'search-country-name': {
            return { 
                ...state,
                searchContryName: action.searchContryName}
        }
        case 'filter-country-region': {
            return { 
                ...state,
                filterCountryRegion: action.filterCountryRegion}
        }
        case 'switch-theme': {
            return { 
                ...state,
                theme: action.theme}
        }
        default:
            return state;
    }
}
const url = 'https://restcountries.eu/rest/v2/all';

export const GlobalProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialValues);
    
    async function fetchAllCountries() {
		const res = await fetch(url);
		try {
			const data = await res.json();
			dispatch({type: 'get-all-countries', allCountries: data});
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		fetchAllCountries();
	}, []);

    return (
        <GlobalContext.Provider value={{
            dispatch,
            searchContryName: state.searchContryName,
            filterCountryRegion: state.filterCountryRegion,
            allCountries: state.allCountries,
            theme: state.theme
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider