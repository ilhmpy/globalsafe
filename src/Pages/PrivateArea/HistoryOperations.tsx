import moment from 'moment';
import 'moment/locale/ru';
import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Container } from '../../components/UI/Container';
import * as Styled from "./Styles.history";
import { Heading } from './components/Heading';
import * as FilterS from './components/Filter/S.el';
import { Filter } from "./components/Filter/index";

export const HistoryOperations = () => {
    const history = useHistory();
    const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Декабрь"];
    
    return (
        <Container>
            <Heading
                title="История операций"
                withoutBtn 
            />
            <Styled.FilterAllBlock>
                <Styled.FilterDivision>
                    <FilterS.Button active={true}>{months[moment().month()]} {new Date().getFullYear()}</FilterS.Button>
                </Styled.FilterDivision>
                <Styled.FilterDivision>
                    <FilterS.Button active={true}>Все валюты</FilterS.Button>
                </Styled.FilterDivision>
                <Filter 
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    withoutViewType
                    withCustomButtons
                    buttons={[{ text: "Все типы", active: "active" }, { text: "Пополнение", active: "hold" }, { text: "Списание", active: "archived" }]}
                />
            </Styled.FilterAllBlock>
        </Container>
    )
}   