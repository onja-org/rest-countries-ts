import {useContext} from 'react';
import {GlobalContext} from './GlobalContext';
import styled from 'styled-components';
import { CUSTOM_THEMES} from '../theme';
import {ReactComponent as Moon} from '../images/moon.svg';

const SwitchMode = () => {
    const { dispatch, theme} = useContext(GlobalContext);
    const switchTheme = () => {
        dispatch({type: 'switch-theme', theme: theme.name === 'dark' ? CUSTOM_THEMES.defaultMode : CUSTOM_THEMES.nightMode});
    }
    return (
        <Button onClick={switchTheme}>
            <Moon/><span>{theme.name === 'dark' ? 'Light Mode' : 'Dark Mode'} </span>
        </Button>
    )
}

export default SwitchMode

const Button = styled.button` 
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    letter-spacing: 0;
    line-height: 16px;
    border: none;
    background: none;
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
    @media (min-width: 1280px) {
        font-size: 16px;
        line-height: 22px;
    }

    svg {
        margin-right: 12px;
        width: 20px;
        height: 20px;
        fill: ${props => props.theme.name === 'light' ? 'none' : '#FFF'};
    }
`;