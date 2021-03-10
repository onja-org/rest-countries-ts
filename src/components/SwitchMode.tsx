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
    font-size: 1.2rem;
    letter-spacing: 0;
    line-height: 1.6rem;
    border: none;
    background: none;
    cursor: pointer;
    @media (min-width: 1080px) {
        font-size: 1.6rem;
        line-height: 2.2rem;
    }
`;