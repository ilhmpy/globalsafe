import React, { useEffect, useContext, useState } from 'react';
import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../constantes/routers';
import {
  TabNavItem,
  TabsBlock,
  Text,
  Chip,
  FilterButton,
  Title,
  ProgramDescTitle,
  TitleWrap,
} from '../components/ui';
import * as S from './S.el';
import { Button } from '../../../components/Button/V2/Button';
import { AppContext } from '../../../context/HubContext';
import {
  RootCertificates,
  Collection,
  ViewUserCertificateModel,
} from '../../../types/certificates';
import { Balance } from '../../../types/balance';
import moment from 'moment';

export const Certificates = () => {
  const [allCert, setAllCert] = useState<Collection[]>([]);
  const [userCertificat, setUserCertificat] = useState<null | ViewUserCertificateModel>(null);
  const history = useHistory();
  const { hubConnection } = useContext(AppContext);

  useEffect(() => {
    if (hubConnection) {
      getUserCertificate();
      getCertificates();
      getCertificate();
    }
  }, [hubConnection]);

  async function getUserCertificate() {
    if (!hubConnection) return;
    try {
      const res = await hubConnection.invoke<ViewUserCertificateModel>('GetUserCertificate', 1);
      console.log('GetUserCertificate', res);
      setUserCertificat(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function getCertificates() {
    if (!hubConnection) return;
    try {
      const res = await hubConnection.invoke<RootCertificates>('GetCertificates', 0, 40);
      console.log('GetCertificates', res);
      setAllCert(res.collection);
    } catch (err) {
      console.log(err);
    }
  }

  const getCertificate = async () => {
    try {
      const res = await hubConnection!.invoke('GetCertificatesMarket', 2, 0, 100);
      console.log('GetMarket"', res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Container>
      <Container>
        <Heading
          onClick={() => history.push(routers.orderCreate)}
          title="P2P обмены"
          btnText="Опубликовать ордер"
        />
        <S.SubHeader>
          <TabsBlock>
            <TabNavItem to={routers.p2pchanges} exact>
              <div>Объявления</div>
            </TabNavItem>

            <TabNavItem to={routers.p2pchangesOwn} exact>
              <div>Мои обмены</div>
            </TabNavItem>

            <TabNavItem to={routers.certificates} exact>
              <div>Сертификаты</div>
            </TabNavItem>
          </TabsBlock>
          <Text size={14} lH={16} weight={500}>
            Рейтинг аккаунта: 5.0
          </Text>
        </S.SubHeader>
        {userCertificat ? (
          <>
            <Title>Активный сертификат</Title>
            <S.ActiveCert>
              <S.ActiveCertItem>
                <Text size={14} weight={300} lH={20}>
                  Тип сертификата:
                </Text>
                <Text size={14} weight={500} lH={20}>
                  {userCertificat.certificate.name}
                </Text>
              </S.ActiveCertItem>
              <S.ActiveCertItem>
                <Text size={14} weight={300} lH={20}>
                  Оставшийся лимит в сутках:
                </Text>
                <Text size={14} weight={500} lH={20}>
                  {(userCertificat.certificate.dailyVolume / 100000).toLocaleString()}{' '}
                  {Balance[userCertificat.certificate.assetKind]}
                </Text>
              </S.ActiveCertItem>
              <S.ActiveCertItem>
                <Text size={14} weight={300} lH={20}>
                  Оставшийся срок действия:
                </Text>
                <Text size={14} weight={500} lH={20}>
                  {moment(userCertificat.finishDate).diff(userCertificat.creationDate, 'days')}
                </Text>
              </S.ActiveCertItem>
            </S.ActiveCert>
          </>
        ) : null}
        <Title>Доступные сертификаты</Title>
      </Container>

      <S.AvilableCertificates>
        {allCert.length
          ? allCert.map((item) => (
              <S.AvilableCertificatesItem key={item.safeId}>
                <Text size={24} weight={700} lH={28} mB={40}>
                  {item.name}
                </Text>
                <TitleWrap small>
                  <ProgramDescTitle>Лимит:</ProgramDescTitle>
                </TitleWrap>
                <Text size={14} weight={500} lH={20} mB={20}>
                  100 000 CWD / 24ч.
                </Text>

                <TitleWrap small>
                  <ProgramDescTitle>Срок действия:</ProgramDescTitle>
                </TitleWrap>
                <Text size={14} weight={500} lH={20} mB={20}>
                  72 часа
                </Text>

                <TitleWrap small>
                  <ProgramDescTitle>Описание:</ProgramDescTitle>
                </TitleWrap>
                <Text size={14} weight={500} lH={20} mB={20}>
                  {item.description}
                </Text>

                <TitleWrap small>
                  <ProgramDescTitle>Стоимость:</ProgramDescTitle>
                </TitleWrap>
                <Text size={14} weight={500} lH={20} mB={40}>
                  100 CWD
                </Text>
                <Button primary>Купить сертификат</Button>
              </S.AvilableCertificatesItem>
            ))
          : null}
      </S.AvilableCertificates>
    </S.Container>
  );
};
