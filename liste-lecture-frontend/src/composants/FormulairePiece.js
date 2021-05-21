import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function FormulairePiece() {
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categorie, setCategorie] = useState('');
    const [rediriger, setRediriger] = useState(false);

    const envoyerFormulaire = async () => {
        // TODO : adapter au back end
        // const resultat = await fetch(`/api/articles/${nomArticle}/ajouter-commentaire`, {
        //     method: 'post',
        //     body: JSON.stringify({ nomUtilisateur, texte: texteCommentaire }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // const body = await resultat.json();
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }
    
    return (
    <>
        {AfficherRedirection()}
        <Form className="mb-1">
            <Form.Group>
                <Form.Label>Titre</Form.Label>
                <Form.Control type="text" value={titre} 
                    onChange={(event) => setTitre(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Artiste / Groupe</Form.Label>
                <Form.Control type="text" value={artiste} 
                    onChange={(event) => setArtiste(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Catégorie</Form.Label>
                <Form.Control type="text" value={categorie} 
                    onChange={(event) => setCategorie(event.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={envoyerFormulaire} >
                Ajouter
            </Button>
        </Form>
    </>
    );
}

export default FormulairePiece;