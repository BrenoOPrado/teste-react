import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { FavoritePokemons } from '../pages';

describe('Testando o componente FavoritePokemons', () => {
  it('teste sem pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const mensage = screen.getByText(/No favorite pokemon found/i);
    expect(mensage).toBeDefined();
  });
  it('teste com pokemons', () => {
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
    renderWithRouter(<FavoritePokemons pokemons={ [pikachuParam] } />);
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
});
