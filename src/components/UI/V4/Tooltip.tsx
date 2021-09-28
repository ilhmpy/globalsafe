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
    bottom: 36px;
    
    ${props => props.direction === 'right' ? 'left: -10px;' : 'right: -10px;'}
    z-index: 999;

    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #EDF0F7;
    padding: 12px 20px;

    &::after {
        content: "";
        position: absolute;
       

        ${props => props.direction === 'right' ? 'left: 13px;' : 'right: 13px;'}
        left: 13px;
        bottom: -8px;
        transform: rotate(316deg);
        background-color: ${props => props.theme.white};
        width: 14px;
        height: 14px;
        border-bottom: 1px solid #EDF0F7;
        border-left: 1px solid #EDF0F7;
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