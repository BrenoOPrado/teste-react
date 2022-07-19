import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Testando o componente Pokemon', () => {
  const mensageSummary = (
    'This intelligent Pokémon roasts hard berries'
              + 'with electricity to make them tender enough to eat.'
  );
  const pikachuParam = {
    averageWeight: {
      measurementUnit: 'kg',
      value: '6.0',
    },
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    id: 25,
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    name: 'Pikachu',
    summary: mensageSummary,
    type: 'Electric',
  };

  it('testando se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pikachuParam } isFavorite={ false } />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByAltText(/Pikachu sprite/i);
    expect(pokeName).toBeDefined();
    expect(pokeName).toHaveTextContent('Pikachu');
    expect(pokeType).toBeDefined();
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeWeight).toBeDefined();
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeImage).toBeDefined();
    expect(pokeImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('testando o link de mais detalhes', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pikachuParam } isFavorite={ false } />,
    );
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeDefined();
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('testando a estrela de favoritado', () => {
    renderWithRouter(<Pokemon pokemon={ pikachuParam } isFavorite />);
    const favoriteStar = screen.getByAltText(
      `${pikachuParam.name} is marked as favorite`,
    );
    expect(favoriteStar).toBeDefined();
    expect(favoriteStar.src).toBe('http://localhost/star-icon.svg');
  });
});
