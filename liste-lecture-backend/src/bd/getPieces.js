import { utiliserDB } from './connection';

export function getPieces (requete, reponse) {
    utiliserDB(async (db) => {
        const listePieces = await getPiecesBD(db);
        reponse.status(200).json(listePieces);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
}

export async function getPiecesBD(db)  {
    return await db.collection('pieces').find().toArray()
}
