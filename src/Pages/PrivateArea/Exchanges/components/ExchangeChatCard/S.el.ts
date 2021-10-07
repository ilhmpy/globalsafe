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
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  border-bottom: 1px solid #EBEBF2;
`;

export const ChatContainer = styled.div`
    margin-top: 56px;
    padding: 40px 40px 90px 40px;
    flex: 1;
    display: flex;
    flex-direction: column;

    max-height: 572px;
    overflow-y: scroll;

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