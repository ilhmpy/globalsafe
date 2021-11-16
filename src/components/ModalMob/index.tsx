import { FC, ReactNode, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { Portal } from '../Portal/Portal';
import { easeSinInOut, easeLinear } from 'd3-ease';
import * as S from './S.el';
import useWindowSize from '../../hooks/useWindowSize';
import { MobWrapper } from './MobWrapper';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const ModalMob: FC<Props> = ({ open, onClose, children }: Props) => {
  const size = useWindowSize();

  const pc = {
    from: { opacity: 0, transform: 'translateY(-100%)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-100%)' },
    config: {
      easing: easeSinInOut,
    },
  };

  const mob = {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: 'translateX(100%)' },
    config: {
      easing: easeLinear,
    },
  };

  const transitions = useTransition(open, size < 767 ? mob : pc);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  return transitions(
    (styles, item) =>
      item && (
        <Portal>
          <S.Wrap open={open} onClick={handleContainerClick}>
            <animated.div style={styles} className="anim">
              {size < 767 ? (
                <MobWrapper>{children}</MobWrapper>
              ) : (
                <>
                  {' '}
                  <S.Close onClick={onClose} />
                  {children}
                </>
              )}
            </animated.div>
          </S.Wrap>
        </Portal>
      )
  );
};
