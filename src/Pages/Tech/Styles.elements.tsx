import styled from "styled-components/macro";
import { ReactComponent as P404 } from "../../assets/svg/404.svg";
import { ReactComponent as tech } from "../../assets/svg/tech.svg";

export const TechContainer = styled.div`
    width: 100%;
    max-width: 853px;
    margin: 0 auto;
    margin-bottom: 80px;
`;

export const TechHeader = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    min-height: 100px;
    margin: 0 auto;
`;

export const TechDescription = styled.div<{ bold?: boolean; }>`
    text-align: center;
    Font family: Roboto
    color: ${({ theme }) => theme.tech.color};
    font-weight: 400;
    width: 60%;
    margin: 0 auto;

    ${({ bold }) => {
        if (bold) {
            return `
               font-weight: 700;
               font-size: 2.20em;
            `;
        }
    }}
`;

export const TechLink = styled.a`
    color: #FF416E;
    text-decoration: underline;
`;

export const Page404 = styled(P404)`
    margin-bottom: 60px;
`;

export const Tech = styled(tech)`
    margin-bottom: 60px;
`;