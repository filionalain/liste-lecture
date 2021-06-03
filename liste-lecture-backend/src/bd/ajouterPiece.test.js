import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { ajouterPieceBD, validerParametres } from './ajouterPiece';
import { initialiserCollectionVide } from './connection';

describe('insert', () => {
    let connection, db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true});
      db = await connection.db( 'liste-repertoire-test');
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await db.collection('pieces').deleteMany({});
    });
  
    test('Devrait ajouter une pièce dans la BD', async () => {
        const pieces = await db.collection('pieces');

        const pieceAjoutee = {
            _id: 'ajouter-piece-id-1',
            artiste: 'Crackity', 
            titre: 'Joe', 
            categorie: 'Punk'
        };

        await ajouterPieceBD(db, pieceAjoutee);
  
        const pieceRetournee = await pieces.findOne(pieceAjoutee);
        expect(pieceRetournee).toEqual(pieceAjoutee);
    });
  
  });