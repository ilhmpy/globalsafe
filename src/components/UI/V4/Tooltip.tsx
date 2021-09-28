import React, { useCallback, useState } from 'react';
import styled from 'styled-components';



interface TooltipProps {
    className?: string;
    children: React.ReactNode;
    label?: string;
    renderLabel?: () => React.ReactNode;
    direction: 'left' | 'right';
}

export const Tooltip = ({
    className,
    children,
    label,
    renderLabel,
    direction = 'right'
}: TooltipProps) => {
    const [show, setShow] = useState(false);

    const handleShow = useCallback(() => {
        setShow(true);
    }, []);

    const handleHide = useCallback(() => {
        setShow(false);
    }, []);

    return (
        <Wrapper 
            className={className}
            onMouseOver={handleShow}
            onMouseLeave={handleHide}
        >
            {
                show && (
                    <TooltipContainer direction={direction}>
                        {label && <TooltipText>{label}</TooltipText>}
                        {renderLabel && <TooltipText>{renderLabel()}</TooltipText>}
                    </TooltipContainer>
                )
            }

            {children}
        </Wrapper>
    )
};

Tooltip.defaultProps = {
    direction: 'right'
}

const Wrapper = styled.div`
    position: relative;
`;

const TooltipContainer = styled.div<{direction: 'left' | 'right'}>`
    position: absolute;
    bottom: 32px;
    
    ${props => props.direction === 'right' ? 'left: -10px;' : 'right: -10px;'}
    z-index: 999;

    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #EDF0F7;
    padding: 12px 20px;

    &::after {
        content: "";
        position: absolute;
        width: 0px;
        height: 0px;
        border-width: 7px;
        border-style: solid;
        border-color: transparent #fff transparent transparent;
        ${props => props.direction === 'right' ? 'left: 12px;' : 'right: 12px;'}
        bottom: -14px;
        transform: rotate(270deg);
  }
`;

const TooltipText = styled.div`
    color: #3F3E4E;
    word-break: normal;
    white-space: nowrap;
    font-size: 12px;
    line-height: 20px;
`;

const ChildrenContainer = styled.div`
    
`;