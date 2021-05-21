import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function PageSupprimer({ match }) {
    const id = match.params.id;
    return (
    <>
        <h1>PageSupprimer {id}</h1>
        <Alert variant={'danger'} >Êtes-vous certain de vouloir supprimer cette pièce?</Alert>
        
        <Link to="/admin">
            <Button variant={'primary'} className={'mr-1'} >Supprimer</Button>
        </Link>

        <Link to="/admin">
            <Button variant={'danger'} >Annuler</Button>  
        </Link>
        
    </>
    );
}

export default PageSupprimer;