import { FC, useContext, useEffect, useState } from 'react';
import {
  TilesContainer,
  BottomValue,
  BottomTitle,
  BottomSide,
  TopSide,
  DateRange,
  BoxAmount,
  BoxTitle,
  BlockBox,
} from './styled';
import { Collection } from '../../../../types/info';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../../context/HubContext';
import { routers } from '../../../../constantes/routers';
import { Balance } from '../../../../types/balance';

interface IProps {
  depositsList: Collection[];
}

export const Tiles: FC<IProps> = ({ depositsList }: IProps) => {
  const history = useHistory();
  const { setChosenDepositView } = useContext(AppContext);

  const [deps, setDeps] = useState(depositsList);

  useEffect(() => {
    setDeps(depositsList);
  }, [depositsList]);

  return (
    <TilesContainer>
      {true &&
        deps.map((deposit, i) => {
          <BlockBox
          // key={`${deposit.safeId}-${i}`}
          // onClick={() => {
          //   setChosenDepositView(deposit);
          //   history.push(routers.depositsView);
          // }}
          >
              1
            <TopSide>
              <BoxTitle>wefwefwefwef</BoxTitle>
              <BoxAmount>wefwefwefwef</BoxAmount>
              <DateRange>16.09.2021 - 16.09.2022</DateRange>
            </TopSide>
            <BottomSide>
              <div>
                <BottomTitle>Ближайшая выплата:</BottomTitle>
                <BottomValue>15.10.2011 (сегодня)</BottomValue>
              </div>
              <div>
                <BottomTitle>Сумма ближайшей выплаты:</BottomTitle>
                <BottomValue>200 000 CWD</BottomValue>
              </div>
            </BottomSide>
          </BlockBox>;
        })}
    </TilesContainer>
  );

  //   return (
  //     <TilesContainer>
  //       {depositsList &&
  //         depositsList.map((deposit, i) => {
  //           <BlockBox
  //             key={`${deposit.safeId}-${i}`}
  //             onClick={() => {
  //               setChosenDepositView(deposit);
  //               history.push(routers.depositsView);
  //             }}
  //           >
  //             <TopSide>
  //               <BoxTitle>{deposit.deposit.name}</BoxTitle>
  //               <BoxAmount>{`${deposit.amountView} ${Balance[deposit.deposit.asset]}`}</BoxAmount>
  //               <DateRange>16.09.2021 - 16.09.2022</DateRange>
  //             </TopSide>
  //             <BottomSide>
  //               <div>
  //                 <BottomTitle>Ближайшая выплата:</BottomTitle>
  //                 <BottomValue>15.10.2011 (сегодня)</BottomValue>
  //               </div>
  //               <div>
  //                 <BottomTitle>Сумма ближайшей выплаты:</BottomTitle>
  //                 <BottomValue>200 000 CWD</BottomValue>
  //               </div>
  //             </BottomSide>
  //           </BlockBox>;
  //         })}
  //     </TilesContainer>
  //   );
};
