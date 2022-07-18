import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { NotFound } from '../pages';

describe('Testando o componente NotFound', () => {
  it('testando se a pagina contém um titulo com `Page requested not found 😭`', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByText(/Page requested not found/i);
    expect(title).toBeDefined();
  });
  it('testando se a página contém a imagem correta', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image).toBeDefined();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
