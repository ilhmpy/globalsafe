import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper } from 'swiper/react';
import 'swiper/swiper.scss';
import { Button } from '../../../../components/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { Input } from '../../../../components/UI/Input';
import { H1 } from '../../../../components/UI/MainStyled';
import { Page } from '../../../../components/UI/Page';
import { UpTitle } from '../../../../components/UI/UpTitle';
import { AppContext } from '../../../../context/HubContext';
import { Container } from '../../../../globalStyles';
import {
  CollectionListDeposits,
  ListDeposits,
} from '../../../../types/deposits';
import {
  BlockBody,
  BlockContainers,
  BlockItem,
  BlockOne,
  BlockTitle,
  ModalBlock,
  ModalBlockBody,
  ModalButton,
  ModalTitle,
  SwiperContainer,
} from './styled';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Assets = () => {
  const [isNormalOpen, setIsNormalOpen] = useState(false);
  const [oldLink, setOldLink] = useState('');
  const [link, setLink] = useState('');
  const [min, setMin] = useState(1);
  const [value, setValue] = useState<string | undefined>();
  const [listDeposits, setListDeposits] = useState<CollectionListDeposits[]>(
    [],
  );
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>('GetDeposits', languale, true, 0, 40)
        .then((res) => {
          setListDeposits(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection, languale]);

  const handleClick = (num: number) => {
    setIsNormalOpen(true);
    const newLink = `https://cwd.global/shopping/payment?to_name=mcent-fond&amount=${num}`;
    setLink(newLink);
    setOldLink(
      `https://cwd.global/shopping/payment?to_name=mcent-fond&amount=`,
    );
    setValue('');
  };

  useEffect(() => {
    if (inputRef && inputRef.current && value) {
      inputRef.current.focus();
    }
  }, [value, inputRef]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    const newLink = oldLink.replace(/\d{5,}/g, '');
    if (value === '') {
      setLink(newLink);
    } else {
      setLink(newLink + value);
    }
  };

  const toLink = () => {
    const newWindow = window.open();
    newWindow && (newWindow.location.href = link);
  };

  return (
    <Page id="assets">
      <Container>
        <UpTitle small>{t('assets.uptitle')}</UpTitle>
      </Container>
      <Container>
        <H1>{t('assets.uptitle')}</H1>
      </Container>
      {isNormalOpen && (
        <Modal onClose={() => setIsNormalOpen(false)}>
          <ModalBlock>
            <ModalTitle>{`${t('assets.buy')} MilliCent (mCent)`}</ModalTitle>
            <ModalBlockBody>
              <Input
                onChange={onChange}
                placeholder={`${t('assets.inputPlaceholder')}, CWD`}
                type="number"
                ref={inputRef}
                value={value}
              />
              <ModalButton
                as="button"
                onClick={toLink}
                danger
                disabled={value === undefined || +value < 1 ? true : false}>
                {`${t('assets.buy')} MCENT`}
              </ModalButton>
            </ModalBlockBody>
          </ModalBlock>
        </Modal>
      )}
      <BlockContainers>
        <BlockItem>
          <BlockTitle>{'MILLICENT (MCENT)'}</BlockTitle>

          <BlockBody>
            <BlockOne>{t('assets.mCentIs')}</BlockOne>
            <BlockOne>{t('assets.mCentDescpition')}</BlockOne>
          </BlockBody>
          <Button danger onClick={() => handleClick(0)}>
            {`${t('assets.buy')} MCENT`}
          </Button>
        </BlockItem>
      </BlockContainers>
      <SwiperContainer>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}>
          <BlockItem>
            <BlockTitle>{'MILLICENT (MCENT)'}</BlockTitle>

            <BlockBody>
              <BlockOne>{t('assets.mCentIs')}</BlockOne>
              <BlockOne>{t('assets.mCentDescpition')}</BlockOne>
            </BlockBody>
            <Button danger onClick={() => handleClick(0)}>
              {`${t('assets.buy')} MCENT`}
            </Button>
          </BlockItem>
        </Swiper>
      </SwiperContainer>
    </Page>
  );
};
