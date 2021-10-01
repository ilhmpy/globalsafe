import styled from 'styled-components/macro';

export const CardBox = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    min-height: 250px;

    @media only screen and (max-device-width: 480px) {
      margin-top: 10px;
    }

    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
      min-height: 218px;
    }
    
    .swiper-slide {
        display: flex;
        flex-wrap: wrap;
    }

    & > .swiper-pagination {
      bottom: 17px;
    }
    
    .swiper-pagination-bullets > .swiper-pagination-bullet-active {
        width: 20px;
        height: 6px;
        border-radius: 6px;
    }
`;

export const Card = styled.div`
    width: 340px;
    height: 288px;
    background: #fff;
    box-shadow: 0px 80px 80px -40px rgba(220, 220, 232, 0.5);
    margin: 20px;
    margin-top: 0px;
    margin-left: 0px;
    padding: 40px;
    min-width: 340px;
    border-radius: 4px;

    &:nth-child(3n) { 
      margin-right: 0px;  
    }

    @media only screen and (max-device-width: 1024px) {
       padding: 20px;
       margin-bottom: 0px;
    }

    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
      min-width: 220px;
      max-width: 220px;
      height: 218px;  
    }

    @media only screen and (max-device-width: 480px) {
      width: 280px;
      height: 194px;
      margin: 0 auto;
      min-width: 280px;
    }
`;

export const CardName = styled.h3`
    color: #000;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 40px;

    @media only screen and (max-device-width: 1024px) {
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 24px;
    }
`;

export const CardDesc = styled.h3`
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #000;
    width: 100%;
    max-width: 160px;
    height: 60px;
    margin-bottom: 40px;

    @media only screen and (max-device-width: 480px) {
        margin-bottom: 20px;
        max-width: 200px;
    }
`;

export const CardButton = styled.button`
    width: 160px;
    height: 40px;
    border-radius: 4px;
    color: #fff;
    background: #515172;
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 12px;
    font-weight: 500;
    transtion: all 0.3s ease 0s;

    &:hover {
        box-shadow: 0px 4px 10px #515172;
        border: 1px solid #515172;
    }

    @media only screen and (max-device-width: 480px) {
        width: 100%;
        max-width: 240px;
        margin: 0 auto;
    }
`;