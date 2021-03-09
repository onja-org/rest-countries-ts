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
    currencies: [object],
    demonym: string,
    flag: string,
    gini: number,
    languages: [object],
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
    // isDarkMode: boolean;
    // turnOn: () => {};
    // turnOff: () => {};
    allCountries: countryStateType[];
}
export const initialValues: State = {
    // isDarkMode: false,
    allCountries: [],
}
// type Action = | {type: "dark-mode-on"} | {type: "dark-mode-off"} | {type: "get-all-countries", allCountries: []} ;
type Action = | {type: "get-all-countries", allCountries: []} ;
    
export const GlobalContext = createContext(initialValues);

function reducer(state: State, action: Action) {
    switch (action.type) {
        // case 'dark-mode-on':
        //     return {isDarkMode: true}
        // case 'dark-mode-off': 
        //     return {isDarkMode: false}
        case 'get-all-countries': 
            return {allCountries: action.allCountries}
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
            // turnOn: () => dispatch({type:'dark-mode-on'}),
            // turnOff: () => dispatch({type:'dark-mode-off'}),
            // isDarkMode: state.isDarkMode,
            allCountries: state.allCountries
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider