import styled from 'styled-components';

export const Space = styled.div<{gap?: number, justify?: string}>`
display: flex;
justify-content: ${props => props.justify ? props.justify : 'flex-start'};
gap: ${props => props.gap ? `${props.gap}px` : '10px'};
`;