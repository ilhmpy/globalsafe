import { FC, ReactNode } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import * as S from './S.el';

type Props = {
  children: ReactNode;
};

export const MobWrapper: FC<Props> = ({ children }: Props) => {
  return (
    <S.ModalWrapper>
      <Header />
      <>{children}</>
      <Footer />
    </S.ModalWrapper>
  );
};
