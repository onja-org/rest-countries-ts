import React, {useContext} from 'react';
import GlobalContext from './GlobalContext';

const SwitchMode = () => {
    const {isDarkMode, turnOn, turnOff} = useContext(GlobalContext);
    return (
        <button onClick={isDarkMode ? turnOff : turnOn}>
            🌙 Dark Mode
        </button>
    )
}

export default SwitchMode