import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Main from '../containers/main';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';

const Container = () => (
  <AppContainer>
    <Main />
  </AppContainer>
);
console.log("IN DEVPANEL INDEX.JS")
render(
  <Container />
, document.getElementById('root')
);

if (module.hot && module.hot.accept('../containers/main', () => {
  render(Main)
}));