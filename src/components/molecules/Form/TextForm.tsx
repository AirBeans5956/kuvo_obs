import * as React from 'react';
import TextBox, { ITextBoxProps } from '../../atoms/TextBox';
import { useMemo } from 'react';

export interface ITextFormProps extends ITextBoxProps {
  label: string;
}

const TextForm: React.FC<ITextFormProps> = (props) => {
  const label = useMemo(() => {
    return !!props.label ? <label htmlFor={props.name}>{props.label}</label> : null;
  }, [props.label]);
  return (
    <div>
      {label}
      <TextBox
        name={props.name}
        type={props.type}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </div>
  )
}

export default TextForm;
