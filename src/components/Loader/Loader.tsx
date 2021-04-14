import { Loading } from "../UI/Loading";
import styled from "styled-components";

export const Loader = () => {
  return (
    <LoaderWrap>
      <Loading />
    </LoaderWrap>
  );
};

const LoaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 99999;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
