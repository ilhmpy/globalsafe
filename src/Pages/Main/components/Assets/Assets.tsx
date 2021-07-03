import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
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
} from './styled';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Assets = () => {
  const [isNormalOpen, setIsNormalOpen] = useState(false);
  const [oldLink, setOldLink] = useState('');
  const [link, setLink] = useState('');
  const [min, setMin] = useState(500);
  const [value, setValue] = useState('');
  const [listDeposits, setListDeposits] = useState<CollectionListDeposits[]>(
    [],
  );
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;
  const [programs, setPrograms] = useState([
    {
      name: 'start',
      color: '#BCD476',
      lines: [
        { id: '1', count: '4%' },
        { id: '2', count: '1,6%' },
        { id: '3', count: '0,8%' },
        { id: '4', count: '' },
        { id: '5', count: '' },
        { id: '6', count: '' },
        { id: '7', count: '' },
        { id: '8', count: '' },
      ],
    },
    {
      name: 'expert',
      color: '#6DB9FF',
      lines: [
        { id: '1', count: '5%' },
        { id: '2', count: '2%' },
        { id: '3', count: '1%' },
        { id: '4', count: '1%' },
        { id: '5', count: '1%' },
        { id: '6', count: '' },
        { id: '7', count: '' },
        { id: '8', count: '' },
      ],
    },
    {
      name: 'infinity',
      color: '#FF416E',
      lines: [
        { id: '1', count: '5%' },
        { id: '2', count: '2%' },
        { id: '3', count: '1%' },
        { id: '4', count: '1%' },
        { id: '5', count: '1%' },
        { id: '6', count: '1%' },
        { id: '7', count: '1%' },
        { id: '8', count: '1%' },
      ],
    },
  ]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>('GetDeposits', languale, true, 0, 40)
        .then((res) => {
          // console.log("GetDeposits", res);
          setListDeposits(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection, languale]);

  const handleClick = (str: string, value: number) => {
    setIsNormalOpen(true);
    setValue('');
    // setLink(str);
    const newLink = `https://cwd.global/shopping/payment?to_name=${str}&amount=${
      value / 100000
    }`;
    setLink(newLink);
    setOldLink(`https://cwd.global/shopping/payment?to_name=${str}&amount=`);
    const val: any = /\d{3,}/g.exec(str);
    setMin(value / 100000);
    setValue((value / 100000).toString());
  };

  useEffect(() => {
    if (inputRef && inputRef.current && value) {
      inputRef.current.focus();
    }
  }, [value, inputRef]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setValue(id);
    const newLink = oldLink.replace(/\d{5,}/g, '');
    if (id === '') {
      setLink(newLink);
    } else {
      setLink(newLink + id);
    }
  };

  const toLink = () => {
    window.open(link);
  };

  const colors = (item: CollectionListDeposits, id: number) => {
    switch (id) {
      case 0:
        return (
          <Button
            green
            onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      case 1:
        return (
          <Button
            blue
            onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      case 2:
        return (
          <Button
            danger
            onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      case 3:
        return (
          <Button
            pink
            onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      case 4:
        return (
          <Button
            purple
            onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );

      case 5:
        return (
          <Button
            yellow
            onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );

      case 6:
        return (
          <Button
            yellow
            onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      default:
        return (
          <Button
            green
            onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
    }
  };

  return (
    <Page id="assets">
      <Container>
        <UpTitle small>{'Активы'}</UpTitle>
      </Container>
      <Container>
        <H1>{'Активы'}</H1>
      </Container>
      {isNormalOpen && (
        <Modal onClose={() => setIsNormalOpen(false)}>
          <ModalBlock>
            <ModalTitle>{'Купить MilliCent (mCent)'}</ModalTitle>
            <ModalBlockBody>
              <Input
                onChange={onChange}
                placeholder={'Введите сумму, CWD'}
                type="number"
                ref={inputRef}
                // value={value}
              />

              <ModalButton
                as="button"
                onClick={toLink}
                danger
                disabled={+value < min}>
                {'Купить MCENT'}
              </ModalButton>
            </ModalBlockBody>
          </ModalBlock>
        </Modal>
      )}
      <BlockContainers>
        <BlockItem>
          <BlockTitle>{'MILLICENT (MCENT)'}</BlockTitle>

          <BlockBody>
            <BlockOne>{'mCent - это 1/100 mGCWD'}</BlockOne>
            <BlockOne>
              {'mCent обладает всеми свойствами и качествами'}
            </BlockOne>
            <BlockOne>
              {
                'mGCWD - источник пассивного дохода (начисление дивидендов) и спекулятивный инструмент (дешевле купил - дороже продал'
              }
            </BlockOne>
          </BlockBody>
          <Button danger onClick={() => handleClick('sebsrkjgb', 0)}>
            {'Купить MCENT'}
          </Button>
        </BlockItem>
      </BlockContainers>
      {/* <SwiperContainer>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}>
          {listDeposits.map((item, idx) => (
            <SwiperSlide key={item.safeId}>
              <BlockItem>
                <BlockTitle>{item.name}</BlockTitle>
                <div className="item__subtitle">
                  <Text
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
                {colors(item, idx)}
              </BlockItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer> */}
    </Page>
  );
};
