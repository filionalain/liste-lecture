import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function FormulaireAjouterPiece({ id }) {
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categorie, setCategorie] = useState('');

    const [titreEstPresent, setTitreEstPresent] = useState(true);
    const [artisteEstPresent, setArtisteEstPresent] = useState(true);
    const [categorieEstPresent, setCategorieEstPresent] = useState(true);

    const [rediriger, setRediriger] = useState(false);

    const envoyerFormulaire = async () => {
        await fetch(`/api/pieces/ajouter`, {
            method: 'put',
            body: JSON.stringify({ titre, artiste, categorie }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function validerFormulaire() {
        setTitreEstPresent(titre !== "");
        setArtisteEstPresent(artiste !== "");
        setCategorieEstPresent(categorie !== "");

        if ((titre !== "") && (artiste !== "") && (categorie !== "")) {
            envoyerFormulaire();
        }
    }

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
                <Form.Label htmlFor="inputTitre">Titre 
                    {titreEstPresent === false ? 
                        <span className="text-danger"> * Vous devez entrer un titre.</span>
                        : undefined
                    }</Form.Label>
                <Form.Control type="text" value={titre} id="inputTitre"
                    onChange={(event) => setTitre(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="inputArtiste">Artiste / Groupe
                    {artisteEstPresent === false ? 
                        <span className="text-danger"> * Vous devez entrer un nom d'artiste.</span>
                        : undefined
                    }
                </Form.Label>
                <Form.Control type="text" value={artiste} id="inputArtiste"
                    onChange={(event) => setArtiste(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="inputCategorie">Catégorie
                    {categorieEstPresent === false ? 
                        <span className="text-danger"> * Vous devez entrer une catégorie.</span>
                        : undefined
                    }
                </Form.Label>
                <Form.Control type="text" value={categorie} id="inputCategorie"
                    onChange={(event) => setCategorie(event.target.value)} />
            </Form.Group>

            <Button className="mt-2" variant="primary" onClick={validerFormulaire} >
                Ajouter
            </Button>
        </Form>
    </>
    );
}

export default FormulaireAjouterPiece;