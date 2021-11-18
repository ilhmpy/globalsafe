import styled, { css } from 'styled-components/macro';

interface ChipProps {
  type?: 'default' | 'success' | 'rejected' | 'danger' | 'info'
};

const Default = css`
  background: rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.v2.blackText};
`;

const Success = css`
  background: rgba(93, 167, 0, 0.1);
  color: ${props => props.theme.v2.blackText};
`;

const Rejected = css`
  background: rgba(255, 74, 49, 0.1);
  color: ${props => props.theme.v2.blackText};
`;

const Danger = css`
  background: #FF4A31;
  color: ${props => props.theme.v2.whiteText};
`;

const Info = css`
  background: rgba(0, 148, 255, 0.1);
  color: ${props => props.theme.v2.blackText};
`;

export const Chip = styled.div<ChipProps>`
  font-size: 12px;
  line-height: 14px;
  display: inline-block;
  border-radius: 2px;
  padding: 6px 10px;
  user-select: none;
  ${props => (
      props.type === 'success' && Success ||
      props.type === 'rejected' && Rejected ||
      props.type === 'danger' && Danger ||
      props.type === 'info' && Info ||
      props.type === 'default' && Default || Default
  )}
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    font-weight: 400;
    font-size: 12px;
  }
`;

export const ChipWrap = styled.div<{ small?: boolean }>`
  margin-bottom: ${(props) => (props.small ? 20 : 40)}px;
`;
