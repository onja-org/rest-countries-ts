import {createContext, useReducer, useEffect} from 'react';

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
    isDarkMode: boolean;
    turnOn: () => void;
    turnOff: () => void;
    dispatch: React.Dispatch<any>;
    allCountries: countryStateType[];
    searchContryName: countryStateType[];
    filterCountryRegion: countryStateType[];
}
export const initialValues: State = {
    isDarkMode: false,
    allCountries: [],
    searchContryName: [],
    filterCountryRegion: [],
    dispatch: () => {},
    turnOn: () => {},
    turnOff: () => {},
}
// type Action = | {type: "dark-mode-on"} | {type: "dark-mode-off"} | {type: "get-all-countries", allCountries: []} ;
type Action = 
| {type: "dark-mode-on"} 
| {type: "dark-mode-off"} 
| {type: "get-all-countries", allCountries: countryStateType[]} 
| {type: "search-country-name", searchContryName: countryStateType[]}
| {type: "filter-country-region", filterCountryRegion: countryStateType[]} ;
    
export const GlobalContext = createContext(initialValues);

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'dark-mode-on': {
            return {...state, isDarkMode: true}
        }
        case 'dark-mode-off': {
            return {...state, isDarkMode: false}
        }
        case 'get-all-countries': {
            return {
                ...state,
                allCountries: action.allCountries}
        }
        case 'search-country-name': {
            return { 
                ...state,
                allCountries: action.searchContryName}
        }
        case 'filter-country-region': {
            return { 
                ...state,
                allCountries: action.filterCountryRegion}
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
            turnOn: () => dispatch({type:'dark-mode-on'}),
            turnOff: () => dispatch({type:'dark-mode-off'}),
            isDarkMode: state.isDarkMode,
            dispatch,
            searchContryName: state.searchContryName,
            filterCountryRegion: state.filterCountryRegion,
            allCountries: state.allCountries
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider