import {
    React,
    useState,
    useEffect
} from 'react';

import ListePieces from '../composants/ListePieces';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function PageAdmin() {
    const [listePieces, setListePieces] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    return (
        <>
            <h1>Page administrateur</h1>

            <Link to="/ajouter">
                <Button>Ajouter une nouvelle pièce</Button>    
            </Link>
            
            <h2>Liste du répertoire</h2>
            <ListePieces pieces={listePieces} estAdmin={true} />
        </>
    );
}

export default PageAdmin;