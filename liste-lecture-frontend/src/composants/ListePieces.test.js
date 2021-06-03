import React from 'react';
import { render } from '@testing-library/react';
import ListePieces from './ListePieces';

test("Affiche un message d'erreur", () => {
  const { getByText } = render(<ListePieces />);
  const messageErreur = getByText(/Il n'y a pas/);

  expect(messageErreur).toBeInTheDocument();
  expect(messageErreur).toHaveTextContent(
      "Il n'y a pas de pièces dans le répertoire."
  )
});

const listeRepertoire = [ 
    { 
        _id: 1,
        titre: "Give It to Me", 
        artiste: "Rick James", 
        categorie: "Pop" 
    }, 
    { 
        _id: 2,
        titre: "For a Few Dollars More", 
        artiste: "Ennio Morricone", 
        categorie: "Musique de films" 
    }, 
    { 
        _id: 3,
        titre: "Le temps de l'amour", 
        artiste: "Françoise Hardy", 
        categorie: "Yéyé" 
    }
]; 

test("N'affiche un message d'erreur", () => {
    const { queryByText } = render(<ListePieces pieces={listeRepertoire} />);
    const messageErreur = queryByText(/Il n'y a pas/);
    expect(messageErreur).toBeNull();
});

test("Affichage des pièces", () => {
    const { getByText } = render(<ListePieces pieces={listeRepertoire} />);

    const categorieYeye = getByText("Yéyé");
    expect(categorieYeye).toBeInTheDocument();

    const artisteEnnio = getByText(/Ennio Morricone/);
    expect(artisteEnnio).toBeInTheDocument();

    const pieceRickJames = getByText(/Give It to Me/);
    expect(pieceRickJames).toBeInTheDocument();
});
