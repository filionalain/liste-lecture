import express from 'express';
import { ObjectID } from 'mongodb';
import path from 'path';

import { utiliserDB } from './bd/connection';
import { getPieces } from './bd/getPieces';
import { ajouterPiece } from './bd/ajouterPiece';

const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(express.json());

app.get('/api/pieces', getPieces);

app.get('/api/pieces/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const infoPiece = await db.collection('pieces').findOne({ _id: objectId });
        reponse.status(200).json(infoPiece);      
    }, reponse).catch(
        () => reponse.status(500).send("Pièce non trouvée")
    );
});

app.put('/api/pieces/ajouter', ajouterPiece);

app.post('/api/pieces/modifier/:id', (requete, reponse) => {
    const {titre, artiste, categorie} = requete.body;
    const id = requete.params.id;

    if (titre !== undefined && artiste !== undefined && categorie !== undefined) {
        utiliserDB(async (db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('pieces').updateOne({ _id: objectId }, {
                '$set': {
                    titre: titre,
                    artiste: artiste,
                    categorie: categorie
                }
            });
            
            reponse.status(200).send("Pièce modifiée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été modifiée")
        );        
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categorie: ${categorie}`);
    }
});

app.delete('/api/pieces/supprimer/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const resultat = await db.collection('pieces').deleteOne({ _id: objectId });
        
        reponse.status(200).send(`${resultat.deletedCount} pièce supprimée`);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : la pièce n'a pas été supprimée")
    );    
});

app.get('*', (requete, reponse) => {
    reponse.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log("Serveur démarré sur le port 8000"));