import React, { createRef } from 'react';
import './CardMemory.css';

/**
 * Represente une Carte a jouer dans le jeu (Carte a retourner) 
 */
function CardMemory({ img, reveal, id, onTurn }) {

    const memoryCardRef = createRef();
    const isTurn = reveal ? "card-memory card-reveal is-relative":"card-memory is-relative";

    const handleClick = id => {
        onTurn(id);
    }

    return (
        <div className="column is-3" onClick={() => handleClick(id)}>
            <div className={isTurn}>
                <div className="card-back box px-0 py-0 is-clipped">
                    <img src={img} />
                </div>
                <div className="card-front box px-0 py-0 is-clipped">
                    <p>?</p>
                </div>
            </div>
        </div>
    );
}

export default CardMemory;