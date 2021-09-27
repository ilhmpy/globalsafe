import styled from 'styled-components/macro';

type Props = {
  primary?: boolean;
  yellow?: boolean;
  bigSize?: boolean;
  outlinePrimary?: boolean;
  fullWidth?: boolean;
};

export const Button = styled.a<Props>`
  padding: 12px 20px 11px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  user-select: none;
  border-radius: 4px;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  font-weight: 500;
  font-size: ${(props) => (props.bigSize ? 14 : 12)}px;
  line-height: ${(props) => (props.bigSize ? 16 : 14)}px;
  text-transform: ${(props) => (props.bigSize ? 'none' : 'uppercase')};
  color: #ffffff;
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
    if (props.outlinePrimary) {
      return `
      border: 1px solid #0094FF;
      background: transparent;
      color: #0094FF;
      `;
    }
  }}
`;
