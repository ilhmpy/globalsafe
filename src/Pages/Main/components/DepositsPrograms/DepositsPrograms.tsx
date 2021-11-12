import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { Container } from '../../../../components/UI/Container';
import { H2 } from '../../../../components/UI/Heading';
import { Page } from '../../../../components/UI/Page';
import * as Styled from './Styles.elements';
import { AppContext } from '../../../../context/HubContext';
import Slider from "react-slick";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const DepositsPrograms = () => {
  const { t } = useTranslation();
  const [deposits, setDeposits] = useState<any[]>([]);
  const appContext = useContext(AppContext);
  const { hubConnection, screen } = appContext;
  const lang = localStorage.getItem('i18nextLng') === 'en' ? 0 : 1;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke('GetDeposits', lang, true, 0, 100)
        .then((res) => {
          console.log('res', res);
          setDeposits(res.collection);
        })
        .catch((err) => console.log(err));
    }
  }, [hubConnection, lang]);

  function getSettingsObject(slidesToShow: number, breakpoint: number) {
    return { breakpoint, settings: { slidesToShow }};
  };

  const slides = useMemo<number[]>(() => 
    [
     1.1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 
     1.3, 1.3, 1.3, 1.4, 1.4, 1.4, 1.4, 
     1.4, 1.5, 1.5, 1.6, 1.6, 1.7, 1.7, 
     1.7, 1.7, 1.8, 1.8, 1.9, 1.9, 2,
     2, 2, 2, 2.1, 2.1, 2.1, 2.1, 2.3,
     2.3, 2.3, 2.3, 2.3, 2.3,
    ], 
  []);

  const width = 370;
  let widthForItems = width;

  const slickProps = useMemo<any>(() => ({
    infinite: false,
    slidesToShow: 1,
    responsive: slides.map((item, idx) => {
      widthForItems += idx === 0 ? 0 : 10;
      return getSettingsObject(item, widthForItems);
    })
  }), []);

  return (
    <>
      {deposits.length > 0 && (
        <Container page id="deposits">
          <H2>{t('sideNav.depositsPrograms')}</H2>
          {screen > 767 && (
            <Styled.CardBox>
              {deposits &&
                deposits.map((item, idx) => (
                  <DepositCard key={idx} item={item} />
                ))}
            </Styled.CardBox>
          )} 
          {screen < 767 && screen < width && (
              <Styled.CardBox>
                <Swiper
                  slidesPerView={1}
                  pagination={{ clickable: true, dynamicBullets: true }}
                >
                  {deposits &&
                    deposits.map((item, idx) => (
                      <SwiperSlide key={idx}>
                        <DepositCard item={item} key={idx} />
                      </SwiperSlide>
                  ))}
                </Swiper>
              </Styled.CardBox>
          )}
          {screen < 767 && screen >= width && screen < 768 && (
              <Styled.Block style={{ marginBottom: "20px" }}>
                <Slider {...slickProps}>
                  {deposits && deposits.map((item, idx) => (
                    <DepositCard item={item} key={idx} />
                  ))}      
                </Slider>          
              </Styled.Block>
          )}
        </Container>
      )}
    </>
  );
};

type DepositCardProps = {
  item: any;
} 

const DepositCard = ({ item }: DepositCardProps) => {
  const appContext = useContext(AppContext);
  const { user } = appContext;
  const { t } = useTranslation();
  const history = useHistory();
  
  function toDeposits(id: string) {
    const token = localStorage.getItem('token');
    if (token && user) {
      history.push(`/info/deposits/new-deposit/${id}`);
    } else {
      history.push(`/login/${id}`);
    };
  };

  return (
    <Styled.Card>
      <Styled.CardName>
        {item.name.length > 0 ? item.name.toUpperCase() : 'Имя депозита'}
      </Styled.CardName>
      <Styled.CardDesc>
        {item.description.length > 0 ? item.description : 'Описание'}
      </Styled.CardDesc>
      <Styled.CardButton onClick={() => toDeposits(item.id)}>
        {t('payments.open').toUpperCase()}
      </Styled.CardButton>
    </Styled.Card>
  );
};