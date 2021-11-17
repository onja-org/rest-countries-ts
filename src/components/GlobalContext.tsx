import {createContext, useReducer, useEffect} from 'react';
import {themeTypes, CUSTOM_THEMES} from '../theme/index';
import restcountriesData from '../all-countries.json';
import { v4 as uuidv4 } from 'uuid';
const REST_COUNTRIES_V2_API_ENDPOINT = `https://restcountries.com/v3.1/all`;

type countryStateType = {
    altSpellings:[string],
    area: number,
    borders: [string],
    capital: string,
    cca2: string,
    cca3: string,
    ccn3: string,
    cioc: string,
    currencies: {ALL: {name: string,symbol: string}},
    demonyms: {
        eng: {f: string,m: string},
        fra: {f: string,m: string},
    },
    flag: string,
    flags: {png: string, svg: string},
    idd: {root: string, suffixes: [string]},
    independent: boolean,
    landlocked: boolean,
    languages: {sqi: string,},
    latlng: [number],
    maps: {googleMaps: string, openStreetMaps: string},
    name: {
        common: string, 
        nativeName: {
            sqi: {
                common: string,
                official: string
                }
            }
    },
    population: number,
    region: string,
    status: string,
    subregion: string,
    tld: [string],
    translations: object, 
    id: number,
}

interface State {
    dispatch: React.Dispatch<any>;
    allCountries: countryStateType[];
    searchContryName: string;
    filterCountryRegion: string;
    theme: themeTypes,
    countryId: string,
}
export const initialValues: State = {
    allCountries: [],
    searchContryName: '',
    filterCountryRegion: '',
    dispatch: () => {},
    theme: CUSTOM_THEMES.defaultMode,
    countryId: '',
}
type Action = 
| {type: "get-all-countries", allCountries: countryStateType[]} 
| {type: "search-country-name", searchContryName: ''}
| {type: "filter-country-region", filterCountryRegion: ''}
| {type: "switch-theme", theme: themeTypes} 
| {type: "set-country-id", countryId: ''};
    

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
        case 'set-country-id': {
            return { 
                ...state,
                countryId: action.countryId}
        }
        default:
            return state;
    }
}

export const GlobalProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialValues);
    
    async function fetchAllCountries() {
		const res = await fetch(REST_COUNTRIES_V2_API_ENDPOINT);
		try {
			const data = await res.json();
            const countries = data.length ? data : restcountriesData;
            const countriesWithIds = countries.map((country: any) => {
                return {...country, id: uuidv4()}
            })
			dispatch({type: 'get-all-countries', allCountries: countriesWithIds});
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
            theme: state.theme,
            countryId: state.countryId,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider