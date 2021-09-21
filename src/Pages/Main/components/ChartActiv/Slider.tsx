import { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { ChartActiv } from './ChartActiv';
import * as S from './S.elements';
import { Collection } from '../../../../types/currency';
import { SmallChart } from './SmallChart';
import { Container } from '../../../../components/UI/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar, Thumbs, EffectFade } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Thumbs, Pagination, A11y]);

type Props = {
  listDIAMOND: Collection[];
  listGLOBAL: Collection[];
  listMGCWD: Collection[];
  listGCWD: Collection[];
};

export const SliderChart: FC<Props> = ({ listDIAMOND, listGLOBAL, listMGCWD, listGCWD }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [nav1, setNav1] = useState<any>();
  const [nav2, setNav2] = useState<any>();
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const changeValue = (data: Collection[]) => {
    const currValue = data[data.length - 1].latestBid;
    const prevValue = data[1].latestBid;
    const filterPrevValues = data.filter((item) => item.latestBid !== currValue);
    const value =
      ((currValue - filterPrevValues[filterPrevValues.length - 1].latestBid) / currValue) * 100;
    if (value > 0) {
      return <S.ChartProcent red={false}>{value.toFixed(2)} &nbsp;%</S.ChartProcent>;
    } else {
      return <S.ChartProcent red>{value.toFixed(2)}&nbsp;%</S.ChartProcent>;
    }
  };

  return (
    <Container pNone>
      <S.SwiperContainer>
        <Swiper
          spaceBetween={0}
          // navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
          // allowTouchMove={false}
          // effect="fade"
          // grabCursor={false}
          loop={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            '320': {
              allowTouchMove: true,
              navigation: true,
              grabCursor: true,
              loop: true,
            },
            '768': {
              allowTouchMove: false,
              navigation: false,
              grabCursor: false,
            },
          }}
        >
          <SwiperSlide>
            <ChartActiv data={listGCWD} type="GCWD" />
            <S.SubChartMob>
              {listGCWD.length ? (
                <S.ChartItem>
                  <S.ChartName>GCWD </S.ChartName>
                  <S.ChartValue>
                    {(listGCWD[listGCWD.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}{' '}
                    CWD
                  </S.ChartValue>
                  {changeValue(listGCWD)}
                  {/* <S.ChartProcent red={false}>+ 3.94 %</S.ChartProcent> */}
                  <S.ChartGraph>
                    <SmallChart values={listGCWD.slice(-20).map((i) => i.latestBid / 100)} />
                  </S.ChartGraph>
                </S.ChartItem>
              ) : null}
            </S.SubChartMob>
          </SwiperSlide>
          <SwiperSlide>
            <ChartActiv data={listMGCWD} type="MGCWD" />
            <S.SubChartMob>
              {listMGCWD.length ? (
                <S.ChartItem>
                  <S.ChartName>MGCWD</S.ChartName>
                  <S.ChartValue>
                    {(listMGCWD[listMGCWD.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}{' '}
                    CWD
                  </S.ChartValue>
                  {changeValue(listMGCWD)}
                  <S.ChartGraph>
                    <SmallChart values={listMGCWD.slice(-20).map((i) => i.latestBid / 100)} />
                  </S.ChartGraph>
                </S.ChartItem>
              ) : null}
            </S.SubChartMob>
          </SwiperSlide>
          <SwiperSlide>
            <ChartActiv data={listDIAMOND} type="DIAMOND" />
            <S.SubChartMob>
              {listDIAMOND.length ? (
                <S.ChartItem>
                  <S.ChartName>DIAMOND</S.ChartName>
                  <S.ChartValue>
                    {(listDIAMOND[listDIAMOND.length - 1].latestBid / 100).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}{' '}
                    CWD
                  </S.ChartValue>
                  {changeValue(listDIAMOND)}
                  <S.ChartGraph>
                    <SmallChart values={listDIAMOND.slice(-20).map((i) => i.latestBid / 100)} />
                  </S.ChartGraph>
                </S.ChartItem>
              ) : null}
            </S.SubChartMob>
          </SwiperSlide>
          <SwiperSlide>
            <ChartActiv data={listGLOBAL} type="GLOBAL" />
            <S.SubChartMob>
              <S.ChartItem>
                <S.ChartName>GLOBAL</S.ChartName>
                <S.ChartValue>95 389.99 CWD</S.ChartValue>
                <S.ChartProcent red={false}>+ 3.94 %</S.ChartProcent>
                <S.ChartGraph>
                  <SmallChart values={listGLOBAL.slice(-20).map((i) => i.latestBid / 100)} />
                </S.ChartGraph>
              </S.ChartItem>
            </S.SubChartMob>
          </SwiperSlide>
        </Swiper>
        <S.ThumbSlider>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            loop={false}
            watchSlidesProgress={true}
            className="mySwiper"
            breakpoints={{
              '320': {
                slidesPerView: 1,
                navigation: false,
                grabCursor: false,
              },
              '768': {
                slidesPerView: 4,
              },
            }}
          >
            <SwiperSlide>
              {listGCWD.length ? (
                <S.ChartItem>
                  <S.ChartName>GCWD </S.ChartName>
                  <S.ChartValue>
                    {(listGCWD[listGCWD.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}{' '}
                    CWD
                  </S.ChartValue>
                  {changeValue(listGCWD)}
                  <S.ChartGraph>
                    <SmallChart values={listGCWD.slice(-20).map((i) => i.latestBid / 100)} />
                  </S.ChartGraph>
                </S.ChartItem>
              ) : null}
            </SwiperSlide>
            <SwiperSlide>
              {listMGCWD.length ? (
                <S.ChartItem>
                  <S.ChartName>MGCWD</S.ChartName>
                  <S.ChartValue>
                    {(listMGCWD[listMGCWD.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}{' '}
                    CWD
                  </S.ChartValue>
                  {changeValue(listMGCWD)}
                  <S.ChartGraph>
                    <SmallChart values={listMGCWD.slice(-20).map((i) => i.latestBid / 100)} />
                  </S.ChartGraph>
                </S.ChartItem>
              ) : null}
            </SwiperSlide>
            <SwiperSlide>
              {listDIAMOND.length ? (
                <S.ChartItem>
                  <S.ChartName>DIAMOND</S.ChartName>
                  <S.ChartValue>
                    {(listDIAMOND[listDIAMOND.length - 1].latestBid / 100).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}{' '}
                    CWD
                  </S.ChartValue>
                  {changeValue(listDIAMOND)}
                  <S.ChartGraph>
                    <SmallChart values={listDIAMOND.slice(-20).map((i) => i.latestBid / 100)} />
                  </S.ChartGraph>
                </S.ChartItem>
              ) : null}
            </SwiperSlide>
            <SwiperSlide>
              <S.ChartItem>
                <S.ChartName>GLOBAL</S.ChartName>
                <S.ChartValue>95 389.99 CWD</S.ChartValue>
                <S.ChartProcent red={false}>+ 3.94 %</S.ChartProcent>
                <S.ChartGraph>
                  <SmallChart values={listGLOBAL.slice(-20).map((i) => i.latestBid / 100)} />
                </S.ChartGraph>
              </S.ChartItem>
            </SwiperSlide>
          </Swiper>
        </S.ThumbSlider>
      </S.SwiperContainer>
    </Container>
  );
};
