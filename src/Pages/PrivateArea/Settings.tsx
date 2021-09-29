import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Switcher } from '../../components/Switcher';
import { Card, Container } from '../../globalStyles';

interface IProps {
  prop?: any;
}

export const Settings: FC<IProps> = () => {
  const { t } = useTranslation();

  const [tableData, setTableData] = useState([
    {
      method: 'АО «Альфа-Банк»',
      cardHolder: 'VYACHESLAV TROSCHIN',
      currency: 'RUB',
      isActive: true,
    },
    {
      method: 'АО «Тинькофф Банк»',
      cardHolder: 'VYACHESLAV TROSCHIN',
      currency: 'RUB',
      isActive: true,
    },
    {
      method: 'ПАО Сбербанк',
      cardHolder: 'SVETLANA TROSCHINA',
      currency: 'RUB',
      isActive: true,
    },
    {
      method: 'АО «Альфа-Банк»',
      cardHolder: 'VYACHESLAV TROSCHIN',
      currency: 'USD',
      isActive: false,
    },
    {
      method: 'АО «Тинькофф Банк»',
      cardHolder: 'SVETLANA TROSCHINA',
      currency: 'USD',
      isActive: true,
    },
    {
      method: 'ПАО Сбербанк',
      cardHolder: 'SVETLANA TROSCHINA',
      currency: 'EUR',
      isActive: false,
    },
    {
      method: 'ERC 20',
      cardHolder: '-',
      currency: 'USDT',
      isActive: true,
    },
    {
      method: 'TRC 20',
      cardHolder: '-',
      currency: 'USDT',
      isActive: true,
    },
    {
      method: 'BEP 20',
      cardHolder: '-',
      currency: 'USDT',
      isActive: false,
    },
  ]);

  return (
    <Container>
      <TableCard>
        <TableHeader>
          <Ceil>Платежный метод</Ceil>
          <Ceil>Держатель карты</Ceil>
          <Ceil>Валюта</Ceil>
          <Ceil>Активность</Ceil>
        </TableHeader>

        {tableData.map((row: any, i: number) => (
          <>
            <TableRow>
              <Ceil>{row.method}</Ceil>
              <Ceil>{row.cardHolder}</Ceil>
              <Ceil>{row.currency}</Ceil>
              <Ceil checked={row.isActive}>
                <Switcher
                  onChange={() => {
                    console.log(row.isActive);
                    setTableData((prev: any) => {
                      const rest = prev.filter((obj: any, index: number) => index !== i);
                      const found = prev.find((obj: any, index: number) => index === i);
                      // console.log('setTableData ~ found', found)
                      console.log(
                        'setTableData ~ [...prev, { ...found, isActive: !found.isActive }]',
                        [...prev, { ...found, isActive: !found?.isActive }]
                      );
                      return [...rest, { ...found, isActive: !found?.isActive }];
                    });
                  }}
                  checked={row.isActive}
                />
                <span>{t(row.isActive ? 'depositsPrograms.on' : 'depositsPrograms.off')}</span>
              </Ceil>
            </TableRow>
          </>
        ))}
      </TableCard>
    </Container>
  );
};

const Ceil = styled.li<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  > span {
    color: ${(props) => (props.checked ? '#0094FF' : '')};
  }

  :nth-child(1) {
    max-width: 250px;
    width: 100%;
  }
  :nth-child(2) {
    max-width: 270px;
    width: 100%;
  }
  :nth-child(3) {
    max-width: 270px;
    width: 100%;
  }
  :nth-child(4) {
    max-width: 230px;
    width: 100%;
  }
`;

const TableRow = styled.ul`
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;

  display: flex;
  padding: 20px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  background: #ffffff;
  margin-bottom: 2px;
`;

const TableHeader = styled(TableRow)`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;

  color: #000000;

  background: #ebebf2;
  margin-bottom: 0px;
`;

const TableCard = styled(Card)`
  background: transparent;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
`;
