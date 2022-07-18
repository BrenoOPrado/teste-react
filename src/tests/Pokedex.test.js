import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testando o componente Pokedex', () => {
  renderWithRouter(<App />);
  it('testando se a pagina contém um titulo com `Encountered pokémons`', () => {
    const title = screen.getByRole('heading', {
      level: 2, name: /Encountered pokémons/i });
    expect(title).toBeDefined();
  });
  it('testando o uso do botão da pokedex', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('next-pokemon');
    expect(button).toBeDefined();
    expect(button).toHaveTextContent('Próximo pokémon');
    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);

    data.forEach((pokemon) => {
      const pokeName = screen.getByTestId('pokemon-name');
      expect(pokeName).toBeDefined();
      expect(pokeName).toHaveTextContent(pokemon.name);
      userEvent.click(button);
    });
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');
  });
  it('testando a existencia dos botões de filtragem', () => {
    renderWithRouter(<App />);
    const types = data.map((pokemon) => pokemon.type);
    types.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeDefined();
    });
    expect(screen.getAllByTestId('pokemon-type-button')[0]).toBeDefined();
  });
  it('testando a filtragem dos botões', () => {
    renderWithRouter(<App />);
    const types = data.map((pokemon) => pokemon.type);
    types.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      userEvent.click(buttonType);
      const pokeType = screen.getByTestId('pokemon-type');
      expect(screen.getAllByTestId('pokemon-type-button')[0]).toBeDefined();
      expect(pokeType).toHaveTextContent(type);
    });
  });
});
