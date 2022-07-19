import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente PokemonDetails', () => {
  const url = '/pokemons/143';

  it('testando se as informações são mostradas no card', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();

    history.push(url);

    expect(detailsLink).not.toBeInTheDocument();

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByAltText(/Snorlax sprite/i);
    expect(pokeName).toBeDefined();
    expect(pokeName).toHaveTextContent('Snorlax');
    expect(pokeType).toBeDefined();
    expect(pokeType).toHaveTextContent('Normal');
    expect(pokeWeight).toBeDefined();
    expect(pokeWeight).toHaveTextContent('Average weight: 460.0 kg');
    expect(pokeImage).toBeDefined();
    expect(pokeImage.src).toBe('https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
  });
  it('testando se as informações da página são mostradas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const pokeTitle = screen.getByRole('heading', { level: 2, name: /Snorlax Details/i });
    const summaryTitle = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(pokeTitle).toBeDefined();
    expect(summaryTitle).toBeDefined();

    const pokeSummary = screen.getByText(/What sounds like its cry may actually be its/i);
    expect(pokeSummary).toBeDefined();
  });

  it('testando a seção dos mapas com as localizações do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const mapsTitle = screen.getByRole('heading', {
      level: 2, name: /Game Locations of Snorlax/i,
    });
    expect(mapsTitle).toBeDefined();

    const pokeMaps = screen.getAllByAltText('Snorlax location');
    expect(pokeMaps).toBeDefined();
    expect(pokeMaps[0].src).toBe('https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png');
    const mapName = screen.getByText('Kanto Vermillion City');
    expect(mapName).toBeDefined();
  });

  it('testando se é possivel favoritar o pokemon da pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const favoriteCheckbox = screen.getByText('Pokémon favoritado?');
    expect(favoriteCheckbox).toBeDefined();

    userEvent.click(favoriteCheckbox);

    const favoriteStar = screen.getByAltText('Snorlax is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar.src).toBe('http://localhost/star-icon.svg');
  });
});
