import * as React from 'react';
import { useState } from 'react';
import Checkbox from '../../atoms/Checkbox';

interface ICheckFormProps {
  name: string
  labelText: string;
  onChanged: (checked: boolean) => void;
}

const CheckForm: React.FC<ICheckFormProps> = (props) => {
  return (
    <>
      <Checkbox
        name={props.name}
        defaultChecked={false}
        onChange={props.onChanged}
      />
      <label htmlFor="">{props.labelText}</label>
    </>
  );
}

export default CheckForm;
