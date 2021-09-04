import React, {useContext} from 'react';
import {GlobalContext} from './GlobalContext';
import styled from 'styled-components';

const SwitchMode = () => {
    const {isDarkMode, turnOn, turnOff} = useContext(GlobalContext);
    return (
        <Button onClick={() => isDarkMode ? turnOff() : turnOn()}>
            {isDarkMode ? '⛅ Light Mode' : '🌙 Dark Mode'} 
        </Button>
    )
}

export default SwitchMode

const Button = styled.button` 
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 16px;
    border: none;
    background: none;
    cursor: pointer;
    @media (min-width: 1281px) {
        font-size: 16px;
        line-height: 22px;
    }
`;