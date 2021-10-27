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
  RootMarketCertificate,
  MarketCertificate,
  RootUsersCertificates,
} from '../../../types/certificates';
import { Balance } from '../../../types/balance';
import moment from 'moment';
import { BuyCertificateModal } from './modals/BuyCertificate';
import { SuccessModal } from './modals/SuccessModal';
import { ErrorModal } from './modals/ErrorModal';
import { wordDecline } from '../../../utils/wordDecline';
import 'moment-duration-format';
import { getMyRating } from '../utils';

export const Certificates = () => {
  const [allCert, setAllCert] = useState<MarketCertificate[]>([]);
  const [userCertificat, setUserCertificat] = useState<ViewUserCertificateModel[]>([]);
  const [userPureCertificat, setUserPureCertificat] = useState<ViewUserCertificateModel[]>([]);
  const [buyCertificateModal, setBuyCertificateModal] = useState<MarketCertificate | null>(null);
  const [successModal, setIsSuccessModal] = useState<MarketCertificate | null>(null);
  const [errorModal, setIsErrorModal] = useState<MarketCertificate | null>(null);
  const [errorType, setErrorType] = useState('');
  const [dailyVolume, setDailyVolume] = useState(0);
  const history = useHistory();
  const { hubConnection, balance, account } = useContext(AppContext);

  useEffect(() => {
    if (hubConnection) {
      getUserCertificate();
      // getCertificates();
      getCertificate();
      // getDailyVolume();
    }
  }, [hubConnection]);

  // async function getUserCertificate() {
  //   if (!hubConnection) return;
  //   try {
  //     const res = await hubConnection.invoke<ViewUserCertificateModel>('GetUserCertificate', 1);
  //     console.log('GetUserCertificate', res);
  //     getDailyVolume(res.certificate.assetKind);
  //     setUserCertificat(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function getUserCertificate() {
    if (!hubConnection) return;
    try {
      const res = await hubConnection.invoke<RootUsersCertificates>(
        'GetUserCertificates',
        [],
        0,
        100
      );
      // getDailyVolume(res.certificate.assetKind);
      // setUserCertificat(res);
      setUserPureCertificat(res.collection);
      const arr = res.collection;
      (async () => {
        for (let i = 0; i < arr.length; i++) {
          const resp = await hubConnection.invoke('GetOrdersVolume', arr[i].certificate.assetKind);
          arr[i].certificate.dailyVolume =
            arr[i].certificate.dailyVolume - resp > 0 ? arr[i].certificate.dailyVolume - resp : 0;
        }

        setUserCertificat(arr);
      })();
    } catch (err) {
      console.log(err);
    }
  }

  // async function getCertificates() {
  //   if (!hubConnection) return;
  //   try {
  //     const res = await hubConnection.invoke<RootCertificates>('GetCertificates', 0, 40);
  //     console.log('GetCertificates', res);
  //     setAllCert(res.collection);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const getDailyVolume = async (asset: number) => {
    if (hubConnection) {
      try {
        const res = await hubConnection.invoke('GetOrdersVolume', asset);
        console.log('GetOrdersVolume', res);
        // setDailyVolume(res);
        return res;
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getCertificate = async () => {
    try {
      const res = await hubConnection!.invoke<RootMarketCertificate>(
        'GetCertificatesMarket',
        [],
        0,
        100
      );
      console.log('GetMarket"', res);
      setAllCert(res.collection);
    } catch (err) {
      console.log(err);
    }
  };

  const purchase = async (data: MarketCertificate) => {
    setBuyCertificateModal(null);
    if (hubConnection) {
      try {
        await hubConnection.invoke('PurchaseCertificate', data.safeId);
        getUserCertificate();
        setIsSuccessModal(data);
      } catch (e) {
        console.log(e);
        setIsErrorModal(data);
      }
    }
  };

  const onValid = (item: MarketCertificate) => {
    const certificate = userPureCertificat.filter(
      (i) => i.certificate.assetKind === item.certificate.assetKind
    )[0];

    if (certificate && certificate.certificate.safeId === item.certificate.safeId) {
      setErrorType('Данный сертификат уже куплен');
      setIsErrorModal(item);
    } else if (certificate && item.certificate.dailyVolume <= certificate.certificate.dailyVolume) {
      setErrorType('Сумма сертификата меньше существующей');
      setIsErrorModal(item);
    } else if (balance !== null && balance < item.price) {
      setErrorType('На балансе аккаунта недостаточно средств');
      setIsErrorModal(item);
    } else {
      setErrorType('');
      setBuyCertificateModal(item);
    }
  };

  console.log('userCertificat ', userCertificat);

  return (
    <S.Container>
      {buyCertificateModal && (
        <BuyCertificateModal
          data={buyCertificateModal}
          purchase={purchase}
          onClose={() => setBuyCertificateModal(null)}
          open={true}
        />
      )}
      {successModal && (
        <SuccessModal open={true} data={successModal} onClose={() => setIsSuccessModal(null)} />
      )}
      {errorModal && (
        <ErrorModal
          errorType={errorType}
          open={true}
          data={errorModal}
          onClose={() => setIsErrorModal(null)}
        />
      )}
      <Container>
        <Heading
          onClick={() => history.push(routers.p2pchangesOrderToBuy)}
          title="P2P обмены"
          btnText="Опубликовать ордер"
        />
        <S.SubHeader>
          <TabsBlock>
            <TabNavItem to={routers.p2pchanges} exact>
              <div>Ордеры</div>
            </TabNavItem>

            <TabNavItem to={routers.p2pchangesOwn} exact>
              <div>Мои обмены</div>
            </TabNavItem>

            <TabNavItem to={routers.certificates} exact>
              <div>Сертификаты</div>
            </TabNavItem>
          </TabsBlock>
          <Text size={14} lH={16} weight={500}>
            Рейтинг аккаунта: {getMyRating(account)}
          </Text>
        </S.SubHeader>
        {userCertificat.length > 1 ? (
          <Title>Активные сертификаты</Title>
        ) : userCertificat.length === 1 ? (
          <Title>Активный сертификат</Title>
        ) : null}
        {userCertificat.length
          ? userCertificat.map((item) => (
              <div key={item.safeId}>
                <S.ActiveCert>
                  <S.ActiveCertItem>
                    <Text size={14} weight={300} lH={20}>
                      Тип сертификата:
                    </Text>
                    <Text size={14} weight={500} lH={20}>
                      {item.certificate.name}
                    </Text>
                  </S.ActiveCertItem>
                  <S.ActiveCertItem>
                    <Text size={14} weight={300} lH={20}>
                      Оставшийся лимит в сутках:
                    </Text>
                    <Text size={14} weight={500} lH={20}>
                      {item.certificate.dailyVolume > 0
                        ? (item.certificate.dailyVolume / 100000).toLocaleString()
                        : 0}{' '}
                      {Balance[item.certificate.assetKind]}
                    </Text>
                  </S.ActiveCertItem>
                  <S.ActiveCertItem>
                    <Text size={14} weight={300} lH={20}>
                      Оставшийся срок действия:
                    </Text>
                    <Text size={14} weight={500} lH={20}>
                      {moment.utc(item.finishDate).local().diff(moment.utc().local(), 'days')}
                      &nbsp;
                      {wordDecline(
                        moment.utc(item.finishDate).local().diff(moment.utc().local(), 'days'),
                        ['день', 'дня', 'дней']
                      )}
                    </Text>
                  </S.ActiveCertItem>
                </S.ActiveCert>
              </div>
            ))
          : null}
        <Title>Доступные сертификаты</Title>
      </Container>

      <S.AvilableCertificates>
        {allCert.length
          ? allCert.map((item) => (
              <S.AvilableCertificatesItem key={item.safeId}>
                <Text size={24} weight={700} lH={28} mB={40}>
                  {item.certificate.name}
                </Text>
                <TitleWrap small>
                  <ProgramDescTitle>Лимит:</ProgramDescTitle>
                </TitleWrap>
                <Text size={14} weight={500} lH={20} mB={20}>
                  {(item.certificate.dailyVolume / 100000).toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                  })}{' '}
                  {Balance[item.certificate.assetKind]} / 24 дней.
                </Text>

                <TitleWrap small>
                  <ProgramDescTitle>Срок действия:</ProgramDescTitle>
                </TitleWrap>
                <Text size={14} weight={500} lH={20} mB={20}>
                  {item.certificate.duration} дней
                </Text>

                <TitleWrap small>
                  <ProgramDescTitle>Описание:</ProgramDescTitle>
                </TitleWrap>
                <Text size={14} weight={500} lH={20} mB={20}>
                  {item.certificate.description}
                </Text>

                <TitleWrap small>
                  <ProgramDescTitle>Стоимость:</ProgramDescTitle>
                </TitleWrap>
                <Text size={14} weight={500} lH={20} mB={40}>
                  {(item.price / 100000).toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                  })}{' '}
                  {Balance[item.certificate.assetKind]}
                </Text>
                <Button bigSize primary onClick={() => onValid(item)} as="button">
                  Купить сертификат
                </Button>
              </S.AvilableCertificatesItem>
            ))
          : null}
      </S.AvilableCertificates>
    </S.Container>
  );
};
