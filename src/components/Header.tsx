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
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 5rem;
        @media (min-width: 1281px) {
        height: 8rem;
        }
    }
    nav > h1 {
        font-size: 18px;
        line-height: 2rem;
        letter-spacing: 0;
        margin: 0;
        @media (min-width: 1281px) {
            font-size: 36px;
            line-height: 3.2rem;
        }
    }
  
}
`;