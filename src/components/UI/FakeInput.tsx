import React, { FC } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";

export const FakeInput: FC<{ label: string; hours: number }> = ({
  label = "place",
  hours,
}) => {
  const { t } = useTranslation();
  const wordDecline = (num: number) => {
    let result;
    const ever = [t("everyone"), t("every")];
    const expressions = [t("hour"), t("hours"), t("hourss")];
    let count = num % 100;
    if (count >= 5 && count <= 20) {
      result = ever[1] + " " + num + " " + expressions[2];
    } else {
      count = count % 10;
      if (count == 1) {
        result = ever[0] + " " + num + " " + expressions[0];
      } else if (count >= 2 && count <= 4) {
        result = ever[1] + " " + num + " " + expressions[1];
      } else {
        result = ever[1] + " " + num + " " + expressions[2];
      }
    }
    return result;
  };

  return (
    <InputContainer>
      <span data-label={label}></span>
      {wordDecline(hours)}
    </InputContainer>
  );
};

export const InputContainer = styled.div`
  border: 1px solid rgba(86, 101, 127, 0.3);
  border-radius: 4px;
  position: relative;
  height: 40px;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.25px;
  padding: 8px;
  width: 100%;
  transition: 200ms ease-in-out;
  span {
    &::after,
    &::before {
      position: absolute;
      transition: 200ms ease-in-out;
    }
    &::before {
      content: attr(data-label);
      left: 16px;
      top: 0;
      bottom: 0;
      margin: auto;
      pointer-events: none;
      height: 18px;
      transform: translateY(-16px);
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0.1px;
      position: absolute;
      left: 12px;
      padding: 0 10px;
      top: -12px;
      z-index: 9;
      background: ${(props) => props.theme.card.background};
      color: ${(props) => props.theme.depositHead};
    }
  }
`;
