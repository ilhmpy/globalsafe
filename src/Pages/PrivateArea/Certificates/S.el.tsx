import styled, { css } from 'styled-components/macro';
import { Container as Wrap } from '../../../components/UI/Container';

export const Container = styled.div`
  padding-bottom: 40px;
`;

const style = css`
  background: #ffffff;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const ActiveCert = styled.div`
  ${style};
  padding: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const ActiveCertItem = styled.div`
  flex: 1;
  padding-left: 20px;
  @media (max-width: 768px) {
    flex: none;
    padding-bottom: 20px;
    width: 100%;
  }
`;

export const AvilableCertificates = styled(Wrap)`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  max-width: 1148px;
`;

export const AvilableCertificatesItem = styled.div`
  padding: 40px;
  width: 340px;
  ${style};
  margin: 10px;
`;
