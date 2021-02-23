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
        <p>
          Партнерка для всех видов контракта: 5% c первой линии; 1% - со второй
          линии; 1% - с третьей линии в глубину.
        </p>
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
            <Text>Депозит на срок 3 месяца:</Text>
            <Text>⁃ от 500 CWD на условиях 50/50</Text>
            {/* <Text>⁃ от 30.000 CWD на условиях 55/45</Text> */}
            <Text>
              Выплата первой прибыли от Фонда через два месяца после размещения
              доверительного депозита.
            </Text>
          </div>
          <input
            className="link"
            type="hidden"
            value="https://crowdwiz.biz/shopping/payment?to_name=start-1&amount=500"
          />

          <Button
            onClick={() =>
              handleClick(
                "https://crowdwiz.biz/shopping/payment?to_name=start-1&amount=500",
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
            <Text>Депозит от 1000 CWD на срок 5 месяцев</Text>
            <Text>На условиях 90/10</Text>
            {/*<Text>⁃ от 30.000 CWD на условиях 55/45</Text>*/}
            <Text>
              Прибыль выплачивается в конце срока размещения депозита. Тело
              депозита заморожено на весь срок.
            </Text>
          </div>
          <input
            type="hidden"
            value="https://crowdwiz.biz/shopping/payment?to_name=expert-10&amount=1000"
          />
          <Button
            onClick={() =>
              handleClick(
                "https://crowdwiz.biz/shopping/payment?to_name=expert-10&amount=1000",
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
            <Text>На условиях 80/20</Text>
            <Text>
              Выплата прибыли (80% от прибыли вашего депозита) каждый месяц в
              течение всего срока размещения. Тело депозита заморожено на весь
              срок.
            </Text>
          </div>
          <input
            type="hidden"
            value="https://crowdwiz.biz/shopping/payment?to_name=infinity-8&amount=1000"
          />
          <Button
            onClick={() =>
              handleClick(
                "https://crowdwiz.biz/shopping/payment?to_name=infinity-8&amount=1000",
                1000
              )
            }
            red
          >
            Хочу Infinity
          </Button>
        </BlockItem>

        <BlockItem>
          <BlockTitle>Start 30 000+</BlockTitle>
          <div>
            <Text>Депозит на срок 3 месяца:</Text>
            {/* <Text>⁃ от 500 CWD на условиях 50/50</Text> */}
            <Text>⁃ от 30.000 CWD на условиях 55/45</Text>
            <Text>
              Выплата первой прибыли от Фонда через два месяца после размещения
              доверительного депозита
            </Text>
          </div>
          <input
            type="hidden"
            value="https://crowdwiz.biz/shopping/payment?to_name=start2&amount=30000"
          />
          <Button
            onClick={() =>
              handleClick(
                "https://crowdwiz.biz/shopping/payment?to_name=start2&amount=30000",
                30000
              )
            }
            pink
          >
            Хочу START 30 000+
          </Button>
        </BlockItem>

        <BlockItem>
          <BlockTitle>ЖИЛФОНД</BlockTitle>
          <div>
            <Text>Депозит от 8000 CWD на срок 6 месяцев:</Text>
            <Text>
              Накопить на ПЕРВОНАЧАЛЬНЫЙ взнос (минимум 30% от стоимости
              квартиры):
            </Text>
            <Text>
              Полная заморозка депозита на условиях выплаты вашей прибыли от
              Фонда через 6 месяцев напрямую в кооператив.
            </Text>
          </div>
          <input
            type="hidden"
            value="https://crowdwiz.biz/shopping/payment?to_name=platinum-if&amount=8000"
          />
          <Button
            onClick={() =>
              handleClick(
                "https://crowdwiz.biz/shopping/payment?to_name=platinum-if&amount=8000",
                8000
              )
            }
            purple
          >
            Хочу ЖИЛФОНД
          </Button>
        </BlockItem>

        <BlockItem>
          <BlockTitle>АВТОБОНУС</BlockTitle>
          <div>
            <Text>
              Приобретение АВТОМОБИЛЯ всего за 30, 35, 40 или 45% от его
              рыночной стоимости
            </Text>
            <Text>1 НЕДЕЛЯ (30/70) с 19/02 по 25/02:</Text>
            <Text>
              Вы вносите 30% стоимости автомобиля (в CWD) на аккаунт Фонда.
              <br />
              Через 5 месяцев Фонд добавляет 70% от стоимости автомобиля
            </Text>
          </div>
          <input
            type="hidden"
            value="https://crowdwiz.biz/shopping/payment?to_name=global-car&amount=10000"
          />
          <Button
            onClick={() =>
              handleClick(
                "https://crowdwiz.biz/shopping/payment?to_name=global-car&amount=10000",
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
                <Text>Депозит на срок 3 месяца:</Text>
                <Text>⁃ от 500 CWD на условиях 50/50</Text>
                {/* <Text>⁃ от 30.000 CWD на условиях 55/45</Text> */}
                <Text>
                  Выплата первой прибыли от Фонда через два месяца после
                  размещения доверительного депозита.
                </Text>
              </div>
              <input
                className="link"
                type="hidden"
                value="https://crowdwiz.biz/shopping/payment?to_name=start-1&amount=500"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://crowdwiz.biz/shopping/payment?to_name=start-1&amount=500",
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
                <Text>Депозит от 1000 CWD на срок 5 месяцев</Text>
                <Text>На условиях 90/10</Text>
                <Text>
                  Прибыль выплачивается в конце срока размещения депозита. Тело
                  депозита заморожено на весь срок.
                </Text>
              </div>
              <input
                type="hidden"
                value="https://crowdwiz.biz/shopping/payment?to_name=expert-10&amount=1000"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://crowdwiz.biz/shopping/payment?to_name=expert-10&amount=1000",
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
                <Text>На условиях 80/20</Text>
                <Text>
                  Выплата прибыли (80% от прибыли вашего депозита) каждый месяц
                  в течение всего срока размещения. Тело депозита заморожено на
                  весь срок.
                </Text>
              </div>
              <input
                type="hidden"
                value="https://crowdwiz.biz/shopping/payment?to_name=infinity-8&amount=1000"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://crowdwiz.biz/shopping/payment?to_name=infinity-8&amount=1000",
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
              <BlockTitle>Start 30 000+</BlockTitle>
              <div>
                <Text>Депозит на срок 3 месяца:</Text>
                {/* <Text>⁃ от 500 CWD на условиях 50/50</Text> */}
                <Text>⁃ от 30.000 CWD на условиях 55/45</Text>
                <Text>
                  Выплата первой прибыли от Фонда через два месяца после
                  размещения доверительного депозита
                </Text>
              </div>
              <input
                type="hidden"
                value="https://crowdwiz.biz/shopping/payment?to_name=start2&amount=30000"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://crowdwiz.biz/shopping/payment?to_name=start2&amount=30000",
                    30000
                  )
                }
                pink
              >
                Хочу START 30 000+
              </Button>
            </BlockItem>
          </SwiperSlide>
          <SwiperSlide>
            <BlockItem>
              <BlockTitle>ЖИЛФОНД</BlockTitle>
              <div>
                <Text>Депозит от 8000 CWD на срок 6 месяцев:</Text>
                <Text>
                  Накопить на ПЕРВОНАЧАЛЬНЫЙ взнос (минимум 30% от стоимости
                  квартиры):
                </Text>
                <Text>
                  Полная заморозка депозита на условиях выплаты вашей прибыли от
                  Фонда через 6 месяцев напрямую в кооператив.
                </Text>
              </div>
              <input
                type="hidden"
                value="https://crowdwiz.biz/shopping/payment?to_name=platinum-if&amount=8000"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://crowdwiz.biz/shopping/payment?to_name=platinum-if&amount=8000",
                    8000
                  )
                }
                purple
              >
                Хочу ЖИЛФОНД
              </Button>
            </BlockItem>
          </SwiperSlide>
          <SwiperSlide>
            <BlockItem>
              <BlockTitle>АВТОБОНУС</BlockTitle>
              <div>
                <Text>
                  Приобретение АВТОМОБИЛЯ всего за 30, 35, 40 или 45% от его
                  рыночной стоимости
                </Text>
                <Text>1 НЕДЕЛЯ (30/70) с 19/02 по 25/02:</Text>
                <Text>
                  Вы вносите 30% стоимости автомобиля (в CWD) на аккаунт
                  Фонда.
                  <br /> Через 5 месяцев Фонд добавляет 70% от стоимости
                  автомобиля
                </Text>
              </div>
              <input
                type="hidden"
                value="https://crowdwiz.biz/shopping/payment?to_name=global-car&amount=10000"
              />
              <Button
                onClick={() =>
                  handleClick(
                    "https://crowdwiz.biz/shopping/payment?to_name=global-car&amount=10000",
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
