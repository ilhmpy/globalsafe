import { useContext } from 'react';
import { Loading } from '../UI/Loading';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

export function Loader() {
  return (
    <LoaderWrap>
      <Loading />
    </LoaderWrap>
  );
};

const LoaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 99999;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.loader.bg};
`;
   