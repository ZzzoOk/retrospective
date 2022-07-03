import { React, useState } from 'react';
import CardList from './Components/CardList';
import './App.css';

function App() {
  const goodCards = [{ date: 0, author: 'Suraj', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }, { date: 1, author: 'ZzzoOk', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }];
  const badCards = [{ date: 2, author: 'Suraj', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }];
  const ideaCards = [{ date: 3, author: 'ZzzoOk', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }];

  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [login, setLogin] = useState(localStorage.getItem('username') ? 'Logout' : 'Login');

  const showModal = () => {
    if (username) {
      setUsername();
      setLogin('Login');
      localStorage.removeItem('username');
    }
    else {
      let name = prompt('Enter your username').trim();
      if (name) {
        setUsername(name);
        setLogin('Logout');
        localStorage.setItem('username', name);
      }
    }
  }

  return (
    <>
      <header>
        <div className='username'>{username}</div>
        <button onClick={showModal}>{login}</button>
      </header>
      <h1 contentEditable={true}>retrospective</h1>
      <CardList key={0} type='good' card={goodCards} />
      <CardList key={1} type='bad' card={badCards} />
      <CardList key={2} type='idea' card={ideaCards} />
    </>
  );
}

export default App;
