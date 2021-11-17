import { FC, useEffect, useState, useRef } from 'react';
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
import { MobChart } from './MobChart';

SwiperCore.use([Navigation, Thumbs, Pagination, A11y]);

type Props = {
  listDIAMOND: Collection[];
  listGLOBAL: Collection[];
  listMGCWD: Collection[];
  listGCWD: Collection[];
  fetchMGCWD: (d: string) => void;
  fetchGCWD: (d: string) => void;
  fetchDIAMOND: (d: string) => void;
  fetchGLOBAL: (d: string) => void;
};

export const SliderChart: FC<Props> = ({
  listDIAMOND,
  listGLOBAL,
  listMGCWD,
  listGCWD,
  fetchMGCWD,
  fetchGCWD,
  fetchDIAMOND,
  fetchGLOBAL,
}: Props) => {
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
      {/* <MobChart data={listGCWD} type="GCWD" /> */}
      <S.SwiperContainer>
        <Swiper
          spaceBetween={0}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
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
            {({ isActive }) =>
              isActive ? (
                <>
                  <ChartActiv
                    data={listGCWD}
                    type="GCWD"
                    fetchMGCWD={fetchMGCWD}
                    fetchGCWD={fetchGCWD}
                    fetchDIAMOND={fetchDIAMOND}
                    fetchGLOBAL={fetchGLOBAL}
                  />
                  <S.SubChartMob>
                    <S.ChartItem>
                      {listGCWD.length ? (
                        <>
                          <S.ChartName>GCWD </S.ChartName>
                          <S.ChartValue>
                            {(listGCWD[listGCWD.length - 1].latestBid / 100000).toLocaleString(
                              'ru-RU',
                              {
                                maximumFractionDigits: 2,
                              }
                            )}{' '}
                            CWD
                          </S.ChartValue>
                          {changeValue(listGCWD)}
                          <S.ChartGraph>
                            <SmallChart values={listGCWD.slice(0).map((i) => i.latestBid / 100)} />
                          </S.ChartGraph>
                        </>
                      ) : null}
                    </S.ChartItem>
                  </S.SubChartMob>
                </>
              ) : null
            }
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) =>
              isActive ? (
                <>
                  <ChartActiv
                    data={listMGCWD}
                    type="MGCWD"
                    fetchMGCWD={fetchMGCWD}
                    fetchGCWD={fetchGCWD}
                    fetchDIAMOND={fetchDIAMOND}
                    fetchGLOBAL={fetchGLOBAL}
                  />
                  <S.SubChartMob>
                    <S.ChartItem>
                      {listMGCWD.length ? (
                        <>
                          <S.ChartName>MGCWD</S.ChartName>
                          <S.ChartValue>
                            {(listMGCWD[listMGCWD.length - 1].latestBid / 100000).toLocaleString(
                              'ru-RU',
                              {
                                maximumFractionDigits: 2,
                              }
                            )}{' '}
                            CWD
                          </S.ChartValue>
                          {changeValue(listMGCWD)}
                          <S.ChartGraph>
                            <SmallChart values={listMGCWD.slice(0).map((i) => i.latestBid / 100)} />
                          </S.ChartGraph>
                        </>
                      ) : null}
                    </S.ChartItem>
                  </S.SubChartMob>
                </>
              ) : null
            }
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) =>
              isActive ? (
                <>
                  <ChartActiv
                    data={listDIAMOND}
                    type="DIAMOND"
                    fetchMGCWD={fetchMGCWD}
                    fetchGCWD={fetchGCWD}
                    fetchDIAMOND={fetchDIAMOND}
                    fetchGLOBAL={fetchGLOBAL}
                  />
                  <S.SubChartMob>
                    <S.ChartItem>
                      {listDIAMOND.length ? (
                        <>
                          <S.ChartName>DIAMOND</S.ChartName>
                          <S.ChartValue>
                            {(listDIAMOND[listDIAMOND.length - 1].latestBid / 100).toLocaleString(
                              'ru-RU',
                              {
                                maximumFractionDigits: 2,
                              }
                            )}{' '}
                            CWD
                          </S.ChartValue>
                          {changeValue(listDIAMOND)}
                          <S.ChartGraph>
                            <SmallChart
                              values={listDIAMOND.slice(0).map((i) => i.latestBid / 100)}
                            />
                          </S.ChartGraph>
                        </>
                      ) : null}
                    </S.ChartItem>
                  </S.SubChartMob>
                </>
              ) : null
            }
          </SwiperSlide>
          <SwiperSlide>
            {({ isActive }) =>
              isActive ? (
                <>
                  <ChartActiv
                    data={listGLOBAL}
                    type="GLOBAL"
                    fetchMGCWD={fetchMGCWD}
                    fetchGCWD={fetchGCWD}
                    fetchDIAMOND={fetchDIAMOND}
                    fetchGLOBAL={fetchGLOBAL}
                  />
                  <S.SubChartMob>
                    <S.ChartItem>
                      {listGLOBAL.length ? (
                        <>
                          <S.ChartName>GLOBAL</S.ChartName>
                          <S.ChartValue>
                            {listGLOBAL.length
                              ? (
                                  listGLOBAL[listGLOBAL.length - 1].latestBid / 10000
                                ).toLocaleString('ru-RU', {
                                  maximumFractionDigits: 2,
                                })
                              : 0}{' '}
                            CWD
                          </S.ChartValue>

                          <S.ChartProcent red={false}>{changeValue(listGLOBAL)}</S.ChartProcent>

                          <S.ChartGraph>
                            <SmallChart
                              values={listGLOBAL.slice(0).map((i) => i.latestBid / 100)}
                            />
                          </S.ChartGraph>
                        </>
                      ) : null}
                    </S.ChartItem>
                  </S.SubChartMob>
                </>
              ) : null
            }
          </SwiperSlide>
        </Swiper>
        <S.ThumbSlider>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={20}
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
            <SwiperSlide className="thumb">
              <S.ChartItem>
                {listGCWD.length ? (
                  <>
                    <S.ChartName>GCWD</S.ChartName>
                    <S.ChartValue>
                      {(listGCWD[listGCWD.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                        maximumFractionDigits: 2,
                      })}{' '}
                      CWD
                    </S.ChartValue>
                    {changeValue(listGCWD)}
                    <S.ChartGraph>
                      <SmallChart values={listGCWD.slice(0).map((i) => i.latestBid / 100)} />
                    </S.ChartGraph>
                  </>
                ) : null}
              </S.ChartItem>
            </SwiperSlide>
            <SwiperSlide className="thumb">
              <S.ChartItem>
                {listMGCWD.length ? (
                  <>
                    <S.ChartName>MGCWD</S.ChartName>
                    <S.ChartValue>
                      {(listMGCWD[listMGCWD.length - 1].latestBid / 100000).toLocaleString(
                        'ru-RU',
                        {
                          maximumFractionDigits: 2,
                        }
                      )}{' '}
                      CWD
                    </S.ChartValue>
                    {changeValue(listMGCWD)}
                    <S.ChartGraph>
                      <SmallChart values={listMGCWD.slice(0).map((i) => i.latestBid / 100)} />
                    </S.ChartGraph>
                  </>
                ) : null}
              </S.ChartItem>
            </SwiperSlide>
            <SwiperSlide className="thumb">
              <S.ChartItem>
                {listDIAMOND.length ? (
                  <>
                    <S.ChartName>DIAMOND</S.ChartName>
                    <S.ChartValue>
                      {(listDIAMOND[listDIAMOND.length - 1].latestBid / 100).toLocaleString(
                        'ru-RU',
                        {
                          maximumFractionDigits: 2,
                        }
                      )}{' '}
                      CWD
                    </S.ChartValue>
                    {changeValue(listDIAMOND)}
                    <S.ChartGraph>
                      <SmallChart values={listDIAMOND.slice(0).map((i) => i.latestBid / 100)} />
                    </S.ChartGraph>
                  </>
                ) : null}
              </S.ChartItem>
            </SwiperSlide>
            <SwiperSlide className="thumb">
              <S.ChartItem>
                {listGLOBAL.length ? (
                  <>
                    <S.ChartName>GLOBAL</S.ChartName>
                    <S.ChartValue>
                      {listGLOBAL.length
                        ? (listGLOBAL[listGLOBAL.length - 1].latestBid / 10000).toLocaleString(
                            'ru-RU',
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        : 0}{' '}
                      CWD
                    </S.ChartValue>

                    <S.ChartProcent red={false}>{changeValue(listGLOBAL)}</S.ChartProcent>

                    <S.ChartGraph>
                      <SmallChart values={listGLOBAL.slice(0).map((i) => i.latestBid / 100)} />
                    </S.ChartGraph>
                  </>
                ) : null}
              </S.ChartItem>
            </SwiperSlide>
          </Swiper>
        </S.ThumbSlider>
      </S.SwiperContainer>
    </Container>
  );
};
