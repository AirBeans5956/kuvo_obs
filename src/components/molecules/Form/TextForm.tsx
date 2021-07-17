import * as React from 'react';
import TextBox, { ITextBoxProps } from '../../atoms/TextBox';
import { useEffect, useMemo, useState } from 'react';

export interface ITextFormProps extends ITextBoxProps {
  label: string;
}

const TextForm: React.FC<ITextFormProps> = (props) => {
  const [text, setText] = useState<string>('');
  const label = useMemo(() => {
    return !!props.label ? <label htmlFor={props.name}>{props.label}</label> : null;
  }, [props.label]);
  useEffect(() => {
    setText(props.value);
  }, [props.value]);
  return (
    <div>
      {label}
      <TextBox
        name={props.name}
        type={props.type}
        value={text}
        onChangeText={(value => {
          props.onChangeText(value);
          setText(value);
        })}
      />
    </div>
  )
};

export default TextForm;
