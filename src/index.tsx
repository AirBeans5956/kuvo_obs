import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './components/FoundationStyles';
import createStore from './ducks/store';
import KuvoObsContainer from './components/template/KuvoObsContainer';

const container = document.getElementById('contents');

ReactDOM.render(
  <Provider store={createStore()}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <KuvoObsContainer />
    </ThemeProvider>
  </Provider>,
  container,
);
