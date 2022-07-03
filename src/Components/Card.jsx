import { React, useState } from 'react';

const Card = ({ card, deleteCard }) => {
    const [pluses, setPluses] = useState(0);
    const [minuses, setMinuses] = useState(0);
    const [plusedList, setPlusedList] = useState([]);
    const [minusedList, setMinusedList] = useState([]);
    const [visible, setVisible] = useState('none');

    const plusClick = () => {
        let username = localStorage.getItem('username');
        if (!username) {
            return;
        }
        if (plusedList.includes(username)) {
            setPluses(pluses - 1);
            setPlusedList(plusedList.filter(x => x !== username));
        } else {
            if (minusedList.includes(username)) {
                minusClick();
            }
            setPluses(pluses + 1);
            setPlusedList([username, ...plusedList]);
        }
    }

    const minusClick = () => {
        let username = localStorage.getItem('username');
        if (!username) {
            return;
        }
        if (minusedList.includes(username)) {
            setMinuses(minuses - 1);
            setMinusedList(minusedList.filter(x => x !== username));
        } else {
            if (plusedList.includes(username)) {
                plusClick();
            }
            setMinuses(minuses + 1);
            setMinusedList([username, ...minusedList]);
        }
    }

    return (
        <td>{card.author === localStorage.getItem('username') ? <div className='delete-button' onClick={() => deleteCard(card)}>✕</div> : null}
            <div className='content' contentEditable={card.author === localStorage.getItem('username')}>{card.content}</div>
            <div className='comment' style={{ display: visible }} contentEditable={true}></div>
            <div className='actions'><div className='reactions'>
                <div title={plusedList.join('\n')}>
                    <svg onClick={plusClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 30 30">
                        <circle r="50%" cx="50%" cy="50%" fill="green" />
                        <path d="m6 13 0 4 7 0 0 7 4 0 0-7 7 0 0-4-7 0 0-7-4 0 0 7z" />
                    </svg>
                    {pluses}
                </div>
                <div title={minusedList.join('\n')}>
                    <svg onClick={minusClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 30 30">
                        <circle r="50%" cx="50%" cy="50%" fill="red" />
                        <path d="m6 13 0 4 18 0 0-4z" />
                    </svg>
                    {minuses}
                </div></div>
                <div className='add-comment'>
                    <svg onClick={() => { if (localStorage.getItem('username')) setVisible(visible === 'none' ? 'block' : 'none'); }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="orange" viewBox="0 0 20 20">
                        <path d="m0 0 20 0 0 15-14 0-6 5 1-2 5-4 13 0 0-13-18 0 0 17-1 2m3-16 12 0 0 1-12 0zm0 3 14 0 0 1-14 0zm0 3 10 0 0 1-10 0z" />
                    </svg>
                </div>
                <i>{card.author}</i>
            </div>
        </td >
    );
};

export default Card;