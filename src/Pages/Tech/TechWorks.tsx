import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DarkLogo } from '../../assets/svg/logo.svg';
import { ReactComponent as WhiteLogo } from '../../assets/svg/logoWhite.svg';
import { ThemeContext } from '../../context/ThemeContext';
import * as Styled from './Styles.elements';

export default function TechWorks(): JSX.Element {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;

  return (
    <>
      <Styled.TechHeader>
        <a href="/">{theme == 'light' ? <DarkLogo /> : <WhiteLogo />}</a>
      </Styled.TechHeader>
      <Styled.TechContainer>
        <Styled.Tech />
        <Styled.TechDescription bold>{t('tech.tech')}</Styled.TechDescription>
      </Styled.TechContainer>
    </>
  );
}
