import React, { useState, useRef, useEffect, useContext } from "react";
import { Container } from "../../../../globalStyles";
import { H1 } from "../../../../components/UI/MainStyled";
import { UpTitle } from "../../../../components/UI/UpTitle";
import { Button } from "../../../../components/Button/Button";
import {
  BlockTitle,
  DescContainer,
  BlockContainers,
  BlockItem,
  Text,
  SwiperContainer,
  ModalBlock,
  ModalButton,
  ModalTitle,
} from "./Tariffs.elements";
import { Modal } from "../../../../components/Modal/Modal";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Input } from "../../../../components/UI/Input";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../context/HubContext";
import {
  ListDeposits,
  CollectionListDeposits,
} from "../../../../types/deposits";
import { useTranslation } from "react-i18next";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Tariffs = () => {
  const [isNormalOpen, setIsNormalOpen] = useState(false);
  const [oldLink, setOldLink] = useState("");
  const [link, setLink] = useState("");
  const [min, setMin] = useState(500);
  const [value, setValue] = useState("");
  const [listDeposits, setListDeposits] = useState<CollectionListDeposits[]>(
    []
  );
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const lang = localStorage.getItem("i18nextLng") || "ru";
  const languale = lang === "ru" ? 1 : 0;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>("GetDeposits", languale, true, 0, 40)
        .then((res) => {
          console.log("GetDeposits", res);
          setListDeposits(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection, languale]);

  const handleClick = (str: string, num: number) => {
    setIsNormalOpen(true);
    setValue("");
    // setLink(str);
    const newLink = `https://cwd.global/shopping/payment?to_name=${str}&amount=${
      num / 100000
    }`;
    setLink(newLink);
    setOldLink(`https://cwd.global/shopping/payment?to_name=${str}&amount=`);
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
    const newLink = oldLink.replace(/\d{3,}/g, "");
    if (id === "") {
      setLink(newLink + min);
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
            onClick={() => handleClick(item.account, item.minAmount)}
          >
            {item.name}
          </Button>
        );
      case 1:
        return (
          <Button
            blue
            onClick={() => handleClick(item.account, item.minAmount)}
          >
            {item.name}
          </Button>
        );
      case 2:
        return (
          <Button
            danger
            onClick={() => handleClick(item.account, item.minAmount)}
          >
            {item.name}
          </Button>
        );
      case 3:
        return (
          <Button
            pink
            onClick={() => handleClick(item.account, item.minAmount)}
          >
            {item.name}
          </Button>
        );
      case 4:
        return (
          <Button
            purple
            onClick={() => handleClick(item.account, item.minAmount)}
          >
            {item.name}
          </Button>
        );

      case 5:
        return (
          <Button
            yellow
            onClick={() => handleClick(item.account, item.minAmount)}
          >
            {item.name}
          </Button>
        );

      case 6:
        return (
          <Button
            yellow
            onClick={() => handleClick(item.account, item.minAmount)}
          >
            {item.name}
          </Button>
        );
      default:
        return (
          <Button
            green
            onClick={() => handleClick(item.account, item.minAmount)}
          >
            {item.name}
          </Button>
        );
    }
  };

  return (
    <div>
      <Container id="tariffs">
        <UpTitle small>{t("tariffs.uptitle")}</UpTitle>
      </Container>
      <Container>
        <H1>{t("tariffs.H1")}</H1>
      </Container>
      <DescContainer>
        <p>{t("tariffs.desc")}</p>
      </DescContainer>
      {isNormalOpen && (
        <Modal onClose={() => setIsNormalOpen(false)}>
          <ModalBlock>
            <ModalTitle>{t("tariffs.depositSize")}</ModalTitle>
            <Input
              onChange={onChange}
              // placeholder={min.toString()}
              type="number"
              ref={inputRef}
              value={value}
            />
            <ModalButton
              as="button"
              onClick={toLink}
              danger
              disabled={+value < min}
            >
              {t("tariffs.ok")}
            </ModalButton>
          </ModalBlock>
        </Modal>
      )}
      <BlockContainers>
        {listDeposits.map((item, idx) => (
          <BlockItem key={item.safeId}>
            <BlockTitle>{item.name}</BlockTitle>
            <div className="item__subtitle">
              <Text dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
            {colors(item, idx)}
          </BlockItem>
        ))}
      </BlockContainers>
      <SwiperContainer>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
        >
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
      </SwiperContainer>
    </div>
  );
};
