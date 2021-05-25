import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function ListePieces({ pieces, estAdmin }) {
    if (pieces?.length) {
        var dictionnaireCategories = Object();

        pieces.forEach(piece => {
            if (dictionnaireCategories[piece.categorie] === undefined) {
                dictionnaireCategories[piece.categorie] = true;
            }
        });

        const categories = Object.keys(dictionnaireCategories);

        return (
            <>
                {categories.map((categorie) => {
                    const piecesAssociees = pieces.filter((piece) => piece.categorie === categorie);
                    return (
                        <div key={categorie}>
                            <h4>{categorie}</h4>
                            <ul>
                                {
                                    piecesAssociees.map(piece => 
                                        <li key={piece._id}>{piece.titre} - {piece.artiste}
                                        {estAdmin === true ? 
                                            <>
                                                <Link to={`/modifier/${piece._id}`}>
                                                    <Button variant="success" className="m-1" size="sm" >Modifier</Button>
                                                </Link>
                                                <Link to={`/supprimer/${piece._id}`}>
                                                    <Button variant="danger" className="m-1" size="sm" >Supprimer</Button>
                                                </Link>
                                            </> : undefined }                                     
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    )
                })}
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListePieces;