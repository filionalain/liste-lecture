import React from 'react';

import ListePieces from '../composants/ListePieces';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function PageAdmin() {
    return (
        <>
            <h1>Page administrateur</h1>

            <Link to="/ajouter">
                <Button>Ajouter une nouvelle pièce</Button>    
            </Link>

            <Link to="/categories">
                <Button>Gérer les catégories</Button>    
            </Link>
            
            <h2>Liste du répertoire</h2>
            <ListePieces />
        </>
    );
}

export default PageAdmin;