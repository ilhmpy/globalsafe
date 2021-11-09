import React, { FC, useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { Modal } from '../../../../../components/ModalAnimated';
import { Chip, LeftSide, MessageCard, RightSide, Text, Title } from '../../../components/ui';
import { ReactComponent as CloseIcon } from '../../../../../assets/svg/hidePercent.svg';
import { Button } from '../../../../../components/Button/V2/Button';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  setLoaderPicture: (load: boolean) => void;
  scrolltoTest: () => void;
  fetchPicture: (file: any) => void;
};

export const ModalLoadFile: FC<Props> = ({
  onClose,
  open,
  setLoaderPicture,
  scrolltoTest,
  fetchPicture,
}: Props) => {
  const [reader, setReader] = useState(new FileReader());
  const [file, setFile] = useState<any | null>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const refPercent = useRef<HTMLDivElement>(null);

  const cancelUpload = () => {
    reader.abort();
    if (refInput && refInput.current) {
      refInput.current.value = '';
      refInput.current.removeEventListener('change', handleFileSelect);
      setFile(null);
      if (refPercent.current) {
        refPercent.current.style.width = '0%';
      }
    }
  };

  const updateProgress = (evt: any) => {
    if (evt.lengthComputable) {
      const percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      if (refPercent && refPercent.current) {
        if (percentLoaded < 100) {
          refPercent.current.style.width = percentLoaded + '%';
        }
      }
    }
  };

  const handleFileSelect = (evt: any) => {
    if (refPercent && refPercent.current) {
      refPercent.current.style.width = '0%';
    }
    reader.onprogress = updateProgress;
    reader.onload = function (e: any) {
      if (refPercent && refPercent.current) refPercent.current.style.width = '100%';
    };
    reader.onabort = function (e) {
      if (refPercent && refPercent.current) refPercent.current.style.width = '0%';
    };

    reader.readAsBinaryString(evt.target.files[0]);
  };

  useEffect(() => {
    if (refInput && refInput.current) {
      refInput.current.addEventListener('change', handleFileSelect);
    }
    return () => {
      refInput.current?.removeEventListener('change', handleFileSelect);
    };
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < 10485760) {
      const val = ['image/gif', 'image/jpeg', 'image/png', 'application/pdf'].includes(
        event.target.files[0].type
      );
      if (val) {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
      } else {
        cancelUpload();
      }
    }
  };

  const send = () => {
    setLoaderPicture(true);
    scrolltoTest();
    fetchPicture(file);
    cancelUpload();
  };

  const sizeCount = (b: number) => {
    const fsizekb = b / 1024;
    const fsizemb = fsizekb / 1024;
    if (fsizekb <= 1024) {
      return fsizekb.toFixed(2) + ' кб';
    } else if (fsizekb >= 1024 && fsizemb <= 1024) {
      return fsizemb.toFixed(2) + ' мб';
    }
    return 0;
  };

  const exit = () => {
    cancelUpload();
    onClose();
  };

  return (
    <Modal onClose={onClose} open={open}>
      <S.ModalInner>
        <Text center mB={40} size={24} lH={28} weight={700}>
          Загрузка файла
        </Text>
        <Text black mB={20} size={14} lH={20} weight={400}>
          Поддерживаемые форматы файлов:
          <br /> JPEG, PNG, PDF, GIF
        </Text>
        <Text black mB={20} size={14} lH={20} weight={400}>
          Размер файла не должен превышать 10 Мб.
        </Text>
        {file ? (
          <S.LabelWrap>
            <S.LabelProgress error={false}>
              {file.name} ({sizeCount(file.size)})
            </S.LabelProgress>
            <S.CloseBtn onClick={cancelUpload}>
              <CloseIcon />
            </S.CloseBtn>
          </S.LabelWrap>
        ) : null}
        <S.Progress>
          <S.Percent ref={refPercent} />
        </S.Progress>
        <S.Buttons>
          <S.FileInputButton hide={file}>
            <S.FileInput
              accept="image/gif, image/jpeg, image/png, application/pdf"
              ref={refInput}
              onChange={handleChange}
              type="file"
              hidden
            />
            Выбрать файл
          </S.FileInputButton>

          {file ? (
            <Button as="button" bigSize primary onClick={send}>
              Oк
            </Button>
          ) : null}

          <Button bigSize outlinePrimary onClick={exit}>
            Отмена
          </Button>
        </S.Buttons>
      </S.ModalInner>
    </Modal>
  );
};
