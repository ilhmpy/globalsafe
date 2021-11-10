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
};

export const Radio: FC<Props> = (props: Props): ReactElement => {
  const { checked, onChange, label, name, children, dis, value } = props;
  return (
    <LabelContainer>
      <CheckboxInput name={name} type="radio" checked={checked} onChange={onChange} value={value} />
      <CheckboxIcon dis={dis} />

      <CheckboxLabel checked={!!checked}>
        {children}
      </CheckboxLabel>
    </LabelContainer>
  );
};
