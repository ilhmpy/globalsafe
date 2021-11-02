import { useEffect, useState, useContext } from "react";
import * as MB from "./MobileModal.elements";
import { Header } from "../../../../components/Header/Header";
import { Footer } from '../../../../components/Footer/Footer';
import { ViewExchangeModel, ExchangeState } from '../../../../types/exchange';
import { Balance } from '../../../../types/balance';
import { FiatKind } from "../../../../types/fiatKind";
import { countVolumeToShow, getFiatKindByStringName } from "../../utils";
import { Exchange } from "../../Exchanges/components/OwnActiveExchangesTable/S.el";
import { AppContext } from "../../../../context/HubContext";
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";

export const MobileModal = () => {
    const { account } = useContext(AppContext);
    const [exchange, setExchange] = useState<ViewExchangeModel | null>(null);
    const [feed, setFeed] = useState<string | undefined>();
    const buyer = () => {
        return (
          (exchange && exchange.kind === 0 && exchange.ownerSafeId !== account.safeId) ||
          (exchange && exchange.kind === 1 && exchange.ownerSafeId === account.safeId)
        );
      };
    
      const [owner, setOwner] = useState<'seller' | 'buyer'>(buyer() ? 'buyer' : 'seller');

    useEffect(() => {
        const exc = localStorage.getItem("mobileResultData");
        const feedback = localStorage.getItem("feedback");
        if (exc && feedback) {
            setExchange(JSON.parse(exc));
            setFeed(feedback);
        };
    }, []);

    function redirect() {
       localStorage.removeItem("mobileResultData");
       localStorage.removeItem("feedback");
       window.location.href = "/info/p2p-changes/own";
    };

    if (!exchange) {
        return <div></div>
    };

    console.log(exchange)

    function getString() {
        if (exchange) {
            return (
                <>
                    {owner === "seller" && exchange.state === ExchangeState.Completed && "Продано"} 
                    {owner === "buyer" && exchange.state === ExchangeState.Completed && "Куплено"}  
                    {exchange.state === ExchangeState.Cancelled && "Количество"}
                </>
            );
        };
    };

    console.log(owner);

    return (
        <div>
          <Header />
          <MB.ModalBox>
              <MB.ModalContainer> 
                  <MB.ModalTitle>
                      {exchange.state === ExchangeState.Completed ? "Обмен успешно завершен" : "Обмен отменен"}
                  </MB.ModalTitle>
                  <MB.ModalWhiteBox>
                     {exchange.state === ExchangeState.Cancelled && (
                         <MB.ModalLine>
                             <MB.ModalContent main>
                                {owner === "seller" ? "Покупатель отменил" : "Вы успешно отменили"} обмен {Balance[exchange.assetKind]} на {FiatKind[exchange.exchangeAssetKind]}:
                             </MB.ModalContent>
                         </MB.ModalLine>
                      )}
                      <MB.ModalLine>
                          <MB.ModalContent main>
                            {getString()} {Balance[exchange.assetKind]}:
                          </MB.ModalContent>
                          <MB.ModalContent text>
                              {(countVolumeToShow(exchange.volume, exchange.assetKind)).toLocaleString('ru-RU', { maximumFractionDigits: 5 })}
                          </MB.ModalContent>
                      </MB.ModalLine>
                      <MB.ModalLine>
                          <MB.ModalContent main>Стоимость {FiatKind[exchange.exchangeAssetKind]}:</MB.ModalContent>
                          <MB.ModalContent text>
                            {(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
                          </MB.ModalContent>
                      </MB.ModalLine>
                      <MB.ModalLine>
                        {exchange.state === ExchangeState.Completed && (
                            <>
                              <MB.ModalContent main>Ваша оценка {owner === "seller" ? "покупателю" : "продавцу"}:</MB.ModalContent>
                              <MB.ModalContent text>{(Number(feed)).toFixed(1)}</MB.ModalContent>
                           </>
                        )}
                      </MB.ModalLine>                    
                      <MB.ModalButton onClick={redirect}>К списку обменов</MB.ModalButton>
                  </MB.ModalWhiteBox>
              </MB.ModalContainer>
          </MB.ModalBox>
          <Footer />
        </div>
      );
}; 