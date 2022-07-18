import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testando o conjunto de links de navegação da aplicação', () => {
  it('teste do primeiro link', () => {
    render(<App />);
    const link = screen.getByRole('link', { name: /Home/i });
    expect(link).toBeDefined();
  });
});
