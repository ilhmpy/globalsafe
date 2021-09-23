import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button } from '../../../../components/Button/Button';
import { H2 } from '../../../../components/UI/Heading';
import { Page } from '../../../../components/UI/Page';
import { AppContext } from '../../../../context/HubContext';
import { Container } from '../../../../components/UI/Container';
import { Collection, RootOperations } from '../../../../types/operations';
import * as Styled from "./Styles.elements"; 
import 'swiper/swiper.scss';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const DepositsPrograms = () => {
    const { t } = useTranslation();
    const [deposits, setDeposits] = useState<any[]>([
        { name: "START", desc: "4 мес 70/3 депозит заморожен Выплата % 1 раз в мес" },
        { name: "INFINITY", desc: "6 мес 90/1 депозит заморожен Выплата % каждые 2 месяца" },
        { name: "EXPERT", desc: "8 мес 80/20 депозит заморожен Выплата % 2 раза в мес 11 и 21 числа" }
    ]);

    return (
        <Page>
            {deposits.length > 0 && (
                <Container>
                    <H2>{t("sideNav.depositsPrograms")}</H2>
                    {screen.width > 480 ? (
                        <Styled.CardBox>
                            {deposits.map((item, idx) => (
                                <Styled.Card key={idx}>
                                    <Styled.CardName>{item.name}</Styled.CardName>
                                    <Styled.CardDesc>{item.desc}</Styled.CardDesc>
                                    <Styled.CardButton>{(t("payments.open")).toUpperCase()}</Styled.CardButton>
                                </Styled.Card>
                            ))}
                        </Styled.CardBox>
                    ) : (
                    <div></div>
                    )}
                </Container>
            )}
        </Page>
    )
}