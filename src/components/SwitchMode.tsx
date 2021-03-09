import React, {useContext} from 'react';
import {GlobalContext} from './GlobalContext';

const SwitchMode = () => {
    // const {isDarkMode, turnOn, turnOff} = useContext(GlobalContext);
    return (
        <button >
            {/* {isDarkMode ? '⛅ Light Mode' : '🌙 Dark Mode'}  */}
            Dark mode
        </button>
    )
}

export default SwitchMode