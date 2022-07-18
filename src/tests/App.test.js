import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando se existe um conjunto de links de navegação na aplicação', () => {
  it('teste do primeiro link', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /Home/i });
    expect(link).toBeDefined();
  });
  it('teste do segundo link', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /About/i });
    expect(link).toBeDefined();
  });
  it('teste do terceito link', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(link).toBeDefined();
  });
});

// mutantes mortos 💀

describe('Testando a funcionalidade dos liks da aplicação', () => {
  it('teste do link `Home`', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /Home/i });
    userEvent.click(link);
    const homeElement = screen.getByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );
    expect(homeElement).toBeDefined();
    expect(history.location.pathname).toBe('/');
  });
  it('teste do link `About`', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /About/i });
    userEvent.click(link);
    const aboutElement = screen.getByRole(
      'heading', { level: 2, name: /About Pokédex/i },
    );
    expect(aboutElement).toBeDefined();
    expect(history.location.pathname).toBe('/about');
  });
  it('teste do link `Favorite Pokémons`', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(link);
    const aboutElement = screen.getByRole(
      'heading', { level: 2, name: /Favorite/i },
    );
    expect(aboutElement).toBeDefined();
    expect(history.location.pathname).toBe('/favorites');
  });
  it('teste de url invalida', () => {
    const { history } = renderWithRouter(<App />);
    const url = '/url-incorreta';
    history.push(url);
    const notFoundElement = screen.getByRole(
      'heading', { level: 2, name: /not found/i },
    );
    expect(notFoundElement).toBeDefined();
    expect(history.location.pathname).toBe(url);
  });
});
