import styled from "styled-components/macro";

export const PAButton = styled.button`
   width: 100%;
   height: 40px;
   border-radius: 4px;
   background: #0094FF;
   color: #fff;
   font-size: 14px;
   font-weight: 500;
   line-height: 16px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 20px;
   margin-bottom: 20px;
   outline: none;
   border: 0;
   cursor: pointer;

   &:disabled {
      opacity: 55%;
      cursor: not-allowed;
   }
`;