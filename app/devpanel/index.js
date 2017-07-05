import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Main from '../containers/main';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Container = () => (
  <MuiThemeProvider>
    <AppContainer>
      <Main />
    </AppContainer>
  </MuiThemeProvider>
);

render(
  <Container />
  , document.getElementById('root')
);

if (module.hot && module.hot.accept('../containers/main', () => {
  render(Main)
}));