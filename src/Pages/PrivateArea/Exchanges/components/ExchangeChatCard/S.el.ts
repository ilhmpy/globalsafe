import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import { RightSide as BaseRightSide } from '../../../components/ui';


export const RightSide = styled(BaseRightSide)`
    padding: 0;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const BlockWrapper = styled.div`
  margin-bottom: 20px;
`;

export const TitleBlockWrapper = styled.div`
  margin-bottom: 40px;
`;

export const Space = styled.div<{gap?: number, justify?: string}>`
  display: flex;
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};
  gap: ${props => props.gap ? `${props.gap}px` : '10px'};
`;

export const Link = styled(NavLink)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 300;
  color: ${props => props.theme.black};
  text-decoration: underline;
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 748px;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid #EBEBF2;
`;

export const ChatContainer = styled.div`
    margin-top: 56px;
    padding: 40px 40px 0px 40px;
    overflow-y: scroll;
    height: 100%;
    &::-webkit-scrollbar {
        display: none;
      }
`;

export const ChatFooter = styled.div`
  padding: 20px 40px 40px 40px;
  display: flex;
  align-items-center;
  justify-content: center;
  border-top: 1px solid #EBEBF2;
`;


export const SendMessageForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SendInput = styled.input`
    padding: 12px;
    flex: 1;
    background: #F9FAFB;
    border: 1px solid #EDF0F7;
    border-radius: 4px;
    outline: none;
    font-size: 14px;
    line-height: 16px;
    margin: 0 20px;

    &::placeholder {
        opacity: 0.4;
    }

    &:focus {
        outline: 1px solid #0094FF;
    }
`;

export const SendButton = styled.button`
    background: transparent;
    cursor: pointer;
`;

export const FileUpload = styled.label`
    cursor: pointer;
`;

export const FileInput = styled.input`
    
`;

export const LoaderContainer = styled.div`
  margin-right: 20px;
  display: flex;
  justify-content: flex-end;
  height: 120px;
`

export const ImageContainer = styled.div`
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  width: 100%;
  margin: 0 auto;
  padding: 25px 48px;
  position: relative;
  @media (max-width: 576px) {
    width: 100%;
    padding: 40px 0px;
    height: 100vh;
  }
  img {
    max-width: 100% !important;
    height: 100%;
    object-fit: contain;
  }
`;