import {createContext, useReducer, useEffect} from 'react';
import {themeTypes, CUSTOM_THEMES} from '../theme/index';
import restCountriesData from '../all-countries.json';
import { v4 as uuidv4 } from 'uuid';
import { GET_ALL_COUNTRIES, SEARCH_COUNTRY_NAME, FILTER_COUNTRY_REGION, SWITCH_THEME } from '../constants';
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
    searchCountryName: string;
    filterCountryRegion: string;
    theme: themeTypes,
}
export const initialValues: State = {
    allCountries: [],
    searchCountryName: '',
    filterCountryRegion: '',
    dispatch: () => {},
    theme: CUSTOM_THEMES.defaultMode,
}
type Action = 
| {type: typeof GET_ALL_COUNTRIES, allCountries: countryStateType[]} 
| {type: typeof SEARCH_COUNTRY_NAME, searchCountryName: string}
| {type: typeof FILTER_COUNTRY_REGION, filterCountryRegion: string}
| {type: typeof SWITCH_THEME, theme: themeTypes} 
    

export const GlobalContext = createContext(initialValues);

function reducer(state: State, action: Action) {
    switch (action.type) {
        case GET_ALL_COUNTRIES: {
            return {
                ...state,
                allCountries: action.allCountries}
        }
        case SEARCH_COUNTRY_NAME: {
            return { 
                ...state,
                searchCountryName: action.searchCountryName}
        }
        case FILTER_COUNTRY_REGION: {
            return { 
                ...state,
                filterCountryRegion: action.filterCountryRegion}
        }
        case SWITCH_THEME: {
            return { 
                ...state,
                theme: action.theme}
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
            const countries = data.length ? data : restCountriesData;
            const countriesWithIds = countries.map((country: any) => {
                return {...country, id: uuidv4()}
            })
			dispatch({type: GET_ALL_COUNTRIES, allCountries: countriesWithIds});
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
            searchCountryName: state.searchCountryName,
            filterCountryRegion: state.filterCountryRegion,
            allCountries: state.allCountries,
            theme: state.theme,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider