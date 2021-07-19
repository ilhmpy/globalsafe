import React, { Component, FC } from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as Arrow } from "../../assets/svg/arrow_payments.svg";

export function List({ listLabel, list, visible, setVisible }: any) {
  return (
    <>
      <ListDiv>
        <ListLabel onClick={() => setVisible(!visible)}>{listLabel} <Arrow style={
          { width: 11, height: 8, marginLeft: 20, transform: `rotate(${visible ? "0deg" : "-90deg"})`, transition: "0.5s" }}
        /></ListLabel>
        <ListItems visible={visible}>
          {list && list.map((item: any) => (
              <ListItem>{item}</ListItem>
           ))}
        </ListItems>
      </ListDiv>
    </>
  );
};

const ListDiv = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const ListLabel = styled.h3`
  color: #56657F;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  users-select: none;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const ListItems = styled.div<{ visible: boolean }>`
  width: 100%;
  display: ${({ visible }) => visible ? "block" : "none"};
`;

const ListItem = styled.div`
  color: #515172;
  font-weight: 400;
  font-size: 12px;
  line-height: 23px;
  color: ${({ theme }) => theme.text};
`;
