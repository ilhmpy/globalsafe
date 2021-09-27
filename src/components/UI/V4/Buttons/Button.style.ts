import styled from 'styled-components';

export const BaseButton = styled.button<{block?: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    transition: ease-in .1s;
    padding-left: 20px;
    padding-right: 20px;
    width: ${props => props.block ? '100%' : 'auto'};

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.2;
    }
`;


export const Title = styled.span`
    color: ${props => props.theme.white};
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
`;
