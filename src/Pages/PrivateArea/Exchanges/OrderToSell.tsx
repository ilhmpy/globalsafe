import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import * as S from './S.el';
import { OrderToSellCard } from './components/OrderToSellCard';
import { routers } from '../../../constantes/routers';

export const OrderToSell: FC = () => {
  const history = useHistory();

  return (
    <S.Container>
      <Container>
        <Back text="Назад" onGoBackClick={() => history.replace(routers.p2pchangesOwn)} />
        <S.TitleContainer>
          <Title mB={0}>Публикация ордера</Title>
        </S.TitleContainer>

        <OrderToSellCard />
      </Container>
    </S.Container>
  );
};

// import React, { useContext, useEffect } from 'react';
// import { BuyOrder } from './components/BuyOrder/BuyOrder';
// import { Container } from '../../../components/UI/Container';
// import * as S from './S.el';
// import { ExchangeRequestModal } from './components/modals/ExchangeRequest';
// import { ExchangeRequestErrorModal } from './components/modals/ExchangeRequesterror';
// import { Back } from '../components/Back';
// import { Text } from '../components/ui';
// import { AppContext } from '../../../context/HubContext';

// export const OrderToSell = () => {
//   const { hubConnection } = useContext(AppContext);

//   useEffect(() => {
//     if (hubConnection) {
//       (async () => {
//         try {
//           const res = await hubConnection.invoke('GetExchanges', [0, 1], [0, 1, 2, 3, 4], 0, 100);
//           console.log('res', res);
//         } catch (e) {
//           console.log(e);
//         }
//       })();
//     }
//   }, [hubConnection]);
//   return (
//     <S.Container>
//       {/* <ExchangeRequestModal open={true} onClose={() => undefined} /> */}
//       {/* <ExchangeRequestErrorModal open={true} onClose={() => undefined} /> */}

//       <Container>
//         <Back text="К списку ордеров" onGoBackClick={() => undefined} />
//         <S.TitleContainer>
//           <Text size={24} lH={38} weight={700}>
//             Ордер на продажу CWD-USDT
//           </Text>
//           <Text size={14} lH={20} weight={300}>
//             № 4799646829
//           </Text>
//         </S.TitleContainer>
//         <BuyOrder />
//       </Container>
//     </S.Container>
//   );
// };
