import React, { FC, ReactElement, ReactNode, ChangeEvent } from 'react';
import { LabelContainer, CheckboxInput, CheckboxIcon, CheckboxLabel } from './S.el';

type Props = {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value?: string;
  name?: string;
  children?: ReactNode;
  dis?: boolean;
  labelBold?: boolean;
};

export const Checkbox: FC<Props> = (props: Props): ReactElement => {
  const { checked, onChange, label, name, children, dis, labelBold = false } = props;
  return (
    <LabelContainer>
      <CheckboxInput name={name} type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxIcon dis={dis} />
      {children}
      {label && <CheckboxLabel checked={checked} labelBold={labelBold}>{label}</CheckboxLabel>}
    </LabelContainer>
  );
};
