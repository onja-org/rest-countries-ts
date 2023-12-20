import styled from 'styled-components';
import SwitchMode from './SwitchMode';

const Header = () => {
    return (
        <HeaderStyled>
            <nav>
                <h1>Where in the world?</h1>
                <SwitchMode/>
            </nav>
        </HeaderStyled>
    )
}

export default Header;

const HeaderStyled = styled.header`
    font-family: 'Nunito Sans', sans-serif;
    box-shadow: 0 0.2rem 0.4rem 0 rgba(0,0,0,0.06);
    background-color: ${props => props.theme.colors.backgroundColor};
    position: sticky;
    top: 0px;
    z-index: 2;
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 5rem;
        @media (min-width: 1280px) {
        height: 98px;
        }
    }
    nav > h1 {
        font-size: 14px;
        line-height: 20px;
        font-style: normal;
        font-weight: 800;
        letter-spacing: 0;
        margin: 0;
        color: ${props => props.theme.colors.primary};
        @media (min-width: 1280px) {
            font-size: 24px;
            line-height: 32px;
        }
    }
  
}
`;