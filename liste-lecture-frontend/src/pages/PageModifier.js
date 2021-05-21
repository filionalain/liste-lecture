import React from 'react';
import FormulairePiece from '../composants/FormulairePiece';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageModifier({ match }) {
    const id = match.params.id;
    return (
        <>
            <h1>PageModifier {id}</h1>
            <FormulairePiece />
            <Link to="/admin">
                <Button variant={'danger'} >Annuler</Button>    
            </Link>
        </>
    ); 
}

export default PageModifier;