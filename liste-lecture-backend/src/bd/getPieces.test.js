import { MongoClient } from 'mongodb';
import 'regenerator-runtime/runtime';

import { getPiecesBD } from './getPieces';
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
  
    test('Devrait retourner une pièce dans la BD', async () => {
        let pieces = await db.collection('pieces');
        // const nombreDocuments = await pieces.countDocuments();

        // if (nombreDocuments > 0) {
        //     await pieces.drop();
        //     pieces = await db.collection('pieces');
        // }

        const pieceInseree = {
          _id: 'get-pieces-id', 
          artiste: 'John', 
          titre: 'Yeah', 
          categorie: 'Rock'
        };
        await pieces.insertOne(pieceInseree);
  
        const listePieces = await getPiecesBD(db);
        expect(listePieces).toContainEqual(pieceInseree);
    });

    test('Devrait retourner trois pièces dans la BD', async () => {
        const pieces = await db.collection('pieces');
        //await initialiserCollectionVide(pieces);
        
        const piecesInserees = [
            {
                _id: 'piece1-id', 
                artiste: 'John', 
                titre: 'Yeah', 
                categorie: 'Rock'
            }, {
                _id: 'piece2-id', 
                artiste: 'Bobby', 
                titre: 'Cool', 
                categorie: 'Pop'
            }, {
                _id: 'piece3-id', 
                artiste: 'Jimmy', 
                titre: 'Blux', 
                categorie: 'Rockit'
            }
        ];
        await pieces.insertMany(piecesInserees);
  
        const listePieces = await getPiecesBD(db);

        piecesInserees.forEach(piece => {
            expect(listePieces).toContainEqual(piece);
        });
    });    
  });