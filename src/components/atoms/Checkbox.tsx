import React, { useCallback, useEffect, useState } from 'react';

interface IProps {
  // label: string;
  name: string;
  defaultChecked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<IProps> = props => {
  const [checked, setChecked] = useState<boolean>(false);
  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let htmlCheck = e.currentTarget.checked;
      setChecked(htmlCheck);
      props.onChange(htmlCheck);
    },
    [props.onChange],
  );
  useEffect(() => {
    setChecked(props.defaultChecked);
  }, []);
  return (
    <>
      <input
        name={props.name}
        type="checkbox"
        onChange={onValueChange}
        checked={checked}
      />
    </>
  );
};


export default Checkbox;
