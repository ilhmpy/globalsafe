import React, { FC, useMemo } from 'react';
// import { MobileModal } from '../../../components/MobileModal';
import { Modal } from '../../../../../components/ModalAnimated';
import { Button } from '../../../../../components/Button/V2/Button';
// import { Dropdown } from '../../../components/Dropdown';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const AdvertFiltersMobile: FC<Props> = ({
  onClose,
  open,
}: Props) => {
  
  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose}>
            <h1>Advert Filters Mobile</h1>
            <h1>Advert Filters Mobile</h1>

            <Button bigSize fullWidth primary onClick={onClose}>
              Close
            </Button>
        </Modal>
      )}
    </>
  );
};
{/* <S.Container>
            <S.Title>Выбор рейтинга</S.Title>
            <S.DropdonwConatainer big>
              <Dropdown
                selectedOption={selectedRate}
                setSelectedOption={setSelectedRate}
                options={rates}
              />
            </S.DropdonwConatainer>
            <Button bigSize fullWidth primary onClick={onAccept}>
              Применить
            </Button>
          </S.Container> */}