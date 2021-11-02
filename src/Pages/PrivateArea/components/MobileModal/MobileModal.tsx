import { FC } from "react";
import * as MB from "./MobileModal.elements";
import { Header } from "../../../../components/Header/Header";
import { Footer } from '../../../../components/Footer/Footer';
import { ViewExchangeModel } from '../../../../types/exchange';

export const MobileModal = () => {
    
    return (
      <div>
        <Header />
        <MB.ModalBox>
            <MB.ModalContainer> 
                
            </MB.ModalContainer>
            <Footer />
        </MB.ModalBox>
      </div>
    );
}; 