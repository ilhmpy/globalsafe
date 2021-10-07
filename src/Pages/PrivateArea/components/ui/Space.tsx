import styled from 'styled-components';

export const Space = styled.div<{gap?: number, justify?: string, mb?: number; column?: boolean;}>`
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
    gap: ${props => props.gap ? `${props.gap}px` : '10px'};
    margin-bottom: ${props => props.mb ? props.mb : 0}px;
`;