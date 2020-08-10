import React from 'react';
import './header.css';

/**
 * Represente la Section Header ( Le Grand Titre )
 */
function Header({ title }) {
    return (
        <header className="mb-5">
            <h1 className="mt-4 has-text-black">{title}</h1>
        </header>
    );
}

export default Header;