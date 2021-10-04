import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const DepositsPrograms = () => {
  const { t } = useTranslation();
  const [deposits, setDeposits] = useState<any[]>([]); 
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;
  const history = useHistory();
  const lang = localStorage.getItem("i18nextLng") === "en" ? 0 : 1;

  useEffect(() => {
    if (hubConnection) {
      hubConnection.invoke(
       "GetDeposits",
       lang,
       true,
       0,
       20 
      )
        .then((res) => {
          console.log("res", res);
          setDeposits(res.collection);
        })  
        .catch((err) => console.log(err));
    }
  }, [hubConnection]);

  function toDeposits() {
    const token = localStorage.getItem("token");
    if (token && user) {
      history.push("/info");
    } else {
      history.push("/login");
    };
  }; 
   
  return (
    <>
      {deposits.length > 0 && (
        <Container page id="deposits">
          <H2>{t('sideNav.depositsPrograms')}</H2>
          {screen.width > 480 ? (
            <Styled.CardBox>
              {deposits && deposits.map((item, idx) => (
                <Styled.Card key={idx}>
                  <Styled.CardName>{item.name.length > 0 ? (item.name).toUpperCase() : "Имя депозита"}</Styled.CardName>
                  <Styled.CardDesc>{item.description.length > 0 ? item.description : "Описание"}</Styled.CardDesc>
                  <Styled.CardButton onClick={toDeposits}>{t('payments.open').toUpperCase()}</Styled.CardButton>
                </Styled.Card>
              ))} 
            </Styled.CardBox>
          ) : (
            <>
              <Styled.CardBox>
                <Swiper 
                  slidesPerView={"auto"} 
                  pagination={{ clickable: true, dynamicBullets: true }}
                >
                  {deposits && deposits.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <Styled.Card key={idx}>
                        <Styled.CardName>{item.name.length > 0 ? (item.name).toUpperCase() : "Имя депозита"}</Styled.CardName>
                        <Styled.CardDesc>{item.description.length > 0 ? item.description : "Описание"}</Styled.CardDesc>
                        <Styled.CardButton onClick={toDeposits}>{t('payments.open').toUpperCase()}</Styled.CardButton>
                      </Styled.Card>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Styled.CardBox>
            </>
          )}
        </Container>
      )}
      </>
  );
};
