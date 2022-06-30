import { React, useState } from 'react';

const Card = ({ card, deleteCard }) => {
    const [pluses, setPluses] = useState(0);
    const [minuses, setMinuses] = useState(0);
    const [plusedList, setPlusedList] = useState([]);
    const [minusedList, setMinusedList] = useState([]);
    const [editable, setEditable] = useState(false);

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
            <div className='content' onDoubleClick={() => card.author === localStorage.getItem('username') ? setEditable(true) : null} onBlur={() => setEditable(false)} contentEditable={editable}>{card.content}</div>
            <div className='actions'>{card.author}<div>
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
            </div>
        </td>
    );
};

export default Card;