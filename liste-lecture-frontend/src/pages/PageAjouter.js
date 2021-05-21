import React from 'react';
import FormulairePiece from '../composants/FormulairePiece';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageAjouter() {
    return (
    <>
        <h1>Ajouter une nouvelle pièce</h1>
        <FormulairePiece />
        <Link to="/admin">
            <Button variant={'danger'} >Annuler</Button>    
        </Link>
    </>
    );    
}

export default PageAjouter;