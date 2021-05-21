import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

var listeRepertoire = [
    {
        id: 1,
        titre: "Beat It",
        artiste: "Michael Jackson",
        categorie: "Pop"
    },
    {
        id: 2,
        titre: "Give It to Me",
        artiste: "Rick James",
        categorie: "Pop"
    },
    {
        id: 3,
        titre: "For a Few Dollars More",
        artiste: "Ennio Morricone",
        categorie: "Musique de films"
    },
    {
        id: 4,
        titre: "A Fistful of Dollars",
        artiste: "Ennio Morricone",
        categorie: "Musique de films"
    },
    {
        id: 5,
        titre: "Navajo Joe",
        artiste: "Ennio Morricone",
        categorie: "Musique de films"
    },
    {
        id: 6,
        titre: "Le temps de l'amour",
        artiste: "Françoise Hardy",
        categorie: "Yéyé"
    },
    {
        id: 7,
        titre: "Les sucettes",
        artiste: "Serge Gainsbourg",
        categorie: "Yéyé"
    },
    {
        id: 8,
        titre: "Bullwinkle Part II",
        artiste: "The Centurions",
        categorie: "Surf"
    },
    {
        id: 9,
        titre: "Chupacabra vs Batman",
        artiste: "Messer Chups",
        categorie: "Surf"
    }
];

app.get('/api/pieces', (requete, reponse) => {
    reponse.status(200).json(listeRepertoire);
});

app.get('/api/pieces/:id', (requete, reponse) => {
    const id = requete.params.id;

    if (isNaN(id) === false) {
        const intId = parseInt(id, 10);
        const pieceTrouvee = listeRepertoire.find(piece => piece.id === intId);

        if (pieceTrouvee !== undefined) {
            reponse.status(200).json(pieceTrouvee);
        }
        else {
            reponse.status(500).send('Pièce non trouvée');
        }
    }
    else {
        reponse.status(500).send('Id n\'est pas un nombre');
    }
});

app.put('/api/pieces/ajouter', (requete, reponse) => {
    const {titre, artiste, categorie} = requete.body;

    if (titre !== undefined && artiste !== undefined && categorie !== undefined) {
        const nouvellePiece = {
            id: -1,
            titre: titre,
            artiste: artiste,
            categorie: categorie
        };

        var nouvelId = -1;
        listeRepertoire.forEach(piece => {
            if (piece.id > nouvelId) {
                nouvelId = piece.id
            }
        });
        nouvellePiece.id = nouvelId + 1;
        listeRepertoire.push(nouvellePiece);
        
        reponse.status(200).json(listeRepertoire);
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categorie: ${categorie}`);
    }
});

app.post('/api/pieces/modifier/:id', (requete, reponse) => {
    const {titre, artiste, categorie} = requete.body;
    const id = requete.params.id;

    if (isNaN(id) === false) {
        const intId = parseInt(id, 10);
        const pieceTrouvee = listeRepertoire.find(piece => piece.id === intId);

        if (pieceTrouvee !== undefined) {
            const index = listeRepertoire.indexOf(pieceTrouvee);
            const nouvellePiece = {
                id: intId,
                titre: titre,
                artiste: artiste,
                categorie: categorie
            };
            listeRepertoire[index] = nouvellePiece;

            reponse.status(200).json(listeRepertoire);
        }
        else {
            reponse.status(500).send('Pièce non trouvée');
        }
    }
    else {
        reponse.status(500).send('Id n\'est pas un nombre');
    }
});

app.delete('/api/pieces/supprimer/:id', (requete, reponse) => {
    const id = requete.params.id;

    if (isNaN(id) === false) {
        const intId = parseInt(id, 10);
        const pieceTrouvee = listeRepertoire.find(piece => piece.id === intId);

        if (pieceTrouvee !== undefined) {
            listeRepertoire = listeRepertoire.filter(piece => piece.id !== intId);
            reponse.status(200).send(`La pièce avec id = ${id} a été supprimée`);
        }
        else {
            reponse.status(500).send('Pièce non trouvée');
        }
    }
    else {
        reponse.status(500).send('Id n\'est pas un nombre');
    }
});

app.listen(8000, () => console.log("Serveur démarré sur le port 8000"));