import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders layout with children', () => {

  const { getByDisplayValue } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByDisplayValue(/easy/i)).toBeInTheDocument();
});
