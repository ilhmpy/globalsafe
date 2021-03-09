import React, { useState, useRef, useEffect } from "react";
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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const Tariffs = () => {
  const [isNormalOpen, setIsNormalOpen] = useState(false);
  const [oldLink, setOldLink] = useState("");
  const [link, setLink] = useState("");
  const [min, setMin] = useState(500);
  const [value, setValue] = useState("");
  const history = useHistory();
  const inputRef = useRef<any>(null);

  const handleClick = (str: string, num: number) => {
    setIsNormalOpen(true);
    setValue("");
    setLink(str);
    setOldLink(str);
    const val: any = /\d{3,}/g.exec(str);
    setMin(val[0]);
  };

  useEffect(() => {
    if (value) {
      inputRef.current.focus();
    }
  }, [value]);

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

  return (
    <div>
      <Container id="tariffs">
        <UpTitle small>Тарифы</UpTitle>
      </Container>
      <Container>
        <H1>Для Вас !</H1>
      </Container>
      <DescContainer>
        <p>Партнерка для контрактов START, EXPERT, INFINITY: 5% c первой линии; 2% со второй линии; 1% с третьей линиии</p>
				<p>Партнерка для контрактов АВТОБОНУС: 3% c первой линии; 1,5% со второй и 1% c третьей линии;</p>
      </DescContainer>
      {isNormalOpen && (
        <Modal onClose={() => setIsNormalOpen(false)}>
          <ModalBlock>
            <ModalTitle>Размер депозита</ModalTitle>
            <Input
              onChange={onChange}
              placeholder={min.toString()}
              type="number"
              ref={inputRef}
              value={value}
            />
            <ModalButton href={link} danger>
              ОК
            </ModalButton>
          </ModalBlock>
        </Modal>
      )}
      <BlockContainers>
        <BlockItem>
          <BlockTitle>START</BlockTitle>
          <div className="item__subtitle">
            <Text>Депозит от 500 CWD на срок 4 месяца:</Text>
            <Text>На условиях 50/50</Text>
            {/* <Text>⁃ от 30.000 CWD на условиях 55/45</Text> */}
            <Text>
              Выплата первой прибыли от Фонда 
							каждые два месяца после размещения 
							доверительного депозита.
            </Text>
          </div>
          <input
            className="link"
            type="hidden"
            value="https://cwd.global/shopping/payment?to_name=start-1&amount=500"
          />

          <Button
            onClick={() =>
              handleClick(
                "https://cwd.global/shopping/payment?to_name=start-1&amount=500",
                500
              )
            }
            green
          >
            Хочу Start
          </Button>
        </BlockItem>

        <BlockItem>
          <BlockTitle>EXPERT</BlockTitle>
          <div>
            <Text>Депозит от 1000 CWD на срок 6 месяцев</Text>
            <Text>На условиях 80/20</Text>
            {/*<Text>⁃ от 30.000 CWD на условиях 55/45</Text>*/}
            <Text>
              Прибыль выплачивается в конце срока размещения депозита. Тело
              депозита заморожено на весь срок.
            </Text>
          </div>
          <input
            type="hidden"
            value="https://cwd.global/shopping/payment?to_name=expert-10&amount=1000"
          />
          <Button
            onClick={() =>
              handleClick(
                "https://cwd.global/shopping/payment?to_name=expert-10&amount=1000",
                1000
              )
            }
            blue
          >
            Хочу Expert
          </Button>
        </BlockItem>

        <BlockItem>
          <BlockTitle>INFINITY</BlockTitle>
          <div>
            <Text>Депозит от 1000 CWD на срок 8 месяцев</Text>
            <Text>На условиях 70/30</Text>
            <Text>
              Выплата прибыли (70% от прибыли вашего депозита) каждые два месяца в
              течение всего срока размещения. Тело депозита заморожено на весь
              срок.
            </Text>
          </div>
          <input
            type="hidden"
            value="https://cwd.global/shopping/payment?to_name=infinity-8&amount=1000"
          />
          <Button
            onClick={() =>
              handleClick(
                "https://cwd.global/shopping/payment?to_name=infinity-8&amount=1000",
                1000
              )
            }
            red
          >
            Хочу Infinity
          </Button>
        </BlockItem>

        <BlockItem>
          <BlockTitle>АВТОБОНУС</BlockTitle>
          <div>
            <Text>
              Приобретение АВТОМОБИЛЯ всего за 40% от его
              рыночной стоимости
            </Text>
            <Text>3 НЕДЕЛЯ (40/60) с 06/03 (с 21:00) по 13/03 (до 20:59):</Text>
            <Text>
              Вы вносите 40% стоимости автомобиля (в CWD) на аккаунт Фонда.
              <br />
              Через 5 месяцев Фонд добавляет 60% от стоимости автомобиля
            </Text>
          </div>
          <input
            type="hidden"
            value="https://cwd.global/shopping/payment?to_name=global-car&amount=10000"
          />
          <Button
            onClick={() =>
              handleClick(
                "https://cwd.global/shopping/payment?to_name=global-car&amount=10000",
                100000
              )
            }
            yellow
          >
            Хочу Автобонус
          </Button>
        </BlockItem>
      </BlockContainers>
      <SwiperContainer>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <BlockItem>
              <BlockTitle>START</BlockTitle>
              <div className="item__subtitle">
                <Text>Депозит от 500 CWD на срок 4 месяца:</Text>
                <Text>На условиях 50/50</Text>
                {/* <Text>⁃ от 30.000 CWD на условиях 55/45</Text> */}
                <Text>
                  Выплата первой прибыли от Фонда каждые два месяца после
                  размещения доверительного депозита.
                </Text>
              </div>
              <input
                className="link"
                type="hidden"
                value="https://cwd.global/shopping/payment?to_name=start-1&amount=500"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://cwd.global/shopping/payment?to_name=start-1&amount=500",
                    500
                  )
                }
                green
              >
                Хочу Start
              </Button>
            </BlockItem>
          </SwiperSlide>
          <SwiperSlide>
            <BlockItem>
              <BlockTitle>EXPERT</BlockTitle>
              <div>
                <Text>Депозит от 1000 CWD на срок 6 месяцев</Text>
                <Text>На условиях 80/20</Text>
                <Text>
                  Прибыль выплачивается в конце срока размещения депозита. Тело
                  депозита заморожено на весь срок.
                </Text>
              </div>
              <input
                type="hidden"
                value="https://cwd.global/shopping/payment?to_name=expert-10&amount=1000"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://cwd.global/shopping/payment?to_name=expert-10&amount=1000",
                    1000
                  )
                }
                blue
              >
                Хочу Expert
              </Button>
            </BlockItem>
          </SwiperSlide>
          <SwiperSlide>
            <BlockItem>
              <BlockTitle>INFINITY</BlockTitle>
              <div>
                <Text>Депозит от 1000 CWD на срок 8 месяцев</Text>
                <Text>На условиях 70/30</Text>
                <Text>
                  Выплата прибыли (70% от прибыли вашего депозита) каждые два месяца
                  в течение всего срока размещения. Тело депозита заморожено на
                  весь срок.
                </Text>
              </div>
              <input
                type="hidden"
                value="https://cwd.global/shopping/payment?to_name=infinity-8&amount=1000"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://cwd.global/shopping/payment?to_name=infinity-8&amount=1000",
                    1000
                  )
                }
                red
              >
                Хочу Infinity
              </Button>
            </BlockItem>
          </SwiperSlide>
          <SwiperSlide>
            <BlockItem>
              <BlockTitle>АВТОБОНУС</BlockTitle>
              <div>
                <Text>
                  Приобретение АВТОМОБИЛЯ всего за 40% от его
                  рыночной стоимости
                </Text>
                <Text>3 НЕДЕЛЯ (40/60) с 06/03 (с 21:00) по 13/03 (до 20:59):</Text>
                <Text>
                  Вы вносите 40% стоимости автомобиля (в CWD) на аккаунт
                  Фонда.
                  <br /> Через 5 месяцев Фонд добавляет 60% от стоимости
                  автомобиля
                </Text>
              </div>
              <input
                type="hidden"
                value="https://cwd.global/shopping/payment?to_name=global-car&amount=10000"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://cwd.global/shopping/payment?to_name=global-car&amount=10000",
                    10000
                  )
                }
                yellow
              >
                Хочу Автобонус
              </Button>
            </BlockItem>
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>
    </div>
  );
};
