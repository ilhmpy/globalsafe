import styled from 'styled-components/macro';

type Props = {
  primary?: boolean;
  yellow?: boolean;
  bigSize?: boolean;
  outlinePrimary?: boolean;
  outlineDanger?: boolean;
  fullWidth?: boolean;
  exchangeBtn?: boolean;
  disabled?: boolean;
  rightBtnOnTablet?: boolean;
  fullWidthMobile?: boolean;
};

export const Button = styled.a<Props>`
  padding: 11px 20px 11px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  box-sizing: border-box;
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
  background: ${({ theme }) => theme.main.buttonBackground};
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.4' : '1')};

  &:hover {
    opacity: 90%;
  }
  &:active {
    opacity: 90%;
  }

  &:focus,
  &:active {
    outline: none;
  }

  ${(props) => {
    if (props.primary) {
      return `
        background: #0094FF;

        &:hover {
          background: #199EFF;
        }

        &:active {
          background: #0085E6;
        }
      `;
    }
    if (props.yellow) {
      return `
        background: #F6B817;
        color: #0E0D3D;

        &:hover {
          background: #F7BF2E;
        }

        &:active {
          background: #DEA615;
        }
    `;
    }
    if (props.outlinePrimary) {
      return `
        border: 1px solid #0094FF;
        background: rgba(0, 0, 0, 0);
        color: #0094FF;

        &:hover {
          border: 1px solid #199EFF;
          background: rgba(0, 0, 0, 0);
          color: #199EFF;
        }

        &:active {
          border: 1px solid #0085E6;
          background: rgba(0, 0, 0, 0);
          color: #0085E6;
        }
      `;
    }
    if (props.outlineDanger) {
      return `
        border: 1px solid #FF4A31;
        background: rgba(0, 0, 0, 0);
        color: #FF4A31;

        &:hover {
          border: 1px solid #ff604b;
          background: rgba(0, 0, 0, 0);
          color: #ff604b;
        }

        &:active {
          border: 1px solid #ff3418;
          background: rgba(0, 0, 0, 0);
          color: #ff3418;
        }
      `;
    }
    if (props.fullWidthMobile) {
      return `
        @media only screen and (max-width: 768px) {
          width: 100%;
        }
      `;
    }
    if (props.rightBtnOnTablet) {
      return `
        display: flex;
        justify-content: flex-end;
      `;
    }
  }}

  &:disabled {
    box-shadow: none;
    user-select: none;
    cursor: not-allowed;
    opacity: 0.4;
  }
  ${({ exchangeBtn }) => {
    if (exchangeBtn) {
      return `
        border: 1px solid #FF4A31;
        background: rgba(0, 0, 0, 0);
        color: #FF4A31;

        &:hover {
          border: 1px solid #ff604b;
          background: rgba(0, 0, 0, 0);
          color: #ff604b;
        }

        &:active {
          border: 1px solid #ff3418;
          background: rgba(0, 0, 0, 0);
          color: #ff3418;
        }
      `;
    }
  }}
`;
