import styled from 'styled-components/macro';

export const Block = styled.div`
  .slick-slider {
    width: 100% !important;
  }

  .slick-list {
    overflow: hidden !important;
    width: 100% !important;
  }

  .slick-track {
    display: flex !important;
  }
`;

export const CardBox = styled.div`
    width: auto;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    min-height: 250px;
    margin: 0 auto;

    @media only screen and (max-width: 767px) {
      margin-top: 10px;
      width: 100%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      min-height: 218px;
    }
    
    .swiper-slide {
        display: flex;
        flex-wrap: wrap;
    }

    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: 28px !important;
    }
    
    .swiper-pagination-bullets > .swiper-pagination-bullet-active {
        width: 20px;
        height: 6px;
        border-radius: 6px;
        background: #0094FF !important;
    }
`;

export const Card = styled.div`
    width: 340px;
    height: 288px;
    background: ${({ theme }) => theme.depositsProgramsCards.background};
    box-shadow: ${({ theme }) => theme.depositsProgramsCards.boxShadow};
    margin: 20px;
    margin-top: 0px;
    margin-left: 0px; 
    padding: 40px;
    min-width: 340px;
    border-radius: 4px;
 
    &:nth-child(3n) { 
      margin-right: 0px;  
    }

    @media only screen and (max-width: 1024px) {
       padding: 20px;
    }

    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      min-width: 220px;
      max-width: 220px;
      height: 218px;  
    }

    @media only screen and (max-width: 767px) {
      width: 280px;
      height: 194px;
      margin: 0 auto;
      min-width: 280px;
      margin-right: 20px;
    }
`;

export const CardName = styled.h3`
    color: ${({ theme }) => theme.depositsProgramsCards.text};
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 40px;

    @media only screen and (max-width: 1024px) {
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 24px;
    }
`;

export const CardDesc = styled.h3`
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.depositsProgramsCards.text};
    opacity: ${({ theme }) => theme.depositsProgramsCards.descOpacity};
    height: 60px;
    overflow: hidden;
    width: 149px;
    text-overflow: ellipsis;
    margin-bottom: 40px;
    word-wrap: break-word;
    @media (max-width: 767px) {
        margin-bottom: 20px;
        max-width: 200px;
    }
`;

export const CardButton = styled.button`
    width: 160px;
    height: 40px;
    border-radius: 4px;
    color: #fff;
    background: ${({ theme }) => theme.main.buttonBackground};
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.3s ease 0s;

    &:hover {
      opacity: 90%;
    }

    @media (max-width: 767px) {
        width: 100%;
        max-width: 240px;
        margin: 0 auto;
    }
`;
