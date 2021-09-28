import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as S from './S.elements';
import bg from '../../../../assets/v2/images/banner/bg.jpg';
import pc from '../../../../assets/v2/images/banner/1.png';
import { Container } from '../../../../components/UI/Container';
import { Button } from '../../../../components/Button/V2/Button';

const settings = {
  //   autoplay: true,
  //   autoplaySpeed: 5000, 
  focusOnSelect: true,
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const Carousel = () => {
  return (
    <S.SliderContainer>
      <Slider
        {...settings}
        dotsClass={'dots'}
        customPaging={(page) => {
          return (
            <button className={'dots_item_click'}>
              <div className={'dots_item'}></div>
            </button>
          );
        }}
      >
        <S.SlideItemWrap>
          <S.SlideItem bg={bg}>
            <Container>
              <S.SlideBlock>
                <S.Title>Globalsafe 2.0</S.Title>
                <S.Description>
                  GlobalSafe - Это современный криптофонд для управления и приумножения ваших
                  активов под контролем лучших специалистов!
                </S.Description>
                <Button yellow>Подробнее</Button>
              </S.SlideBlock>
              <S.Image src={pc} alt="" />
            </Container>
          </S.SlideItem>
        </S.SlideItemWrap>
        <S.SlideItem bg={bg}>
          <Container>
            <S.SlideBlock>
              <S.Title>Globalsafe 2.0</S.Title>
              <S.Description>
                GlobalSafe - Это современный криптофонд для управления и приумножения ваших активов
                под контролем лучших специалистов!
              </S.Description>
              <Button yellow>Подробнее</Button>
            </S.SlideBlock>
            <S.Image src={pc} alt="" />
          </Container>
        </S.SlideItem>
      </Slider>
    </S.SliderContainer>
  );
};
