import { React, useState } from 'react';
import Card from './Card';

const CardList = ({ type, card }) => {
    const typeText = {
        'good': 'Что было хорошего?',
        'bad': 'Что можно улучшить?',
        'idea': 'Другие хорошие идеи?'
    };

    const [cards, setCards] = useState(card);
    const [text, setText] = useState();

    const addCard = e => {
        if (localStorage.getItem('username') && (e.key === 'Enter' || e.type === 'click') && text.trim()) {
            e.preventDefault();
            const newCard = { date: Date.now(), author: localStorage.getItem('username') ?? 'anon', content: text };
            setCards([...cards, newCard]);
            setText('');
        }
    }

    const deleteCard = card => {
        if (localStorage.getItem('username') === card.author) {
            setCards(cards.filter(x => x.date !== card.date));
        }
    }

    return (
        <table className={type}>
            <thead><tr><th><input type="text" placeholder={typeText[type]} value={text} onChange={e => setText(e.target.value)} onKeyDown={addCard} /><button onClick={addCard}>↵</button></th></tr></thead>
            <tbody>{cards == null ? null : cards.map(card => <tr><Card card={card} key={card.date} deleteCard={deleteCard} /></tr>)}</tbody>
        </table>
    );
};

export default CardList;