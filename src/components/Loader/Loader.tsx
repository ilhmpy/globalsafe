import { useContext } from 'react';
import { Loading } from '../UI/Loading';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

export function Loader() {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;

  return (
    <LoaderWrap currentTheme={theme}>
      <Loading currentTheme={theme} />
    </LoaderWrap>
  );
};

const LoaderWrap = styled.div<{ currentTheme?: string; }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ currentTheme }) => currentTheme == "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(48,48,48,1)"};
  display: block;
  z-index: 99999;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
  