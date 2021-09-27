import React, { useRef, FC, ReactNode } from 'react';
import { animated, useTransition } from 'react-spring';
import { Portal } from '../Portal/Portal';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
};

export const Modal: FC<Props> = ({ onClose, open, children }) => {
  const myRef = useRef(null);

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

  return transitions(
    (styles, item) =>
      item && (
        <Portal>
          <S.ModalContainer>
            <S.Center onClick={handleContainerClick}>
              <animated.div style={styles} ref={myRef}>
                <S.Content>
                  <S.Close onClick={onClose} />
                  {children}
                </S.Content>
              </animated.div>
            </S.Center>
          </S.ModalContainer>
        </Portal>
      )
  );
};
