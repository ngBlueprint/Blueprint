import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../containers/app';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';

const Container = () => (
  <AppContainer>
    <App />
  </AppContainer>
);

render(
  <Container />
, document.getElementById('root')
);å

if (module.hot && module.hot.accept('./../containers/App', () => {
  render(App)
}));