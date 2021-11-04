import styled, { css } from 'styled-components/macro';
import { Button } from '../../../../components/Button/V2/Button';

export const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.theme.v2.text};
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-weight: 900;
    font-size: 18px;
    line-height: 21px;
    text-align: left;
  }
`;

const text = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

export const Text = styled.p<{ red?: boolean }>`
  ${text}
  color: ${(props) => (props.red ? '#FF4A31' : '#000')};
  a {
    text-decoration: underline;
    color: #0094ff;
  }
`;

export const TextWrap = styled.div<{ big?: boolean; sm?: boolean }>`
  margin-bottom: ${(props) => (props.big ? 40 : 10)}px;
  @media (max-width: 768px) {
    margin-bottom: ${(props) => (props.sm ? 20 : 20)}px;
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-bottom: 10px;
`;

export const ListItem = styled.li`
  display: flex;
`;

export const Buttons = styled.div`
  display: flex;
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
  ${Button} {
    flex: 1;
    padding: 12px 12px 11px;
    &:last-child {
      margin-left: 20px;
      @media (max-width: 576px) {
        margin-left: 0px;
        margin-top: 15px;
      }
    }
    @media (max-width: 576px) {
      width: 100%;
      flex: none;
    }
  }
`;

export const Container = styled.div`
  max-width: 340px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
