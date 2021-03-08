import {createContext, useReducer} from 'react';

type initialStateType = {
    isDarkMode: boolean,
    turnOn: () => void,
    turnOff: () => void,
}
export const initialValues: initialStateType = {
    isDarkMode: true,
    turnOn: () => {},
    turnOff: () => {},
}

export const GlobalContext = createContext(initialValues);


type State = {
    isDarkMode: boolean;
}

type Action = | {type: "dark-mode-on"} | {type: "dark-mode-off"} ;
    

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'dark-mode-on':
            return {isDarkMode: true}
        case 'dark-mode-off': 
            return {isDarkMode: false}
        default:
            return state;
    }
}

export const GlobalProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialValues);
    
    return (
        <GlobalContext.Provider value={{
            turnOn: () => dispatch({type: 'dark-mode-on'}),
            turnOff: () => dispatch({type: 'dark-mode-off'}),
            isDarkMode: state.isDarkMode
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider