import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import FormulaireAjouterPiece from './FormulaireAjouterPiece';

test("Devrait afficher des messages d'erreur", () => {
    const { getByText } = render(<FormulaireAjouterPiece />);
    
    const boutonEnvoyer = getByText('Ajouter');
    fireEvent.click(boutonEnvoyer);

    const labelTitre = getByText(/Titre/);
    expect(labelTitre).toHaveTextContent(/Vous devez entrer un titre/);

    const labelArtiste = getByText(/Artiste/);
    expect(labelArtiste).toHaveTextContent(/Vous devez entrer un nom d'artiste./);
    
    const labelCategorie = getByText(/Catégorie/);
    expect(labelCategorie).toHaveTextContent(/Vous devez entrer une catégorie./);
});

test("Ne devrait pas afficher des messages d'erreur", () => {
    const { getByText, getByLabelText } = render(<FormulaireAjouterPiece />);
    
    const inputTitre = getByLabelText(/Titre/);
    fireEvent.change(inputTitre, { target: { value: 'abc' }});

    const inputArtiste = getByLabelText(/Artiste/);
    fireEvent.change(inputArtiste, { target: { value: 'abc' }});

    const inputCategorie = getByLabelText(/Catégorie/);
    fireEvent.change(inputCategorie, { target: { value: 'abc' }});

    const boutonEnvoyer = getByText('Ajouter');
    fireEvent.click(boutonEnvoyer);

    const labelTitre = getByText(/Titre/);
    expect(labelTitre).not.toHaveTextContent(/Vous devez entrer un titre/);

    const labelArtiste = getByText(/Artiste/);
    expect(labelArtiste).not.toHaveTextContent(/Vous devez entrer un nom d'artiste./);
    
    const labelCategorie = getByText(/Catégorie/);
    expect(labelCategorie).not.toHaveTextContent(/Vous devez entrer une catégorie./);
});