import React, { useState, useRef, useEffect, useContext } from 'react';
import { Container } from '../../../../components/UI/Container';
import { H2 } from '../../../../components/UI/Heading'; 
import { UpTitle } from '../../../../components/UI/UpTitle';
import { Button } from '../../../../components/Button/Button';
import {
  BlockTitle,
  DescContainer,
  DescContainerInner,
  BlockContainers,
  BlockItem,
  Text,
  SwiperContainer,
  ModalBlock,
  ModalButton,
  ModalTitle,
  PartnerProgramBlock,
  PartnerProgramTitle,
  PartnerProgramContainer,
  PartnerProgramData,
  PartnerProgramHeader,
  PartnerProgramHeaderItem,
  PartnerProgramLine,
  PartnerProgramLineNumber,
  PartnerProgramLineItem,
  PartnerProgramPagination,
  PartnerProgramPaginationItem,
} from './Tariffs.elements';
import { Modal } from '../../../../components/Modal/Modal';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Input } from '../../../../components/UI/Input';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../../context/HubContext';
import { ListDeposits, CollectionListDeposits } from '../../../../types/deposits';
import { useTranslation } from 'react-i18next';
import { Page } from '../../../../components/UI/Page';
import styled from 'styled-components';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Tariffs = () => {
  const [isNormalOpen, setIsNormalOpen] = useState(false);
  const [oldLink, setOldLink] = useState('');
  const [link, setLink] = useState('');
  const [min, setMin] = useState(500);
  const [value, setValue] = useState('');
  const [listDeposits, setListDeposits] = useState<CollectionListDeposits[]>([]);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;
  const [programs, setPrograms] = useState([
    { line: 1, data: ['4 %', '5 %', '5 %'] },
    { line: 2, data: ['1,6 %', '2 %', '2 %'] },
    { line: 3, data: ['0,8 %', '1 %', '1 %'] },
    { line: 4, data: ['', '1 %', '1 %'] },
    { line: 5, data: ['', '1 %', '1 %'] },
    { line: 6, data: ['', '', '1 %'] },
    { line: 7, data: ['', '', '1 %'] },
    { line: 8, data: ['', '', '1 %'] },
  ]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>('GetDeposits', languale, true, 0, 40)
        .then((res) => {
          const sortedList = [...res.collection].sort((a, b) => {
            if (a.name === 'GOLD') {
              return -1;
            } else if (a.name === 'LIDER') {
              return 1;
            } else {
              return 0;
            }
          });
          setListDeposits(sortedList);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection, languale]);

  const handleClick = (str: string, num: number) => {
    setIsNormalOpen(true);
    setValue('');
    // setLink(str);
    const newLink = `https://backup.cwd.global/shopping/payment?to_name=${str}&amount=${
      num / 100000
    }`;
    setLink(newLink);
    setOldLink(`https://backup.cwd.global/shopping/payment?to_name=${str}&amount=`);
    const val: any = /\d{3,}/g.exec(str);
    setMin(num / 100000);
    setValue((num / 100000).toString());
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
          <Button green onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      case 1:
        return (
          <Button blue onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      case 2:
        return (
          <Button danger onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      case 3:
        return (
          <Button pink onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      case 4:
        return (
          <Button purple onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );

      case 5:
        return (
          <Button yellow onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );

      case 6:
        return (
          <Button yellow onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
      default:
        return (
          <Button green onClick={() => handleClick(item.account, item.minAmount)}>
            {item.name}
          </Button>
        );
    }
  };

  return (
      <Container pNone page mtNone>
        <H2 center>{t('partnersTitle')}</H2>
        <PartnersBlock>
          <PartnersHeader>
            <PartnersHeaderItem>START</PartnersHeaderItem>
            <PartnersHeaderItem>EXPERT</PartnersHeaderItem>
            <PartnersHeaderItem>INFINITY</PartnersHeaderItem>
          </PartnersHeader>
          {programs.map((item, idx) => (
            <PartnersItem key={idx}>
              <PartnersItemTitle>{item.line} линия:</PartnersItemTitle>
              {item.data.map((dt, idx) => (
                <PartnersItemData key={idx}>{dt}</PartnersItemData>
              ))}
            </PartnersItem>
          ))}
        </PartnersBlock>
      </Container>
  );
};

const PartnersBlock = styled.div`
  width: 100%;
  min-height: 544px;
  background: #fff;
  border-radius: 4px;
  padding: 1px;
  box-shadow: 0px 80px 80px -40px rgba(220, 220, 232, 0.5);
  @media only screen and (max-device-width: 480px) {
    min-height: 345px;
    margin-bottom: 20px;
  }
`;

const PartnersHeader = styled.header`
  width: 100%;
  height: 100px;
  padding-left: 270px;
  display: flex;
  align-items: center;
  @media only screen and (max-device-width: 480px) {
    padding-left: 25%;
    height: 38px;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    padding-left: 30%;
    height: 60px;
  }
`;

const PartnersHeaderItem = styled.div`
  width: 74px;
  color: #000;
  line-height: 28px;
  font-size: 24px;
  font-weight: 700;
  margin-right: 217px;
  @media only screen and (max-device-width: 480px) {
    margin-right: 45px;
    font-weight: 700;
    font-size: 12px;
    width: 60px;
    line-height: 20px;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    width: 160px;
    margin-right: 0px;
    line-height: 24px;
    font-size: 18px;
  }
`;

const PartnersItem = styled.div`
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: #000;
  &:nth-child(2n) {
    background: #f8f7fc;
  }
  @media only screen and (max-device-width: 480px) {
    height: 38px;
  }
`;

const PartnersItemTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-right: 200px;

  @media only screen and (max-device-width: 767px) {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    margin-right 5%;
  }

  @media only screen and (min-device-width: 360px) and (max-device-width: 400px) {
    margin-right: 7%;
  }
  @media only screen and (min-device-width: 400px) and (max-device-width: 409px) {
    margin-right: 8%;
  }
  @media only screen and (min-device-width: 410px) and (max-device-width: 420px) {
    margin-right: 9%;
  }
  @media only screen and (min-device-width: 420px) and (max-device-width: 448px) {
    margin-right: 10%;
  }
  @media only screen and (min-device-width: 445px) and (max-device-width: 449px) {
    margin-right: 11%;
  }
  @media only screen and (min-device-width: 450px) and (max-device-width: 767px) {
    margin-right: 11%;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    font-weight: 14px;
    line-height: 20px;
    margin-right: 20%;
  } 
  @media only screen and (min-device-width: 850px) and (max-device-width: 999px) {
    margin-right: 21%;
  } 
  @media only screen and (min-device-width: 1000px) and (max-device-width: 1024px) {
    margin-right: 23%;
  }
`;

const PartnersItemData = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  &:nth-child(2) {
    width: 285px;
  }

  &:nth-child(3) {
    width: 300px;
  }
  @media only screen and (max-device-width: 767px) {
    font-size: 12px;
    line-height: 18px;

    &:nth-child(2) {
      width: 60px;
    }
    &:nth-child(3) {
      width: 60px;
    }
    margin-right: 10%;
  }
  @media only screen and (max-device-width: 369px) {
    &:nth-child(2) {
      width: 36px;
    }
    margin-right: 15%;
    &:nth-child(3) {
      width: 36px;
    }
  }
  @media only screen and (max-device-width: 359px) {
    &:nth-child(3) {
      margin-right: 17%;
    }
  }
  @media only screen and (min-device-width: 370px) and (max-device-width: 449px) {
    margin-right: 11%;
  }
  @media only screen and (min-device-width: 370px) and (max-device-width: 375px) {
    margin-right: 9%;
  }
  @media only screen and (min-device-width: 376px) and (max-device-width: 379px) {
    margin-right: 9%;
    &:nth-child(2) {
      margin-right: 10%;
    }
  }
  @media only screen and (min-device-width: 380px) and (max-device-width: 389px) {
    &:nth-child(3) {
      margin-right: 9%;
    }
  }
  @media only screen and (min-device-width: 450px) and (max-device-width: 767px) {
    margin-right: 10%;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    font-size: 14px;
    line-height: 20px;
    margin-right: 9%;
    &:nth-child(2) {
      width: 100px;
    }
    &:nth-child(3) {
      width: 100px;
    }
  }
  @media only screen and (min-device-width: 850px) and (max-device-width: 999px) {
    margin-right: 8%;
  }
  @media only screen and (min-device-width: 1000px) and (max-device-width: 1024px) {
    margin-right: 6%;
    &:nth-child(3) {
      margin-right: 7%;
    }
  }
`;
