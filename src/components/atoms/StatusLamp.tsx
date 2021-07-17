import React from "react";
import { LampStatus } from '../../types/kuvo_obs';
import { styled as themed } from '../FoundationStyles';
import styled from 'styled-components';

interface IStatusLampProps {
  status: LampStatus;
}

const Lamp = styled.span((props: IStatusLampProps) => (`
  &:before {
    content: "●";
    color: ${(): string => {
      switch (props.status) {
        case 'danger':
          return 'red';
        case 'fine':
          return 'green';
        case 'warning':
          return 'yellow';
        case 'initial':
          return 'gray';
        default:
          return 'green';
      }
    }};
  }
`));

const StatusLamp: React.FC<IStatusLampProps>
  = (prop) => {
  return (
    <>
      <Lamp status={prop.status} />
    </>
  );
};

export default StatusLamp;
