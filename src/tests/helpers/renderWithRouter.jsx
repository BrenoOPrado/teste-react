import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

export default function renderWithRouter(component) {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={ history }>{ component }</Router>),
    history,
  };
}
