import React, { useRef, FC, ReactNode } from 'react';
import { animated, useTransition } from 'react-spring';
import useOnClickOutside from '../../hooks/useOutsideHook';
import { useIsMobile } from '../../Pages/PrivateArea/utils';
import { Footer } from '../Footer/Footer';
import { Portal } from '../Portal/Portal';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
};

export const Modal: FC<Props> = ({ onClose, open, children }: Props) => {
  const myRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const transitions = useTransition(open, {
    from: {
      opacity: 0,
      transform: 'translateY(-120px)',
      margin: '0 auto',
    },
    enter: {
      opacity: 1,
      transform: 'translateY(0px)',
      margin: '0 auto',
    },
    leave: { opacity: 0, transform: 'translateY(-120px)' },
    // reverse: !open,
    // immediate: !myRef.current,
  });

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useOnClickOutside(wrapperRef, () => onClose());

  const customStyles = !isMobile
    ? {}
    : {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      };

  return transitions(
    (styles: any, item) =>
      item && (
        <Portal>
          <S.ModalContainer ref={wrapperRef}>
            <S.Center onClick={handleContainerClick}>
              <animated.div style={{ ...styles, ...customStyles }} ref={myRef}>
                <S.Content>
                  <S.Close onClick={onClose} />
                  {children}
                </S.Content>

                {isMobile && <Footer />}
              </animated.div>
            </S.Center>
          </S.ModalContainer>
        </Portal>
      )
  );
};
