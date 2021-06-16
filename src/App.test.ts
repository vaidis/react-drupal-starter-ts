import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Router } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './state/store'
import history from "./state/history";

test('renders header logo', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );
  const linkElement = getByText(/Logo/i);
  expect(linkElement).toBeInTheDocument();
});