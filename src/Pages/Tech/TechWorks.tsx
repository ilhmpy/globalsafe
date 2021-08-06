import { useContext } from "react";
import * as Styled  from "./Styles.elements";
import { ReactComponent as DarkLogo } from "../../assets/svg/logo.svg";
import { ReactComponent as WhiteLogo } from "../../assets/svg/logoWhite.svg";
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function TechWorks() {
    const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);
    const theme = themeContext.theme;

    return (
        <>
           <Styled.TechHeader>
              { theme == "light" ? ( <DarkLogo /> ) : ( <WhiteLogo /> ) }
          </Styled.TechHeader>
          <Styled.TechContainer>
              <Styled.Tech />
              <Styled.TechDescription bold>
                  {t("tech.tech")}
              </Styled.TechDescription>
          </Styled.TechContainer>
        </>
    );
};