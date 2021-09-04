import styled from "styled-components";

export const Main = styled.main`
    max-width: 90%;
    min-width: 90%;
    margin: auto;

    @media (min-width: 1281px) {
      max-width: 1240px;
      min-width: 1240px;
    }
`;

export const CountryName = styled.h2`
    font-family:  'Nunito Sans';
    font-size: 22px;
    font-style: normal;
    font-weight: 800;
    line-height: 30px;
    margin: 0;
    color:hsl(200, 15%, 8%);
    @media (min-width: 1281px) {
        font-size: 32px;
        line-height: 43px;
    }
`;

export const Heading = styled.strong`
    font-style: normal;
    font-size: 14px;
    font-weight: 600;
    line-height: 32px;
    @media (min-width: 1281px) {
        font-size: 16px;
    }
`;

export const Value = styled.p`
    font-size; 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 32px;
    margin: 0;
    margin-left: 8px;
    color: #111517;
    @media (min-width: 1281px) {
        font-size: 16px;
    }
`;