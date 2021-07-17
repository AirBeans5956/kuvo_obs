import * as React from 'react';
import { LampStatus } from '../../types/kuvo_obs';
import StatusLamp from '../atoms/StatusLamp';

interface IProps {
  status: LampStatus;
}

const StatusLabel: React.FC<IProps> = (props) => {
  return (
    <div>
      <StatusLamp status={props.status} />
      <span>{props.children}</span>
    </div>
  )
}

export default StatusLabel;
