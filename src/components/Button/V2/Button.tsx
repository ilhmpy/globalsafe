import styled from 'styled-components/macro';

type Props = {
  primary?: boolean;
  yellow?: boolean;
};

export const Button = styled.a<Props>`
  font-size: 12px;
  font-weight: 500;
  padding: 12px 20px 11px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 14px;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  user-select: none;
  border-radius: 4px;
  border: none;
  transition: all 0.3s ease 0s;
  background: #515172;
  color: #ffffff;
  &:hover {
    box-shadow: 0px 4px 10px ${(props) => props.theme.buttonBorder};
    border-color: ${(props) => props.theme.buttonBorder};
  }
  &:focus,
  &:active {
    outline: none;
  }
  ${(props) => {
    if (props.primary) {
      return `
        background: #0094FF;
      `;
    }
    if (props.yellow) {
      return `
    background: #F6B817;
    color: #0E0D3D;
    `;
    }
  }}
`;
