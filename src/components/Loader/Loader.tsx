import { FC } from 'react';
import styled from 'styled-components';
import { Loading } from '../UI/Loading';

export const Loader: FC = () => {
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
