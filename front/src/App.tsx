import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/head/Header';
import SearchingHistory from './components/searchingHistory/SearchingHistory';

function App() {
  return (
    <div className="App font-sans text-slate-950 dark:bg-slate-900">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Header />
      <SearchingHistory />
    </div>
  );
}

export default App;
