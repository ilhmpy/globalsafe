import React from 'react';
import styled from 'styled-components';

import { ButtonProps } from './';

export const PrimaryButton = ({
    className,
    title,
    onClick,
    disabled = false,
    loading = false,
    type = 'button',
    block = false,
}: ButtonProps) => {
    return (
        <Primary
            className={className}
            disabled={disabled}
            onClick={onClick}
            type={type}
            block={block}
        >
            <PrimaryTitle>{title}</PrimaryTitle>
        </Primary>
    )
};

PrimaryButton.defaultProps = {
    // eslint-disable-next-line
    onClick: () => {},
}

const BaseButton = styled.button<{block?: boolean}>`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    transition: ease-in .1s;
    width: ${props => props.block ? '100%' : 'auto'};

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.2;
    }
`;

const Primary = styled(BaseButton)`
    background-color: ${props => props.theme.blue};
`;

const PrimaryTitle = styled.span`
    color: ${props => props.theme.white};
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
`;