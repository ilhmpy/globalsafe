import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { CurrencyValues } from '../../../../components/CurrencyValues';
import { H2 } from '../../../../components/UI/Heading';
import { Container } from '../../../../components/UI/Container';
import { Button } from '../../../../components/Button/V2/Button';
import { Carousel } from '../Carousel/Carousel';
import * as S from './S.elements';

export const Banner: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Carousel />
      <S.DescWrap>
        <Container>
          <H2>Приумножайте правильно</H2>
          <S.Desc>
            GlobalSafe - Это современный криптофонд для управления и приумножения ваших средств под
            контролем лучших специалистов!
          </S.Desc>
          <Button as="button">
            <Link to="tariffs" spy={true} smooth={true} offset={-50} duration={500}>
              программы депозитов
            </Link>
          </Button>
        </Container>
      </S.DescWrap>
      {/* <CurrencyValues /> */}
    </>
  );
};
