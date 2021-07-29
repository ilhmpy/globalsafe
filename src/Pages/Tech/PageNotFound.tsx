import { useContext } from "react";
import * as Styled  from "./Styles.elements";
import { ReactComponent as DarkLogo } from "../../assets/svg/logo.svg";
import { ReactComponent as WhiteLogo } from "../../assets/svg/logoWhite.svg";
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function PageNotFound() {
    const { t } = useTranslation();
    const themeContext = useContext(ThemeContext);
    const theme = themeContext.theme;

    return (
        <>
          <Styled.TechHeader>
             <a href="/">
                { theme == "light" ? ( <DarkLogo /> ) : ( <WhiteLogo /> ) }
             </a>
          </Styled.TechHeader>
          <Styled.TechContainer>
             <Styled.Page404 />
             <Styled.TechDescription>
                {t("tech.desc")} <Styled.TechLink href="/">{t("tech.main")}</Styled.TechLink>
             </Styled.TechDescription>
          </Styled.TechContainer>
        </>
    )
}