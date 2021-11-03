import React, { FC, useState } from 'react';
import { ReactComponent as ListIcon } from '../../../../assets/v2/svg/list.svg';
import { ReactComponent as ListFillIcon } from '../../../../assets/v2/svg/listfill.svg';
import { ReactComponent as TileIcon } from '../../../../assets/v2/svg/tile.svg';
import { ReactComponent as TileFillIcon } from '../../../../assets/v2/svg/tilefill.svg';
import * as S from './S.el';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import styled from 'styled-components';
interface FilterProps {
  activeFilter: 'active' | 'archived' | 'hold';
  setActiveFilter: (value: 'active' | 'archived' | 'hold') => void;
  buttons?: any[];
  withCustomButtons?: boolean;
  withoutViewType?: boolean;
  withoutContainer?: boolean;
  viewType?: string;
  setViewType?: (viewType: string) => void;
}

export const Filter: FC<FilterProps> = ({
  activeFilter,
  setActiveFilter,
  buttons,
  withCustomButtons,
  withoutViewType,
  withoutContainer,
  viewType,
  setViewType,
}: FilterProps) => {
  const handleActive = (type: string) => {
    if (type !== viewType) setViewType?.(type);
  };

  const { screen } = window;

  return (
    <S.Container without={withoutContainer}>
      {screen.width > 768 ? (
        <>
          <S.Buttons>
            {!withCustomButtons ? (
              <>
                <S.Button
                  active={activeFilter === 'active'}
                  onClick={() => setActiveFilter('active')}
                >
                  Активные
                </S.Button>
                <S.Button active={activeFilter === 'hold'} onClick={() => setActiveFilter('hold')}>
                  С отложенными выплатами
                </S.Button>
                <S.Button
                  active={activeFilter === 'archived'}
                  onClick={() => setActiveFilter('archived')}
                >
                  В архиве
                </S.Button>
              </>
            ) : (
              <>
                {buttons &&
                  buttons.map((button, idx) => (
                    <S.Button
                      key={idx}
                      active={activeFilter === button.active}
                      onClick={() => setActiveFilter(button.active)}
                    >
                      {button.text}
                    </S.Button>
                  ))}
              </>
            )}
          </S.Buttons>
          {!withoutViewType && (
            <S.FilterTypes>
              <S.FilterTypeList onClick={() => handleActive('list')}>
                {viewType === 'list' ? <ListFillIcon /> : <ListIcon />}
              </S.FilterTypeList>
              <S.FilterTypeTile onClick={() => handleActive('tile')}>
                {viewType === 'tile' ? <TileFillIcon /> : <TileIcon />}
              </S.FilterTypeTile>
            </S.FilterTypes>
          )}
        </>
      ) : (
        <SwiperUI
          //   onClick={() => console.log(111)}
          //   slidesPerView={3}
          spaceBetween={10}
          slidesPerView={'auto'}
          freeMode={true}
          //   freeMode={true}
          //   pagination={false}
          //   className="mySwiper"
          //   onSlideChange={(swiperCore) => {
          //     const { activeIndex, previousIndex, realIndex } = swiperCore;
          //     console.log({ activeIndex, previousIndex, realIndex });
          //   }}
          // slideToClickedSlide={true}

          //   onSwiper={(swiper) => console.log(swiper)}
          // navigation={{
          //   nextEl: '.next',
          //   prevEl: '.prev',
          // }}
          //   onInit={(swiper) => {
          //     swiper.navigation.update();
          //   }}
        >
          <SwiperSlide>
            <S.Button active={activeFilter === 'active'} onClick={() => setActiveFilter('active')}>
              Активные
            </S.Button>
          </SwiperSlide>
          <SwiperSlide>
            <S.Button active={activeFilter === 'hold'} onClick={() => setActiveFilter('hold')}>
              С отложенными выплатами
            </S.Button>
          </SwiperSlide>
          <SwiperSlide>
            <S.Button
              active={activeFilter === 'archived'}
              onClick={() => setActiveFilter('archived')}
            >
              В архиве
            </S.Button>
          </SwiperSlide>
        </SwiperUI>
      )}
    </S.Container>
  );
};
const SwiperSlideUI = styled(Swiper)`
  max-width: fit-content !important;
`;
const SwiperUI = styled(Swiper)`
  display: flex;
  align-items: center;
  /* gap: 40px; */

  & .swiper-slide {
    /* width: auto !important; */
    max-width: fit-content !important;
  }
`;
