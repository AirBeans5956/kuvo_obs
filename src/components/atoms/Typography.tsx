import * as React from 'react';

const Typography:React.FC = (props) => {
  return (
    <h2>
      {props.children}
    </h2>
  );
}

export default Typography;
