import React, { useMemo, useCallback } from 'react';

export interface ITextBoxProps {
  name: string;
  type: 'text' | `password`;
  value: string;
  onChangeText: (value: string) => void;
}

const TextBox: React.FC<ITextBoxProps> = props => {
  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      props.onChangeText(value);
    },
    [props.onChangeText],
  );
  return (
    <>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={onValueChange}
      />
    </>
  );
};

export default TextBox;
