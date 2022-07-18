import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando o componente About.js', () => {
  it('testano se a pagina contém as informações da pokedex', () => {
    renderWithRouter(<About />);
    const firstInfo = screen.getByText(/This application simulates a Pokédex/i);
    const secondInfo = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstInfo).toBeDefined();
    expect(secondInfo).toBeDefined();
  });
  it('testando se a página contém o título `About Pokédex`', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(title).toBeDefined();
  });
  it('testando a imagem da página', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.alt).toBe('Pokédex');
    expect(image.src).toBe(src);
  });
});
