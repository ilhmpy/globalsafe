import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const RadioLabel = styled.label<{active: boolean;}>`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s;

    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    background: ${props => props.active ? '#0094FF' : '#F9FAFB'};
    color: ${props => props.active ? props.theme.white : props.theme.black};
    border: 1px solid ${props => props.active ? '#0094FF' : '#F9FAFB'};
`;

const RadioInput = styled.span`
    
`;

interface RadioProps {
    className?: string;
    value: string;
    name: string;
    checked: boolean;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio = ({
    className,
    value,
    name,
    checked,
    label,
    onChange,
}: RadioProps) => {
    return (
        <RadioLabel className={className} active={checked}>
            <input 
                hidden
                type="radio" 
                value={value} 
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <RadioInput>{label}</RadioInput>
        </RadioLabel>
    )
};

Radio.Group = Group;