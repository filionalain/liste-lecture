import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import FormulaireAjouterPiece from '../composants/FormulaireAjouterPiece';

function PageAjouter() {
    const { t } = useTranslation();

    return (
    <>
        <h1>{t('ajouterNouvelle')}</h1>
        <FormulaireAjouterPiece />
        <Link to="/admin">
            <Button variant={'danger'} >{t('annuler')}</Button>    
        </Link>
    </>
    );    
}

export default PageAjouter;