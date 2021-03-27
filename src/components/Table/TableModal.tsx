import React from "react";
import styled from "styled-components/macro";
import { Modal } from "../Modal/Modal";
import moment from "moment";
import { Name, NameData } from "./Table.styled";
import { Balance } from "../../types/balance";
import "moment/locale/ru";
moment.locale("ru");

type Props = {
  data: any;
  onClose: () => void;
  open: boolean | string;
};

export const TableModal = ({ onClose, open, data }: Props) => {
  return (
    <>
      {!!(open === data.safeId) && (
        <Modal onClose={onClose}>
          <InfoBlock data={data} />
        </Modal>
      )}
    </>
  );
};

export const InfoBlock = ({ data }: any) => {
  return (
    <>
      {data && (
        <List>
          <LI>
            <Text bold>{data.deposit.name}</Text>
            <NameData>
              <NameData>
                {moment(data.creationDate).format("DD/MM/YYYY")}
              </NameData>{" "}
              <NameData>&nbsp; - &nbsp;</NameData>
              <NameData
                green={
                  moment.utc().valueOf() > moment.utc(data.endDate).valueOf()
                }
              >
                {moment(data.endDate).format("DD/MM/YYYY")}
              </NameData>
            </NameData>
            <Hr />
          </LI>
          <LI>
            <Text>Описание</Text>
            <Text>{data.deposit.description}</Text>
          </LI>
          <LI>
            <Text>Дата завершения депозита</Text>
            <Text>{moment(data.endDate).format("DD MMMM YYYY")}</Text>
          </LI>
          <LI>
            <Text>Дата следующей выплаты</Text>
            <Text>
              {data.paymentDate
                ? moment(data.paymentDate).format("DD MMMM YYYY")
                : "-"}
            </Text>
          </LI>
          <LI>
            <Text>Сумма депозита</Text>
            <Text>
              {data.amountView}&nbsp; {Balance[data.deposit.asset]}
            </Text>
          </LI>
          <LI>
            <Text>Сумма взноса</Text>
            <Text>{data.baseAmountView}&nbsp; CWD</Text>
          </LI>
          <LI>
            <Text>К выплате</Text>
            <Text>
              {data.paymentAmountView
                ? data.paymentAmountView.toString().length > 15
                  ? data.paymentAmountView.toFixed(7)
                  : data.paymentAmountView
                : "-"}
            </Text>
            {data.paymentAmountView && (
              <Text>{Balance[data.deposit.asset]}</Text>
            )}
          </LI>
        </List>
      )}
    </>
  );
};

const List = styled.ul`
  list-style: none;
  padding: 15px 35px;
`;

const Text = styled.p<{ bold?: boolean }>`
  font-weight: ${(props) => (props.bold ? "500" : "400")};
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 4px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.bold ? "#515172" : "rgba(86, 101, 127, 0.6)")};
`;

const LI = styled.li`
  margin-bottom: 20px;

  ${Text}:last-child {
    color: #515172;
  }
`;

const Date = styled(NameData)`
  font-size: 12px;
  line-height: 21px;
`;

const Hr = styled.hr`
  background: rgba(66, 139, 202, 0.2);
  width: 100%;
  margin-top: 10px;
`;
