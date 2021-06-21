import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function FormulaireAjouterPiece() {
    const { t } = useTranslation();

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
                <Form.Label htmlFor="inputTitre">{t('titre')} 
                    {titreEstPresent === false ? 
                        <span className="text-danger"> * {t('titreObligatoire')}</span>
                        : undefined
                    }</Form.Label>
                <Form.Control type="text" value={titre} id="inputTitre"
                    onChange={(event) => setTitre(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="inputArtiste">{t('artisteGroupe')}
                    {artisteEstPresent === false ? 
                        <span className="text-danger"> * {t('artisteObligatoire')}</span>
                        : undefined
                    }
                </Form.Label>
                <Form.Control type="text" value={artiste} id="inputArtiste"
                    onChange={(event) => setArtiste(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="inputCategorie">{t('categorie')}
                    {categorieEstPresent === false ? 
                        <span className="text-danger"> * {t('categorieObligatoire')}</span>
                        : undefined
                    }
                </Form.Label>
                <Form.Control type="text" value={categorie} id="inputCategorie"
                    onChange={(event) => setCategorie(event.target.value)} />
            </Form.Group>

            <Button className="mt-2" variant="primary" onClick={validerFormulaire} >
                {t('ajouter')}
            </Button>
        </Form>
    </>
    );
}

export default FormulaireAjouterPiece;