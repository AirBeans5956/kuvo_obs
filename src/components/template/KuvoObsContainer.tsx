import React from 'react';
import ReactDOM from 'react-dom';
import ObsControll from './ObsControll';
import KuvoControll from './KuvoControll';
import KuvoTrackInfo from './KuvoTrackInfo';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
`;

const KuvoObsContainer: React.FC = () => {
  return (
    <MainContainer>
      <ObsControll />
      <KuvoControll />
      <KuvoTrackInfo />
    </MainContainer>
  );
};

export default KuvoObsContainer;
