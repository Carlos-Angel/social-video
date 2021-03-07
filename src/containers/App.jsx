import React from 'react';
import Header from '../components/Header';
import '../assets/styles/App.scss';
import Search from '../components/Search';

export default function App() {
  return (
    <div className='App'>
      <Header />
      <Search />
    </div>
  );
}
