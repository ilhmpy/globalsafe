import styled from 'styled-components/macro';

export const CardBox = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
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

    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
      min-width: 220px;
      max-width: 220px;
      height: 218px;  
      padding: 20px;
    }
`;

export const CardName = styled.h3`
    color: #000;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 40px;

    
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
        margin-bottom: 10px;
    }
`;

export const CardDesc = styled.h3`
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #000;
    width: 100%;
    min-width: 149px;
    max-width: 160px;
    height: 60px;
    margin-bottom: 40px;
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
`;