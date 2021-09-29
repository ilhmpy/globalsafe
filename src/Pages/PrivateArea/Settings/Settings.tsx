import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Switcher } from '../../../components/Switcher';
import { routers } from '../../../constantes/routers';
import { Card, Container } from '../../../globalStyles';
import { Filter } from '../components/Filter';
import { Heading } from '../components/Heading';

type TableRowType = {
  method?: string;
  cardHolder?: string;
  currency?: string;
  isActive: boolean;
};

export const Settings: FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('Все');
  const history = useHistory();
  const [tableData, setTableData] = useState<TableRowType[]>([
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
      <Heading
        onClick={() => history.push(routers.settingsNewPayMethod)}
        title="Настройки"
        btnText="Добавить платежный метод"
      />
      <Filter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        buttonValues={[
          'Все',
          'АО «Альфа-Банк»',
          'АО «Тинькофф Банк»',
          'ПАО Сбербанк',
          'ERC 20',
          'TRC 20',
          'BEP 20',
          'Все валюты',
        ]}
      />

      <TableCard>
        <TableHeader>
          <Ceil>Платежный метод</Ceil>
          <Ceil>Держатель карты</Ceil>
          <Ceil>Валюта</Ceil>
          <Ceil>Активность</Ceil>
        </TableHeader>

        {tableData.map((row: TableRowType, i: number) => (
          <>
            <TableRow onClick={() => history.push(routers.settingsViewPayMethod)}>
              <Ceil>{row.method}</Ceil>
              <Ceil>{row.cardHolder}</Ceil>
              <Ceil>{row.currency}</Ceil>
              <Ceil checked={row.isActive}>
                <Switcher
                  onChange={() => {
                    console.log(row.isActive);
                    setTableData((prev: TableRowType[]) =>
                      prev.map((obj: TableRowType, index: number) =>
                        index === i ? { ...obj, isActive: !obj.isActive } : obj
                      )
                    );
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

const Hat = styled.div``;
const Title = styled.p``;

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
  cursor: pointer;
`;

const TableHeader = styled(TableRow)`
  cursor: auto;
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
