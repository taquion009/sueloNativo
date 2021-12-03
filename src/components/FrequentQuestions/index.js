import * as React from 'react';
import Accordion from '../Accordion';

const index = ({ questions }) => {
    return(
        <section className="section">
        <h2>Preguntas Frecuentes</h2>
            <Accordion questions={questions} />
        </section>
    )
}

export default index