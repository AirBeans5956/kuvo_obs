import * as React from 'react';

interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = (prop) => {
  return (
    <div>
      {prop.text}
    </div>
  );
};

export default Label;
